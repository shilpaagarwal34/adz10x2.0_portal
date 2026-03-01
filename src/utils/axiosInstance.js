import axios from "axios";
import { base_url } from "../config/api.js";

const axiosInstance = axios.create({
  baseURL: `${base_url}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const isAdminRequest = (config.url || "").includes("/admin/");
  const adminTokenRaw = localStorage.getItem("admin_token");
  const adminToken = adminTokenRaw ? (() => { try { return JSON.parse(adminTokenRaw); } catch { return adminTokenRaw; } })() : null;
  const authToken = localStorage.getItem("auth_token");

  const token = isAdminRequest && adminToken
    ? adminToken
    : authToken || adminToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;
