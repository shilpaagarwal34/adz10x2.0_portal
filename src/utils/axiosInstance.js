import axios from "axios";
import { base_url } from "../config/api.js";

const axiosInstance = axios.create({
  baseURL: `${base_url}/api`,
});

const parseStorageValue = (rawValue) => {
  if (!rawValue) return null;
  try {
    return JSON.parse(rawValue);
  } catch {
    return rawValue;
  }
};

const isLikelyJwt = (value) =>
  typeof value === "string" && value.split(".").length === 3;

const normalizeToken = (value) => {
  if (!value) return null;
  if (typeof value === "string") {
    const trimmed = value.trim().replace(/^"|"$/g, "");
    return isLikelyJwt(trimmed) ? trimmed : null;
  }
  if (typeof value === "object") {
    const nestedToken =
      value.admin_token || value.access_token || value.token || null;
    return normalizeToken(nestedToken);
  }
  return null;
};

axiosInstance.interceptors.request.use((config) => {
  const isAdminRequest = (config.url || "").includes("/admin/");
  const adminToken = normalizeToken(
    parseStorageValue(localStorage.getItem("admin_token"))
  );
  const authToken = normalizeToken(
    parseStorageValue(localStorage.getItem("auth_token"))
  );

  const token = isAdminRequest
    ? adminToken || authToken
    : authToken || adminToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;
