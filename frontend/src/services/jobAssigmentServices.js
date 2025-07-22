import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/assigment/"; 

// Obtener todas las asignaciones 
export const getAllAssigments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las asignaciones de empleados:", error);
    throw error;
  }
};

// Obtener una asignación por ID
export const getAssigmentByID = async (assignment_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${assignment_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la asignación de empleado con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva asignación de empleado
export const createAssignment = async (assigmentData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/assigment/",
      assigmentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear la asignación:", error);
    throw error; 
  }
};


// Eliminar una asignación 
export const deleteAssigment = async (assigment_id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${assigment_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la asignación de empleado con ID ${assigment_id}:`, error);
    throw error;
  }
};

// Actualizar una asignación de empleado por ID
export const updateAssigment = async (assigment_id, updatedData) => {
  const token = localStorage.getItem("token"); 
  try {
    const response = await axios.put(`${BASE_URL}/${assigment_id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la asignación de empleado con ID ${assigment_id}:`, error);
    throw error;
  }
};

