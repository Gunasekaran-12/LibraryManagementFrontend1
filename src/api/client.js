// src/api/client.js
import axios from "axios";

// configure axios instance
const client = axios.create({
  baseURL: "http://localhost:8080/api", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
