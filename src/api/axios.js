import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const ResponseInterceptor = (response) => {
  return response;
};

const RequestInterceptor = (config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
  }
  return config;
};

axiosInstance.interceptors.response.use(ResponseInterceptor, async (error) => {
  if (error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.response);
});

axiosInstance.interceptors.request.use(RequestInterceptor, (error) => {
  Promise.reject(error);
});
