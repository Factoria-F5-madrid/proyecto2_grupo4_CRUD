//  voy hacer los servicios de activityLog
import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.ACTIVITY_LOGS;

// ahora mis servicios con manejo de errores try catch que consumira mi endpoint

// Obtener todos los logs de actividad
export const getAllActivityLogs = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los logs de actividad:", error);
        throw error;
    }
};

export const getActivityLogByID = async (activity_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${activity_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el log de actividad con ID ${activity_id}:`, error);
        throw error;
    }
};

export const createActivityLog = async (logData) => {
    try {
        const response = await axios.post(BASE_URL, logData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el log de actividad:", error);
        throw error;
    }
};

export const updateActivityLog = async (activity_id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${activity_id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el log de actividad:", error);
        throw error;
    }
};

export const deleteActivityLog = async (activity_id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${activity_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el log de actividad:", error);
        throw error;
    }
};