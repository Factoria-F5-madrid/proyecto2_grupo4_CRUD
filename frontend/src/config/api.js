// Configuración centralizada para las URLs de la API
const API_BASE_URL = "http://127.0.0.1:8000";

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  
  // Usuarios
  USERS: `${API_BASE_URL}/users`,
  
  // Mascotas
  PETS: `${API_BASE_URL}/pets`,
  
  // Servicios
  SERVICES: `${API_BASE_URL}/services`,
  
  // Reservas
  RESERVATIONS: `${API_BASE_URL}/reservations`,
  
  // Empleados
  EMPLOYEES: `${API_BASE_URL}/employees`,
  
  // Logs de actividad
  ACTIVITY_LOGS: `${API_BASE_URL}/activitylogs`,
  
  // Historial médico
  MEDICAL_HISTORY: `${API_BASE_URL}/medicalhistory`,
  
  // Pagos
  PAYMENTS: `${API_BASE_URL}/payment`,
  
  // Facturas
  INVOICES: `${API_BASE_URL}/invoice`,
  
  // Asignaciones
  ASSIGNMENTS: `${API_BASE_URL}/assignment`,
  
  // Exportación
  EXPORT: `${API_BASE_URL}/export`,
};

export default API_BASE_URL; 