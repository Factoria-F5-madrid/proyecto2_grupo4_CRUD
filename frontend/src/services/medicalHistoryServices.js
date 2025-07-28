import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.MEDICAL_HISTORY; 


const getAuthToken = () => {
  return localStorage.getItem('token');
};

const apiClient = axios.create({
  baseURL: BASE_URL,
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


export const getAllMedicalHistories = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los historiales médicos:", error);
    throw error;
  }
};


export const getMedicalHistoryByID = async (medical_history_id) => {
  try {
    const response = await apiClient.get(`/${medical_history_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};


export const getMedicalHistoryByPetID = async (pet_id) => {
  try {
    const response = await apiClient.get(`/pet/${pet_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los historiales médicos para la mascota con ID ${pet_id}:`, error);
    throw error;
  }
}


export const createMedicalHistory = async (medicalHistoryData) => {
  try {
    const response = await apiClient.post("/", medicalHistoryData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error; 
  }
};


export const deleteMedicalHistory = async (medical_history_id) => {
  try {
    const response = await apiClient.delete(`/${medical_history_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};


export const updateMedicalHistory = async (medical_history_id, updatedData) => {
  try {
    console.log('Servicio - Actualizando historial médico:', {
      id: medical_history_id,
      url: `${BASE_URL}/${medical_history_id}`,
      data: updatedData
    });
    
    const response = await apiClient.put(`/${medical_history_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};

