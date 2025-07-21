import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/service"; 

//Acceder a los servicios
export const getService = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a los servicios:", error);
    throw error;
  }
};

// Obtener la lista de los servicios
export const getListServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las lista de los servicios:`, error);
    throw error;
  }
};

// Obtener un servicio por ID
export const getServiceByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el servicio con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo servicio
export const createService = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/service",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
export const deleteService = async (id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el servicio con ID ${id}:`, error);
    throw error;
  } 
};

// Actualizar el servicio por ID
export const updateService = async (id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el servicio con ID ${id}:`, error);
    throw error;
  }
};
