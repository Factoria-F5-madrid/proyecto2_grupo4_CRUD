// aqui va los servicios de user
// voy hacer los servicios de user
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/users';

const getToken = () => localStorage.getItem('token');

export const getAllUsers = async () => {
  try {
    const token = getToken();
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
};

export const getUserByID = async (user_id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${user_id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const token = getToken();
    const response = await axios.post(BASE_URL, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

export const updateUser = async (user_id, updatedData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${BASE_URL}/${user_id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const deleteUser = async (user_id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${BASE_URL}/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};