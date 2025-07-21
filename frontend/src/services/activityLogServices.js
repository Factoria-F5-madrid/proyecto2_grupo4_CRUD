import axios from 'axios';
const API_URL = 'http://localhost:3000/api/activity-log'; // cambiar la url segun mi endpoint

// modificar codigo segun mis tablas
export const getActivityLogServives = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Registro de Actividad", error);
    throw error;
  }
};

// VERIFICAR EL NOMBRE DEL ID DE LA TABLA MODIFICAR id actuvidad no es correcto verificar con lo que suba Barbi
export const getActivityLogById = async (id_actividad) => {
  try {
    const response = await axios.get(`${API_URL}/${id_actividad}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la actividad con ID ${id_actividad}:`, error);
    throw error;
  }
};

/* delete activity log by id  ,  update activity log by id */