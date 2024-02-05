import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { Grid } from "@mui/material";
import Map from "../../components/map.component";
import { getPois } from "../../../api/poi";

const mapPoi = (poi) => ({
  longitude: poi.coordinate?.longitude,
  latitude: poi.coordinate?.latitude,
  id: poi.id,
  name: poi.name,
  description: poi.description,
  displayName: poi.name,
});

const PoiList = () => {
  const [pois, setPois] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    getPois(accessToken, {
      pageSize: 10,
      pageNumber: 0,
    }).then((response) => setPois(response.list.map(mapPoi)));
  }, [accessToken]);
  
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Map markers={pois} zoom={2} />
      </Grid>
    </Grid>
  );
};

export default PoiList;
