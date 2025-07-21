import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/reservation"; 

//Acceder a las reservas
export const getReservation = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a las reservas:", error);
    throw error;
  }
};

// Obtener la lista de las reservas
export const getListReservations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las lista de las reservas:`, error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva reserva
export const createReservation = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/reservation",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error; 
  }
};

// Eliminar una reserva
export const deleteReservation = async (id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la reserva con ID ${id}:`, error);
    throw error;
  } 
};

// Actualizar la reserva por ID
export const updateReservation = async (id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la reserva con ID ${id}:`, error);
    throw error;
  }
};
