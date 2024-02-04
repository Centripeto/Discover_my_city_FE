import httpClient from "../common/utils/client";

const ROUTE = "public";

export const searchGeo = ({ search, signal }) =>
  httpClient
    .get(`/${ROUTE}/geo/search`, {
      params: { search },
      signal,
    })
    .then((response) => ({
      list: response.response,
    }));
