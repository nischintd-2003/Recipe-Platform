import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const authToken = storage.getToken();
  if (authToken && config.headers) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      storage.clear();
      window.location.href = "/";
    } else if (status === 404) {
      console.log("Recipe not found");
    } else {
      console.error("An error occurred:", error);
    }

    return Promise.reject(error);
  },
);

export default api;
