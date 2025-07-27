import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.SERVICES;

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configuración de axios con interceptor para incluir el token
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar el token a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Obtener todos los servicios
export const getAllService = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los servicios:", error);
    throw error;
  }
};

// Obtener un servicio por ID
export const getServiceByID = async (service_id) => {
  try {
    const response = await apiClient.get(`/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el servicio con ID ${service_id}:`, error);
    throw error;
  }
};

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  try {
    const response = await apiClient.post("/", serviceData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error; 
  }
};

// Eliminar un servicio
export const deleteService = async (service_id) => {
  try {
    const response = await apiClient.delete(`/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el servicio con ID ${service_id}:`, error);
    throw error;
  } 
};

// Actualizar el servicio por ID
export const updateService = async (service_id, updatedData) => {
  try {
    const response = await apiClient.put(`/${service_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el servicio con ID ${service_id}:`, error);
    throw error;
  }
};
