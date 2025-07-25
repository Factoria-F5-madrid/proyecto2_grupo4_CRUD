// Servicios de usuario y autenticación
import apiClient from "../config/axios";
import { API_ENDPOINTS } from "../config/api";

// ahora mis servicios con manejo de errores try catch que consumira mi endpoint

export const getAllUsers = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS.USERS);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los empleados:", error);
        throw error;
    }
};

export const getUserByID = async (user_id) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.USERS}/${user_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el empleado con ID ${user_id}:`, error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.USERS, userData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        throw error;
    }
};

export const updateUser = async (user_id, updatedData) => {
    try {
        const response = await apiClient.put(`${API_ENDPOINTS.USERS}/${user_id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        throw error;
    }
};

export const deleteUser = async (user_id) => {
    try {
        const response = await apiClient.delete(`${API_ENDPOINTS.USERS}/${user_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        throw error;
    }
};

// ===== SERVICIOS DE AUTENTICACIÓN =====

export const loginUser = async (loginData) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario actual:", error);
        throw error;
    }
};