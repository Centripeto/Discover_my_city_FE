import { Grid } from "@mui/material";
import Map from "../../../poi/components/map.component";

const CreateMunicipality = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Map
          center={{}}
          markers={[]}
          edit
          edges={[
            {
              latitude: 43.3145,
              longitude: 13.44933,
            },
            {
              latitude: 43.29414,
              longitude: 13.39646,
            },
            {
              latitude: 43.27539,
              longitude: 13.4342,
            },
            {
              latitude: 43.29926,
              longitude: 13.48278,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default CreateMunicipality;
