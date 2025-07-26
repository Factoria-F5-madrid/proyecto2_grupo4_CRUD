import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/invoices/"; 

// Obtener todas las facturas
export const getAllInvoices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);
    throw error;
  }
};

//Obtener una factura por ID
export const getInvoiceByID = async (invoice_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${invoice_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la factura con ID ${invoice_idid}:`, error);
    throw error;
  }
};

// Crear una nueva factura
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/invoices/",
      invoiceData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error; 
  }
};

// Eliminar una factura por ID
export const deleteInvoice = async (invoice_id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${invoice_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};

// Actualizar una factura por ID
export const updateInvoice = async (invoice_id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${invoice_id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};


