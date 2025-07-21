import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/medicalHistory/medical_history/"; // Cambia esta URL si tu endpoint de videos es diferente

//Obtener los historiales médicos
export const getMedicalHistories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a los historiales médicos:", error);
    throw error;
  }
};

// Obtener la lista de los historiales médicos
export const getListMedicalHistories = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las lista de los historiales médicos ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo video
export const createMedicalHistory = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/medicalHistory/medical_history/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el Historial Médico:", error);
    throw error; 
  }
};

// Eliminar un historial médico
export const deleteMedicalHistory = async (id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el Historial Médico con el id ${id}:`, error);
    throw error;
  }
};

// Actualizar el Historial Médical por ID
export const updateMedicalHistory = async (id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el video con ID ${id}:`, error);
    throw error;
  }
};

