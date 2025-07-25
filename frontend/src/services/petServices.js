import apiClient from "../config/axios.js";

const API_URL = "/pets/";

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
    const response = await apiClient.get(`${API_URL}${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pet:", error);
    throw error;
  }
};

export const createPet = async (petData) => {
  try {
    const response = await apiClient.post(API_URL, petData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el pet:", error);
    throw error;
  }
};

export const updatePet = async (petId, petData) => {
  try {
    const response = await apiClient.put(`${API_URL}${petId}`, petData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el pet:", error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await apiClient.delete(`${API_URL}${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el pet:", error);
    throw error;
  }
};

export const subirImagenCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "musenion");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/yederpt/image/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error subiendo la imagen:", error);
    throw error;
  }
};
