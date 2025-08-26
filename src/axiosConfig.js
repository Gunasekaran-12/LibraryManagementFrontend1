import axios from "axios";

const instance = axios.create({
  baseURL: "https://librarymanagementbackend-j2qd.onrender.com/api", // your deployed backend
});

export default instance;
