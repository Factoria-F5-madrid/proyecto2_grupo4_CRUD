import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.INVOICES;


const getAuthToken = () => {
  return localStorage.getItem('token');
};


const apiClient = axios.create({
  baseURL: BASE_URL,
});


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


export const getAllInvoices = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);
    throw error;
  }
};


export const getInvoiceByID = async (invoice_id) => {
  try {
    const response = await apiClient.get(`/${invoice_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};


export const createInvoice = async (invoiceData) => {
  try {
    const response = await apiClient.post("/", invoiceData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error; 
  }
};


export const deleteInvoice = async (invoice_id) => {
  try {
    const response = await apiClient.delete(`/${invoice_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};


export const updateInvoice = async (invoice_id, updatedData) => {
  try {
    const response = await apiClient.put(`/${invoice_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la factura con ID ${invoice_id}:`, error);
    throw error;
  }
};


