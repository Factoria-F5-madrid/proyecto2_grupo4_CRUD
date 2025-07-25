import axios from "axios";
const API_URL = "http://127.0.0.1:8000/pets";

// ahora mis servicios con manejo de errores try catch que consumira mi endpoint

export const getAllPets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener a los pets:", error);
    throw error;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await axios.get(`${API_URL}/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pet:", error);
    throw error;
  }
};

export const createPet = async (petData) => {
  try {
    const response = await axios.post(API_URL, petData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el pet:", error);
    throw error;
  }
};

export const updatePet = async (petId, petData) => {
  try {
    const response = await axios.put(`${API_URL}/${petId}`, petData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el pet:", error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await axios.delete(`${API_URL}/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el pet:", error);
    throw error;
  }
};