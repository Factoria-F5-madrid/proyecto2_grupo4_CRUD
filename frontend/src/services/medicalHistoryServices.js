import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/medicalhistory"; 
//Obtener todos los historiales médicos
export const getAllMedicalHistories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los historiales médicos:", error);
    throw error;
  }
};

// Obtener un historial médico por ID
export const getMedicalHistoryByID = async (medical_history_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${medical_history_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};

// Obtener historiales médicos por ID de mascota
export const getMedicalHistoryByPetID = async (pet_id) => {
  try {
    const response = await axios.get(`${PET_BASE_URL}/${pet_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los historiales médicos para la mascota con ID ${pet_id}:`, error);
    throw error;
  }
}
// Crear un nuevo historial médico
export const createMedicalHistory = async (medicalHistoryData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/medicalhistory",
      medicalHistoryData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error; 
  }
};

// Eliminar un historial médico
export const deleteMedicalHistory = async (medical_history_id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${medical_history_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el historial médico con ID ${medical_history_id}:`, error);
    throw error;
  }
};

// Actualizar el Historial Médical por ID
export const updateMedicalHistory = async (medical_history_id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${medical_history_id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el vídeo con ID ${medical_history_id}:`, error);
    throw error;
  }
};

