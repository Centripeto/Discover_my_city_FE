import httpClient from "../common/utils/client";

const ROUTE = "poi";

export const createPoi = (accessToken, poi) =>
  httpClient
    .post(`/${ROUTE}/`, {
        name: poi.name,
        description: poi.description,
        coordinate: {
            longitude: poi.coordinate.longitude,
            latitude: poi.coordinate.latitude
        }
      },{
        headers: {
          Authorization: `Bearer ${accessToken}` 
        }
      })
    .then((response) => response);