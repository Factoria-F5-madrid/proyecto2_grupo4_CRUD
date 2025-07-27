import apiClient from "../config/axios";
import { API_ENDPOINTS } from "../config/api";
//Obtener a las reservas
export const getAllReservation = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.RESERVATIONS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener a las reservas:", error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationById = async (reservation_id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.RESERVATIONS}/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${reservation_id}:`, error);
    throw error;
  }
};

//Obtener reservas por ID de usuario
export const getReservationByUser= async (user_id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.RESERVATIONS}${user_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del usuario con ID ${user_id}:`, error);
    throw error;
  }
};

//Obtener reservas por ID de servicio
export const getReservationByService= async (service_id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.RESERVATIONS}${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del servicio con ID ${service_id}:`, error);
    throw error;
  }
};


// Crear una nueva reserva
export const createReservation = async (reservationData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.RESERVATIONS, reservationData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
}

// Eliminar una reserva
export const deleteReservation = async (reservation_id) => {

    try {
        const response = await apiClient.delete(`${API_ENDPOINTS.RESERVATIONS}/${reservation_id}`, {

        });
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la reserva con ID ${reservation_id}:`, error);
        throw error;
    }
}

// Actualizar la reserva por ID
export const updateReservation = async (reservation_id, updatedData) => {
    const token = localStorage.getItem("token");

    try {
        const response = await apiClient.put(`${API_ENDPOINTS.RESERVATIONS}/${reservation_id}`,
            updatedData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la reserva con ID ${reservation_id}:`, error);
        throw error;
    }
}
