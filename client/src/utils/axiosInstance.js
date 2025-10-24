import axios from "axios";
const API_BASE_URL="https://scaling-space-succotash-r7r6grwq9x4fxvr4-8080.app.github.dev"
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
