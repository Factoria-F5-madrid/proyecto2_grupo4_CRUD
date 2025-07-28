import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.PAYMENTS;


export const getAllPayment = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los pagos:", error);
    throw error;
  }
};



export const getPaymentByID = async (payment_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${payment_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el pago con ID ${payment_id}:`, error);
    throw error;
  }
};


export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.PAYMENTS,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error; 
  }
};


export const deletePayment = async (payment_id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${payment_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el pago con ID ${payment_id}:`, error);
    throw error;
  }
};


export const updatePayment = async (payment_id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${payment_id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el pago con ID ${payment_id}:`, error);
    throw error;
  }
};
