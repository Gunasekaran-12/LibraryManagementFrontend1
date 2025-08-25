// src/api/client.js
import axios from "axios";

// configure axios instance
const client = axios.create({
  baseURL: "https://librarymanagementbackend-j2qd.onrender.com/api", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
