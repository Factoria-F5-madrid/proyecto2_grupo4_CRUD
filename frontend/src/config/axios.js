import axios from 'axios';

// Configuración global de axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores de CORS y otros errores
apiClient.interceptors.response.use(
  (response) => {
    // Respuesta exitosa
    return response;
  },
  (error) => {
    // Manejo de errores
    if (error.response?.status === 0) {
      console.error('Error de CORS o conexión:', error);
    } else if (error.response?.status === 401) {
      console.error('Error de autenticación:', error);
    } else if (error.response?.status === 403) {
      console.error('Error de autorización:', error);
    } else if (error.response?.status >= 500) {
      console.error('Error del servidor:', error);
    }
    return Promise.reject(error);
  }
);

// Interceptor para agregar headers adicionales si es necesario
apiClient.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar headers adicionales como tokens de autenticación
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 