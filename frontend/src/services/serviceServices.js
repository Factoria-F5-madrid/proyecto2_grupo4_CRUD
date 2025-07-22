import axios from "axios";

const BASE_URL = "http://localhost:5173/service"; 

//Obtener todos los servicios
export const getAllService = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los servicios:", error);
    throw error;
  }
};

// Obtener un servicio por ID
export const getServiceByID = async (service_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${service_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el servicio con ID ${service_id}:`, error);
    throw error;
  }
};

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  try {
    const response = await axios.post(
      "http://localhost:5173/service/",
      serviceData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error; 
  }
};

// Eliminar un servicio
export const deleteService = async (service_id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${service_id}`, {
      headers: {
        Authorization: 'Bearer ${token}',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el servicio con ID ${service_id}:`, error);
    throw error;
  } 
};

// Actualizar el servicio por ID
export const updateService = async (service_id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${service_id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ${token}',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el servicio con ID ${service_id}:`, error);
    throw error;
  }
};
