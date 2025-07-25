// voy hacer los servicios de employee
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/employees";

// ahora mis servicios con manejo de errores try catch que consumira mi endpoint

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los empleados:", error);
        throw error;
    }
};

export const getEmployeeByID = async (employee_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${employee_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el empleado con ID ${employee_id}:`, error);
        throw error;
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(BASE_URL, employeeData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        throw error;
    }
};

export const updateEmployee = async (employee_id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${employee_id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        throw error;
    }
};

export const deleteEmployee = async (employee_id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${employee_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        throw error;
    }
};