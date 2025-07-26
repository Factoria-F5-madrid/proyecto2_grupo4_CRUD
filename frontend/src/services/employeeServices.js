// Servicios de empleados
import apiClient from "../config/axios";
import { API_ENDPOINTS } from "../config/api";

export const getAllEmployees = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS.EMPLOYEES);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los empleados:", error);
        throw error;
    }
};

export const getEmployeeByID = async (employee_id) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.EMPLOYEES}/${employee_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el empleado con ID ${employee_id}:`, error);
        throw error;
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.EMPLOYEES, employeeData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        throw error;
    }
};

export const updateEmployee = async (employee_id, updatedData) => {
    try {
        const response = await apiClient.put(`${API_ENDPOINTS.EMPLOYEES}/${employee_id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        throw error;
    }
};

export const deleteEmployee = async (employee_id) => {
    try {
        const response = await apiClient.delete(`${API_ENDPOINTS.EMPLOYEES}/${employee_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        throw error;
    }
};