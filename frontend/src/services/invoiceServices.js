import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.INVOICES;

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configuración de axios con interceptor para incluir el token
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar el token a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Obtener todas las facturas
export const getAllInvoices = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);
    throw error;
  }
};

// Obtener una factura por ID
export const getInvoiceByID = async (invoice_id) => {
  try {
    const response = await apiClient.get(`/${invoice_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};

// Crear una nueva factura
export const createInvoice = async (invoiceData) => {
  try {
    const response = await apiClient.post("/", invoiceData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error; 
  }
};

// Eliminar una factura por ID
export const deleteInvoice = async (invoice_id) => {
  try {
    const response = await apiClient.delete(`/${invoice_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};

// Actualizar una factura por ID
export const updateInvoice = async (invoice_id, updatedData) => {
  try {
    const response = await apiClient.put(`/${invoice_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};


