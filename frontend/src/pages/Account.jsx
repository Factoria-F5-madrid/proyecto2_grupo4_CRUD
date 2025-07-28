import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaKey, 
  FaCog, 
  FaSignOutAlt,
  FaEdit,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

const Account = () => {
  const { user, logout, isAdmin, isEmployee, isUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Aquí iría la llamada al API para actualizar el perfil
      // Por ahora simulamos una actualización exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.new_password !== formData.confirm_password) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return;
    }

    if (formData.new_password.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Aquí iría la llamada al API para cambiar contraseña
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Contraseña cambiada correctamente' });
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cambiar la contraseña' });
    } finally {
      setLoading(false);
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'employee':
        return 'Empleado';
      case 'user':
        return 'Usuario';
      default:
        return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'employee':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando información de cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Cuenta</h1>
        <p className="text-gray-600">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información del Perfil */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Información del Perfil
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <FaEdit />
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                  Guardar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  <FaTimes />
                  Cancelar
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user.first_name || 'No especificado'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user.last_name || 'No especificado'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                Email
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaShieldAlt className="text-gray-500" />
                Rol
              </label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>
        </div>

        {/* Cambiar Contraseña */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaKey className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Cambiar Contraseña</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña Actual
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu contraseña actual"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Repite la nueva contraseña"
              />
            </div>

            <button
              onClick={handleChangePassword}
              disabled={loading || !formData.current_password || !formData.new_password || !formData.confirm_password}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaKey />}
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Información del Sistema */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaCog className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Información del Sistema</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">ID de Usuario</h3>
            <p className="text-gray-600 font-mono">{user.user_id}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Permisos Disponibles</h3>
            <p className="text-gray-600">{user.permissions?.length || 0} permisos</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Rutas Accesibles</h3>
            <p className="text-gray-600">{user.available_routes?.length || 0} rutas</p>
          </div>
        </div>

        {user.permissions && user.permissions.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-3">Permisos Detallados</h3>
            <div className="flex flex-wrap gap-2">
              {user.permissions.map((permission, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botón de Cerrar Sesión */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Account;