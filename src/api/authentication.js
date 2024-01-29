import httpClient from "../common/utils/client";

const ROUTE = "/auth";

export const login = ({ username, password }) =>
  httpClient
    .post(`${ROUTE}/authenticate`, { username, password })
    .then((response) => ({
      accessToken: response.response.accessToken,
      refreshToken: response.response.refreshToken,
    }));

export const logout = ({ token }) =>
  httpClient.get(`${ROUTE}/authenticate`, {
    headers: { Authorization: `Bearer ${token}` },
  });
