// Configuración centralizada para las URLs de la API
const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  // Users
  USERS: `${API_BASE_URL}/users`,
  
  // Pets
  PETS: `${API_BASE_URL}/pets`,
  
  // Services
  SERVICES: `${API_BASE_URL}/services`,
  
  // Reservations
  RESERVATIONS: `${API_BASE_URL}/reservations`,
  
  // Employees
  EMPLOYEES: `${API_BASE_URL}/employees`,
  
  // Activity Logs
  ACTIVITY_LOGS: `${API_BASE_URL}/activitylogs`,
  
  // Medical History
  MEDICAL_HISTORY: `${API_BASE_URL}/medicalhistory`,
  
  // Payments
  PAYMENTS: `${API_BASE_URL}/payment`,
  
  // Invoices
  INVOICES: `${API_BASE_URL}/invoice`,
  
  // Assignments
  ASSIGNMENTS: `${API_BASE_URL}/assignment`,
  
  // Auth
  AUTH: `${API_BASE_URL}/auth`,
  
  // Export
  EXPORT: `${API_BASE_URL}/export`,
};

export default API_BASE_URL; 