import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1",
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - token expired");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;