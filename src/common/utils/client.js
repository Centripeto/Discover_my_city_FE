// apiService.js
import axios from "axios";

const API_BASE_URL = `${process.env.BASE_URL}/${process.env.API_BASE_URL}`;

const client = axios.create({
  API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default client;
