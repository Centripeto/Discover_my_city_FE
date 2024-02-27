// apiService.js
import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_BASE_API}`;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || "Si è verificato un errore insolito";
    return Promise.reject(message);
  }
);

export default client;
