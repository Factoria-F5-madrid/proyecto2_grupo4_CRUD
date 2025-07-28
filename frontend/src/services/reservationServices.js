import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.RESERVATIONS;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const verifyToken = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }
    
    const response = await axios.get(`${API_ENDPOINTS.AUTH.ME}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    

    return true;
  } catch (error) {
    console.error('Token inválido o expirado:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error('Token inválido o expirado. Por favor, inicia sesión nuevamente.');
  }
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

export const getAllReservations = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

export const getReservationById = async (reservation_id) => {
  try {
    const response = await apiClient.get(`/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};

export const getReservationByUser = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del usuario con ID ${user_id}:`, error);
    throw error;
  }
};

export const getReservationByService = async (service_id) => {
  try {
    const response = await apiClient.get(`/service/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del servicio con ID ${service_id}:`, error);
    throw error;
  }
};

export const createReservation = async (reservationData) => {
  try {
    await verifyToken();

    const response = await apiClient.post("/", reservationData);
  
    return response.data;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    console.error("Detalles del error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }
};

export const deleteReservation = async (reservation_id) => {
  try {
    const response = await apiClient.delete(`/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};

export const updateReservation = async (reservation_id, updatedData) => {
  try {
    const response = await apiClient.put(`/${reservation_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};
