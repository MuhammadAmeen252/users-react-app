import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const ResponseInterceptor = (response) => {
  return response;
};

const RequestInterceptor = (config) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("tok", "Bearer " + token.trim())
  if (token) {
    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGYzYzM2M2M5NTYzNTNhNzhiZWQyMzMiLCJpYXQiOjE3MDAxNjA0ODcsImV4cCI6MTcwMDc2NTI4N30.NY8MS1Fyb7w9QjfY_5f8fsSFL4E-GAwHsIecftXGG60"
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
