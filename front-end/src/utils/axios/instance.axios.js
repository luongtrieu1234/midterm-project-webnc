// axiosConfig.js
import axios from 'axios';

// eslint-disable-next-line no-undef
const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm logic middleware để gắn JWT Authorization Header ở đây
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
