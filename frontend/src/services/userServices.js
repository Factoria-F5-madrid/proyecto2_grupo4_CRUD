// aqui va los servicios de user
// voy hacer los servicios de user
import axios from "axios";
const BASE_URL = "http://localhost:8000/users";

// ahora mis servicios con manejo de errores try catch que consumira mi endpoint

export const getAllUsers = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los empleados:", error);
        throw error;
    }
};

export const getUserByID = async (user_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${user_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el empleado con ID ${user_id}:`, error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(BASE_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        throw error;
    }
};

export const updateUser = async (user_id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${user_id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        throw error;
    }
};

export const deleteUser = async (user_id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${user_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        throw error;
    }
};