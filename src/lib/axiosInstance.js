import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Include credentials for cross-origin requests
});
