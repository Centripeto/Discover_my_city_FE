import httpClient from "../common/utils/client";

const ROUTE = "auth";

export const login = ({ username, password }) =>
  httpClient
    .post(`/${ROUTE}/authenticate`, { username, password })
    .then((response) => ({
      accessToken: response.response.accessToken,
      refreshToken: response.response.refreshToken,
    }));

export const whoami = ({ token }) =>
httpClient.get(`/user/whoami`, {
  headers: { Authorization: `Bearer ${token}` },
}).then(response => ({
  name: response.response.name,
  username: response.response.username,
  lastname: response.response.lastname,
  role: response.response.role,
  municipality: response.response.municipalityDto
}));
