import axios from "axios";
import { API_ENDPOINTS } from '../config/api.js';

const BASE_URL = API_ENDPOINTS.USERS;


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


export const getDashboardStats = async () => {
  try {
   
    const [petsResponse, servicesResponse, invoicesResponse, medicalHistoryResponse] = await Promise.allSettled([
      apiClient.get("/pets/"),
      apiClient.get("/services/"), // Cambiado de /reservations/ a /services/
      apiClient.get("/invoice/"),
      apiClient.get("/medical-history/")
    ]);

    const stats = {
      totalPets: 0,
      totalServices: 0, 
      totalInvoices: 0,
      totalMedicalHistory: 0
    };

    
    if (petsResponse.status === 'fulfilled') {
      stats.totalPets = petsResponse.value.data.length;
      
    } else {
      console.warn("⚠️ Error obteniendo mascotas:", petsResponse.reason);
    }

    
    if (servicesResponse.status === 'fulfilled') {
      stats.totalServices = servicesResponse.value.data.length;
     
    } else {
      console.warn("⚠️ Error obteniendo servicios:", servicesResponse.reason);
    }

  
    if (invoicesResponse.status === 'fulfilled') {
      stats.totalInvoices = invoicesResponse.value.data.length;
     
    } else {
      console.warn("⚠️ Error obteniendo facturas:", invoicesResponse.reason);
    }

    
    if (medicalHistoryResponse.status === 'fulfilled') {
      stats.totalMedicalHistory = medicalHistoryResponse.value.data.length;
     
    } else {
      console.warn("⚠️ Error obteniendo historial médico:", medicalHistoryResponse.reason);
    }


    return stats;

  } catch (error) {
    console.error(" Error obteniendo estadísticas del dashboard:", error);
    throw error;
  }
};

export const getAdminStats = async () => {
  try {
    
    const [
      petsResponse, 
      reservationsResponse, 
      invoicesResponse, 
      medicalHistoryResponse,
      usersResponse,
      employeesResponse,
      paymentsResponse
    ] = await Promise.allSettled([
      apiClient.get("/pets/"),
      apiClient.get("/reservations/"),
      apiClient.get("/invoice/"),
      apiClient.get("/medical-history/"),
      apiClient.get("/users/"),
      apiClient.get("/employees/"),
      apiClient.get("/payments/")
    ]);

    const stats = {
      totalPets: 0,
      totalReservations: 0,
      totalInvoices: 0,
      totalMedicalHistory: 0,
      totalUsers: 0,
      totalEmployees: 0,
      totalPayments: 0
    };

    if (petsResponse.status === 'fulfilled') {
      stats.totalPets = petsResponse.value.data.length;
    }
    if (reservationsResponse.status === 'fulfilled') {
      stats.totalReservations = reservationsResponse.value.data.length;
    }
    if (invoicesResponse.status === 'fulfilled') {
      stats.totalInvoices = invoicesResponse.value.data.length;
    }
    if (medicalHistoryResponse.status === 'fulfilled') {
      stats.totalMedicalHistory = medicalHistoryResponse.value.data.length;
    }
    if (usersResponse.status === 'fulfilled') {
      stats.totalUsers = usersResponse.value.data.length;
    }
    if (employeesResponse.status === 'fulfilled') {
      stats.totalEmployees = employeesResponse.value.data.length;
    }
    if (paymentsResponse.status === 'fulfilled') {
      stats.totalPayments = paymentsResponse.value.data.length;
    }

   
    return stats;

  } catch (error) {
    console.error("Error obteniendo estadísticas de admin:", error);
    throw error;
  }
}; 