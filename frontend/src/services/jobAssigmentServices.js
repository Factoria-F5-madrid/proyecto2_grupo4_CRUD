import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.ASSIGNMENTS; 


export const getAllAssigments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las asignaciones de empleados:", error);
    throw error;
  }
};


export const getAssigmentByID = async (assignment_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${assignment_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la asignación de empleado con ID ${assignment_id}:`, error);
    throw error;
  }
};


export const createAssignment = async (assignmentData) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.ASSIGNMENTS,
      assignmentData,
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

