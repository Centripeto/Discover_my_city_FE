import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Map from "../../components/map.component";
import { useCallback, useEffect, useRef, useState } from "react";
import { searchGeo } from "../../../api/public";
import { debounce } from "lodash";
import { createPoi } from "../../../api/poi";
import { useAuth } from "../../../providers/AuthProvider";
import { useToast } from "../../../providers/ToastProvider";

const CreatePoi = () => {
  const { accessToken, user } = useAuth();
  const { dispatch } = useToast();
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { errors, submitCount, isValid },
  } = useForm({
    defaultValues: {},
  });
  const searchGeoAbortController = useRef();

  const [options, setOptions] = useState([]);


  const [center, setCenter] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    const size = user.municipality?.edges?.length || 0;
    if(size > 0) {
      const {latitudeSum, longitudeSum} = user.municipality.edges.reduce((acc, next) => ({
        latitudeSum: acc.latitudeSum + next.latitude,
        longitudeSum: acc.longitudeSum + next.longitude,
      }), {latitudeSum:0, longitudeSum:0});
      setCenter({ latitude: latitudeSum / size, longitude: longitudeSum / size })
    }
  }, [user])

  const title = register("title", {
    required: "Required",
  });

  const description = register("description", {
    required: "Required",
  });

  const coordinate = register("coordinate", {
    required: "Required",
  });

  const handleTypingSearch = async (event) => {
    const search = event.target.value;
    const controller = searchGeoAbortController.current;
    if (controller) {
      controller.abort();
    }
    try {
      searchGeoAbortController.current = new AbortController();
      const response = await searchGeo({
        search,
        signal: searchGeoAbortController.current.signal,
      });
      setOptions(response.list);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("AbortError: Fetch request aborted");
      }
    }
  };

  const debounceHandleTypingSearch = useCallback(
    debounce(handleTypingSearch, 500),
    []
  );

  const updateMarker = (marker, coordinates) => {
    setValue("coordinate", { ...marker, ...coordinates });
  };

  const onSubmit = (form) => {
    createPoi(accessToken, {
      name: form.title,
      description: form.description,
      coordinate: {
        longitude: form.coordinate.longitude,
        latitude: form.coordinate.latitude,
      },
    })
      .then(() => {
        const payload = {
          severity: "success",
          message: "POI creato correttamente",
        };
        dispatch({ type: "open", payload });
        reset();
        setValue("coordinate", null);
        trigger("coordinate");
      })
      .catch((err) => {
        const payload = { severity: "error", message: err };
        dispatch({ type: "open", payload });
      });
  };

  const markers = getValues("coordinate")
    ? [{ ...getValues("coordinate"), id: 1, draggable: true }]
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid container item xs={12} sm={6} spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <TextField
                id="title"
                helperText={errors.title ? errors.title.message : null}
                variant="standard"
                label="Titolo"
                error={!!errors.title}
                name={title.name}
                onBlur={title.onBlur}
                onChange={title.onChange}
                inputRef={title.ref}
              />
            </FormControl>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <TextField
                  id="description"
                  type="text"
                  multiline
                  rows={4}
                  helperText={
                    errors.description ? errors.description.message : null
                  }
                  variant="standard"
                  label="Descrizione"
                  error={!!errors.description}
                  name={description.name}
                  onBlur={description.onBlur}
                  onChange={description.onChange}
                  inputRef={description.ref}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="geo-select"
                name={coordinate.name}
                value={getValues("coordinate")?.displayName}
                options={options}
                getOptionLabel={(opt) => opt.displayName}
                onChange={(event, newValue) => {
                  setCenter(newValue);
                  setValue("coordinate", newValue);
                  trigger("coordinate");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Indirizzo"
                    variant="standard"
                    onChange={debounceHandleTypingSearch}
                  />
                )}
              />
              {errors.coordinate ? <FormHelperText error>Selezionare punto di interesse sulla mappa</FormHelperText> : null }
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={6} spacing={3}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Map
                center={center || {}}
                markers={markers}
                updateMarker={updateMarker}
                edges={user?.municipality?.edges || []}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            disabled={submitCount > 0 && !isValid}
            variant="outlined"
            color="primary"
          >
            Crea
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatePoi;
