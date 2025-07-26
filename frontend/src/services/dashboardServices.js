import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

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

// Obtener estadísticas del dashboard según el rol del usuario
export const getDashboardStats = async () => {
  try {
    console.log("🔍 Obteniendo estadísticas del dashboard...");
    
    // Obtener datos de diferentes endpoints según el rol
    // Para usuarios regulares, usamos servicios en lugar de reservas
    const [petsResponse, servicesResponse, invoicesResponse, medicalHistoryResponse] = await Promise.allSettled([
      apiClient.get("/pets/"),
      apiClient.get("/services/"), // Cambiado de /reservations/ a /services/
      apiClient.get("/invoice/"),
      apiClient.get("/medical-history/")
    ]);

    const stats = {
      totalPets: 0,
      totalServices: 0, // Cambiado de totalReservations a totalServices
      totalInvoices: 0,
      totalMedicalHistory: 0
    };

    // Procesar respuesta de mascotas
    if (petsResponse.status === 'fulfilled') {
      stats.totalPets = petsResponse.value.data.length;
      console.log("✅ Mascotas obtenidas:", stats.totalPets);
      console.log("📋 Datos de mascotas:", petsResponse.value.data);
    } else {
      console.warn("⚠️ Error obteniendo mascotas:", petsResponse.reason);
    }

    // Procesar respuesta de servicios (antes reservas)
    if (servicesResponse.status === 'fulfilled') {
      stats.totalServices = servicesResponse.value.data.length;
      console.log("✅ Servicios obtenidos:", stats.totalServices);
      console.log("📋 Datos de servicios:", servicesResponse.value.data);
    } else {
      console.warn("⚠️ Error obteniendo servicios:", servicesResponse.reason);
    }

    // Procesar respuesta de facturas
    if (invoicesResponse.status === 'fulfilled') {
      stats.totalInvoices = invoicesResponse.value.data.length;
      console.log("✅ Facturas obtenidas:", stats.totalInvoices);
      console.log("📋 Datos de facturas:", invoicesResponse.value.data);
    } else {
      console.warn("⚠️ Error obteniendo facturas:", invoicesResponse.reason);
    }

    // Procesar respuesta de historial médico
    if (medicalHistoryResponse.status === 'fulfilled') {
      stats.totalMedicalHistory = medicalHistoryResponse.value.data.length;
      console.log("✅ Historial médico obtenido:", stats.totalMedicalHistory);
      console.log("📋 Datos de historial médico:", medicalHistoryResponse.value.data);
    } else {
      console.warn("⚠️ Error obteniendo historial médico:", medicalHistoryResponse.reason);
    }

    console.log("📊 Estadísticas finales:", stats);
    return stats;

  } catch (error) {
    console.error("❌ Error obteniendo estadísticas del dashboard:", error);
    throw error;
  }
};

// Obtener estadísticas para administradores (todos los datos)
export const getAdminStats = async () => {
  try {
    console.log("🔍 Obteniendo estadísticas de administrador...");
    
    // Para admin, usamos reservas en lugar de servicios
    const [petsResponse, reservationsResponse, invoicesResponse, medicalHistoryResponse] = await Promise.allSettled([
      apiClient.get("/pets/"),
      apiClient.get("/reservations/"), // Admin ve reservas, no servicios
      apiClient.get("/invoice/"),
      apiClient.get("/medical-history/")
    ]);

    const stats = {
      totalPets: 0,
      totalReservations: 0, // Admin ve reservas
      totalInvoices: 0,
      totalMedicalHistory: 0
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

    console.log("📊 Estadísticas de admin:", stats);
    return stats;

  } catch (error) {
    console.error("❌ Error obteniendo estadísticas de admin:", error);
    throw error;
  }
}; 