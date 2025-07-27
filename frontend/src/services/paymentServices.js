import apiClient from "../config/axios";
import { API_ENDPOINTS } from "../config/api";

// Obtener todos los pagos
export const getAllPayment = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PAYMENTS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los pagos:", error);
    throw error;
  }
};

// Obtener un pago por ID
export const getPaymentByID = async (payment_id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.PAYMENTS}/${payment_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el pago con ID ${payment_id}:`, error);
    throw error;
  }
};

// Crear un nuevo pago
export const createPayment = async (paymentData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.PAYMENTS, paymentData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error; 
  }
};

// Eliminar un pago
export const deletePayment = async (payment_id) => {
  try {
    const response = await apiClient.delete(`${API_ENDPOINTS.PAYMENTS}/${payment_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el pago con ID ${payment_id}:`, error);
    throw error;
  }
};

// Actualizar un pago por ID
export const updatePayment = async (payment_id, updatedData) => {

  try {
    const response = await apiClient.put(`${API_ENDPOINTS.PAYMENTS}/${payment_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el pago con ID ${payment_id}:`, error);
    throw error;
  }
};
