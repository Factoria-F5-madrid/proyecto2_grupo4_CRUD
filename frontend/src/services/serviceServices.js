import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.SERVICES;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const getAllServices = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  }
};

export const getServiceById = async (serviceId) => {
  try {
    const response = await apiClient.get(`/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await apiClient.post("/", serviceData);
    return response.data;
  } catch (error) {
    console.error("Error al crear servicio:", error);
    throw error;
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    console.log('Actualizando servicio:', serviceId, serviceData);
    const response = await apiClient.put(`/${serviceId}`, serviceData);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    throw error;
  }
};

export const deleteService = async (serviceId) => {
  try {
    const response = await apiClient.delete(`/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    throw error;
  }
};
