import axios from "axios";

const BASE_URL = "http://localhost:8000/payment/"; 

// Obtener todos los pagos
export const getAllPayment = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los pagos:", error);
    throw error;
  }
};

// Obtener un pago por ID
export const getPaymentByID = async (payment_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${payment_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el pago con ID ${payment_id}:`, error);
    throw error;
  }
};

// Crear un nuevo pago
export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/payment/",
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

// Eliminar un pago
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

// Actualizar un pago por ID
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
