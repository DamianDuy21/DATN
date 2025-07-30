import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
