import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import Map from "../../../poi/components/map.component";
import { useForm } from "react-hook-form";
import { createMunicipality } from "../../../api/municipality";
import { useToast } from "../../../providers/ToastProvider";
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect, useState } from "react";

const CreateMunicipality = () => {
  const { accessToken } = useAuth();
  const { dispatch } = useToast();
  const [center, setCenter] = useState({ });
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors, submitCount, isValid },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    const size = getValues('edges')?.length || 0;
    if(size > 0) {
      const {latitudeSum, longitudeSum} = getValues('edges').reduce((acc, next) => ({
        latitudeSum: acc.latitudeSum + next.latitude,
        longitudeSum: acc.longitudeSum + next.longitude,
      }), {latitudeSum:0, longitudeSum:0});
      setCenter({ latitude: latitudeSum / size, longitude: longitudeSum / size })
    }
  }, [getValues('edges')])

  const name = register("name", {
    required: "Required",
  });

  const description = register("description", {
    required: "Required",
  });

  register("edges", {
    required: "Required",
  });

  const onSubmit = (form) => {
    createMunicipality(accessToken, {
      name: form.name,
      description: form.description,
      edges: form.edges,
    })
      .then(() => {
        const payload = {
          severity: "success",
          message: "Municipio creato correttamente",
        };
        dispatch({ type: "open", payload });
        reset();
        setValue("edges", null);
        trigger("edges");
      })
      .catch((err) => {
        const payload = { severity: "error", message: err };
        dispatch({ type: "open", payload });
      });
  };

  const onCreateShape = (coordinates) => {
    setValue("edges", coordinates);
    trigger("edges");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid container item xs={12} sm={6} spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <TextField
                id="title"
                helperText={errors.name ? errors.name.message : null}
                variant="standard"
                label="Titolo"
                error={!!errors.name}
                name={name.name}
                onBlur={name.onBlur}
                onChange={name.onChange}
                inputRef={name.ref}
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
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={6} spacing={3}>
          <Grid item xs={12}>
            <Map
              center={center}
              markers={[]}
              edit
              onCreateShape={onCreateShape}
              edges={getValues("edges") || []}
            />
            {errors.edges ? (
              <FormHelperText error>Selezionare area del comune</FormHelperText>
            ) : null}
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

export default CreateMunicipality;
