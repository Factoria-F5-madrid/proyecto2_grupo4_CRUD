import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/assigment/"; // Cambia esta URL si tu endpoint de videos es diferente

// Acceder a las asignaciones de empleo
export const getAssigments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a las asignaciones de empleo:", error);
    throw error;
  }
};

// Obtener la lista de asignaciones de empleo
export const getAssignmentsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la lista de asignaciones de empleo:`, error);
    throw error;
  }
};

// Obtener una asignación de empleo por ID
export const getAssigmentByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la asignación de empleo con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva asignación de empleo
export const createAssigment = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/assigment/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear la asignación de empleo:", error);
    throw error; 
  }
};

// Eliminar una asignación de empleo
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
    console.error(`Error al eliminar la asignación de empleo con ID ${id}:`, error);
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

