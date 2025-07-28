import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUser, getAllUsers } from '../services/userServices';
import { 
  FaUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaSignOutAlt,
  FaEdit,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Cargar datos completos del usuario
  useEffect(() => {
    const loadUserData = async () => {
      if (user?.email) {
        try {
          const allUsers = await getAllUsers();
          const currentUser = allUsers.find(u => u.email === user.email);
          
          if (currentUser) {
            setUserData(currentUser);
            setFormData({
              first_name: currentUser.first_name || '',
              last_name: currentUser.last_name || '',
              phone_number: currentUser.phone_number || '',
              email: currentUser.email || ''
            });
          }
        } catch (error) {
          console.error('Error cargando datos del usuario:', error);
        }
      }
    };

    loadUserData();
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
      const userId = userData.user_id.replace('usr-', '');
      const cleanPayload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: Number(formData.phone_number),
        email: formData.email
      };

      await updateUser(userId, cleanPayload);
      
      // Actualizar los datos locales
      setUserData(prev => ({
        ...prev,
        ...cleanPayload
      }));
      
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
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

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return '👑';
      case 'employee':
        return '👨‍��';
      case 'user':
        return '👤';
      default:
        return '👤';
    }
  };

  if (!user) {
    return (
      <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#EEAD05] mx-auto mb-4" />
          <p className="text-gray-600">Cargando información de cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información del Perfil */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Información del Perfil
                  </h2>
                  <p className="text-sm text-gray-500">
                    Datos personales y de contacto
                  </p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-[#EEAD05] text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  <FaEdit />
                  Editar
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                    Guardar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    <FaTimes />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userData?.first_name || 'No especificado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellidos
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                      placeholder="Tus apellidos"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userData?.last_name || 'No especificado'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{userData?.email || user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="text-gray-500" />
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                    placeholder="Tu número de teléfono"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{userData?.phone_number || 'No especificado'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaShieldAlt className="text-gray-500" />
                  Rol
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRoleIcon(userData?.role || user.role)}</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(userData?.role || user.role)}`}>
                    {getRoleLabel(userData?.role || user.role)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la Cuenta */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaShieldAlt className="text-purple-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Información de la Cuenta
                </h2>
                <p className="text-sm text-gray-500">
                  Detalles de tu cuenta
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  ID de Usuario
                </h3>
                <p className="text-gray-600 font-mono text-sm">{userData?.user_id || user.user_id}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" />
                  Miembro desde
                </h3>
                <p className="text-gray-600 text-sm">
                  {userData?.created_at ? new Date(userData.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Fecha no disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  Estado de la Cuenta
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Activa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Cerrar Sesión */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-3 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
          >
            <FaSignOutAlt />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;