import apiClient from "../config/axios";
import { API_ENDPOINTS } from "../config/api";



//Obtener todos los servicios
export const getAllService = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.SERVICES);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los servicios:", error);
    throw error;
  }
};

// Obtener un servicio por ID
export const getServiceByID = async (service_id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.SERVICES}/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el servicio con ID ${service_id}:`, error);
    throw error;
  }
};

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SERVICES, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error;
  }
}

// Eliminar un servicio
export const deleteService = async (service_id) => {
  try {
    const response = await apiClient.delete(`${API_ENDPOINTS.SERVICES}/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el servicio con ID ${service_id}:`, error);
    throw error;
  } 
};

// Actualizar el servicio por ID
export const updateService = async (service_id, updatedData) => {
  try {
    const response = await apiClient.put(`${API_ENDPOINTS.SERVICES}/${service_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el servicio con ID ${service_id}:`, error);
    throw error;
  }
};
