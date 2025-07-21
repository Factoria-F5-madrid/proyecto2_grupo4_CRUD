import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/assigment/"; // Cambia esta URL si tu endpoint de videos es diferente

// Acceder a las asignaciones de empleos
export const getAssigments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a las asignaciones de empleos:", error);
    throw error;
  }
};

// Obtener la lista de asignaciones de empleos
export const getAssignmentsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la lista de asignaciones de empleos:`, error);
    throw error;
  }
};

export const getInvoiceByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la factura con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva factura
export const createInvoice = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/invoices/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error; 
  }
};

// Eliminar un video por ID
export const deleteVideo = async (id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el video con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar una factura por ID
export const updateInvoice = async (id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la factura con ID ${id}:`, error);
    throw error;
  }
};

