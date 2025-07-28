import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/userServices';


const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);

          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
       
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

 
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loginUser({ email, password });
      
     
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

  
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await registerUser(userData);
      
     
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

  
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };


  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const clearError = () => {
    setError(null);
  };


  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  
  const hasRouteAccess = (route) => {
    if (!user || !user.available_routes) return false;
    return user.available_routes[route] === true;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };


  const isEmployee = () => {
    return user?.role === 'employee';
  };

 
  const isUser = () => {
    return user?.role === 'user';
  };

 
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