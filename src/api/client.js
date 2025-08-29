// src/api/client.js
import axios from "axios";

// configure axios instance
const client = axios.create({
  baseURL: "https://librarymanagementbackend-1.onrender.com/api", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
