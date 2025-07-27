import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.MEDICAL_HISTORY; 

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

//Obtener todos los historiales médicos
export const getAllMedicalHistories = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los historiales médicos:", error);
    throw error;
  }
};

// Obtener un historial médico por ID
export const getMedicalHistoryByID = async (medical_history_id) => {
  try {
    const response = await apiClient.get(`/${medical_history_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};

// Obtener historiales médicos por ID de mascota
export const getMedicalHistoryByPetID = async (pet_id) => {
  try {
    const response = await apiClient.get(`/pet/${pet_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los historiales médicos para la mascota con ID ${pet_id}:`, error);
    throw error;
  }
}

// Crear un nuevo historial médico
export const createMedicalHistory = async (medicalHistoryData) => {
  try {
    const response = await apiClient.post("/", medicalHistoryData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error; 
  }
};

// Eliminar un historial médico
export const deleteMedicalHistory = async (medical_history_id) => {
  try {
    const response = await apiClient.delete(`/${medical_history_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};

// Actualizar el Historial Médical por ID
export const updateMedicalHistory = async (medical_history_id, updatedData) => {
  try {
    const response = await apiClient.put(`/${medical_history_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};

