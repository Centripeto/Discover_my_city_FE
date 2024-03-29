import httpClient from "../common/utils/client";

const ROUTE = "poi";

export const createPoi = (accessToken, poi) =>
  httpClient
    .post(
      `/${ROUTE}/`,
      {
        name: poi.name,
        description: poi.description,
        coordinate: {
          longitude: poi.coordinate.longitude,
          latitude: poi.coordinate.latitude,
        },
        municipality: poi.municipality
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response);

export const getPois = (accessToken, search) =>
  httpClient
    .get(`/${ROUTE}/`, {
      params: {
        pageSize: search.pageSize,
        pageNumber: search.pageNumber,
        status: search.status,
      },
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    })
    .then((response) => response.response);

export const rejectPoi = (accessToken, id) =>
  httpClient
    .put(
      `/${ROUTE}/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.response);

export const approvePoi = (accessToken, id) =>
  httpClient
    .put(
      `/${ROUTE}/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.response);
