import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/userServices';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si hay un usuario guardado en localStorage al cargar la app
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          // Verificar que el token sea válido obteniendo datos del usuario
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        // Si hay error, limpiar datos guardados
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Función de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loginUser({ email, password });
      
      // Guardar datos en localStorage
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.access_token);
      
      setUser(response);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al iniciar sesión');
      return { success: false, error: error.response?.data?.detail || 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await registerUser(userData);
      
      // Guardar datos en localStorage
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.access_token);
      
      setUser(response);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al registrar usuario');
      return { success: false, error: error.response?.data?.detail || 'Error al registrar usuario' };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Función para actualizar datos del usuario
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para limpiar errores
  const clearError = () => {
    setError(null);
  };

  // Función para verificar si el usuario tiene un permiso específico
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // Función para verificar si el usuario tiene acceso a una ruta
  const hasRouteAccess = (route) => {
    if (!user || !user.available_routes) return false;
    return user.available_routes[route] === true;
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Función para verificar si el usuario es empleado
  const isEmployee = () => {
    return user?.role === 'employee';
  };

  // Función para verificar si el usuario es cliente
  const isUser = () => {
    return user?.role === 'user';
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    hasPermission,
    hasRouteAccess,
    isAdmin,
    isEmployee,
    isUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 