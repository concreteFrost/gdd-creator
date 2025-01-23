import axios, { InternalAxiosRequestConfig } from "axios";
import store from "@store/store";

const axiosClient = axios.create({
  baseURL: "http://localhost:8801/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  (config): any => {
    const state = store.getState();
    const token = state.authSlice.token;
    const isPublicEndpoint =
      config.url?.includes("/login") || config.url?.includes("/register");
    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axios.interceptors.response.use((res): any => {
  res.data,
    (error: any) => {
      console.log("Axios error", error?.response.data || error.message);
      return Promise.reject(error);
    };
});

export default axiosClient;
// baseURL:"http://localhost:8801/api",
