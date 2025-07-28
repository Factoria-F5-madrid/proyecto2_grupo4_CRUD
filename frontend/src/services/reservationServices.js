import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.RESERVATIONS;

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Función para verificar si el token es válido
const verifyToken = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }
    
    // Verificar el token haciendo una petición al endpoint /auth/me
    const response = await axios.get(`${API_ENDPOINTS.AUTH.ME}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Token válido, usuario:', response.data);
    return true;
  } catch (error) {
    console.error('Token inválido o expirado:', error);
    // Limpiar token inválido
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error('Token inválido o expirado. Por favor, inicia sesión nuevamente.');
  }
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

// Obtener todas las reservas
export const getAllReservations = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationById = async (reservation_id) => {
  try {
    const response = await apiClient.get(`/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};

// Obtener reservas por ID de usuario
export const getReservationByUser = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del usuario con ID ${user_id}:`, error);
    throw error;
  }
};

// Obtener reservas por ID de servicio
export const getReservationByService = async (service_id) => {
  try {
    const response = await apiClient.get(`/service/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del servicio con ID ${service_id}:`, error);
    throw error;
  }
};

// Crear una nueva reserva
export const createReservation = async (reservationData) => {
  try {
    // Verificar que el token sea válido antes de hacer la petición
    await verifyToken();
    
    console.log('Token de autenticación:', getAuthToken());
    console.log('URL de la petición:', `${BASE_URL}/`);
    console.log('Datos a enviar:', reservationData);
    
    const response = await apiClient.post("/", reservationData);
    console.log('Respuesta exitosa:', response.data);
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

// Eliminar una reserva
export const deleteReservation = async (reservation_id) => {
  try {
    const response = await apiClient.delete(`/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};

// Actualizar la reserva por ID
export const updateReservation = async (reservation_id, updatedData) => {
  try {
    const response = await apiClient.put(`/${reservation_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};
