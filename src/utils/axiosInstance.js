import axios from "axios";
import { base_url } from "../config/api.js";

const axiosInstance = axios.create({
  baseURL: `${base_url}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") ||
    JSON.parse(localStorage.getItem("admin_token"));

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;
