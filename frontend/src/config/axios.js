import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://petland-backend.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
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

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 0) {
      console.error('Error de CORS o conexión:', error);
    } else if (error.response?.status === 403) {
      console.error('Error de autorización:', error);
    } else if (error.response?.status >= 500) {
      console.error('Error del servidor:', error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 