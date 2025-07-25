import axios from 'axios';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Interceptor para agregar token automáticamente a las peticiones
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

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró o es inválido, redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Manejar otros errores
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