import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/payment/"; 

// Acceder a los pagos
export const getPayment = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a los pagos:", error);
    throw error;
  }
};

// Obtener la lista de los pagos
export const getPaymentList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la lista de los pagos:`, error);
    throw error;
  }
};

// Obtener un pago por ID
export const getPaymentByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el pago con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo pago
export const createPayment = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/payment/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
export const deleteAssigment = async (id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el pago con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar una asignación de empleo por ID
export const updateAssigment = async (id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la asignación de empleo con ID ${id}:`, error);
    throw error;
  }
};
