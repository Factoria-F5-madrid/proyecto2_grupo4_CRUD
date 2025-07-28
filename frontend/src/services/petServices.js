import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const API_URL = API_ENDPOINTS.PETS;


const getAuthToken = () => {
  return localStorage.getItem('token');
};


const apiClient = axios.create({
  baseURL: API_URL,
});


apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export const getAllPets = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener a los pets:", error);
    throw error;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await apiClient.get(`/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pet:", error);
    throw error;
  }
};

export const createPet = async (petData) => {
  try {
    const response = await apiClient.post("/", petData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el pet:", error);
    throw error;
  }
};

export const updatePet = async (petId, petData) => {
  try {
    const response = await apiClient.put(`/${petId}`, petData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el pet:", error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await apiClient.delete(`/${petId}`);
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
