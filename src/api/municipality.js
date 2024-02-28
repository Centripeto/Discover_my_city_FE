import httpClient from "../common/utils/client";

const ROUTE = "municipality";

export const createMunicipality = (accessToken, municipality) =>
  httpClient
    .post(
      `/${ROUTE}/`,
      {
        name: municipality.name,
        description: municipality.description,
        edges: municipality.edges,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response);
