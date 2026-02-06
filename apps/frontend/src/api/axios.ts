import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken && config.headers) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.log("Unauthorized access");
    } else if (status === 404) {
      console.log("Recipe not found");
    } else {
      console.error("An error occurred:", error);
    }

    return Promise.reject(error);
  },
);

export default api;
