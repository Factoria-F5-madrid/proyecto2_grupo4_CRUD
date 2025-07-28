const API_BASE_URL =  "https://petland-backend-qnss.onrender.com";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  
  USERS: `${API_BASE_URL}/users`,
  PETS: `${API_BASE_URL}/pets`,
  SERVICES: `${API_BASE_URL}/services`,
  RESERVATIONS: `${API_BASE_URL}/reservations`,
  EMPLOYEES: `${API_BASE_URL}/employees`,
  ACTIVITY_LOGS: `${API_BASE_URL}/activitylogs`,
  MEDICAL_HISTORY: `${API_BASE_URL}/medicalhistory`,
  PAYMENTS: `${API_BASE_URL}/payment`,
  INVOICES: `${API_BASE_URL}/invoice`,
  ASSIGNMENTS: `${API_BASE_URL}/assignment`,
  EXPORT: `${API_BASE_URL}/export`,
};

export default API_BASE_URL; 