import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser, getAllUsers } from '../services/userServices';
import { 
  FaUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaEdit,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCrown,
  FaUserTie,
  FaUserAlt
} from 'react-icons/fa';

const Account = () => {
  const { user } = useAuth();
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
      // Manejar diferentes formatos de user_id
      let userId;
      if (typeof userData.user_id === 'string') {
        userId = userData.user_id.replace('usr-', '');
      } else if (typeof userData.user_id === 'number') {
        userId = userData.user_id.toString();
      } else {
        // Si no tenemos userData, usar el ID del contexto
        userId = user.user_id ? user.user_id.toString().replace('usr-', '') : null;
      }

      if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario');
      }

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
        return 'bg-red-500';
      case 'employee':
        return 'bg-blue-500';
      case 'user':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FaCrown className="text-white text-xl" />;
      case 'employee':
        return <FaUserTie className="text-white text-xl" />;
      case 'user':
        return <FaUserAlt className="text-white text-xl" />;
      default:
        return <FaUserAlt className="text-white text-xl" />;
    }
  };

  const getRoleBgColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-br from-red-400 to-red-600';
      case 'employee':
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'user':
        return 'bg-gradient-to-br from-green-400 to-green-600';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
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
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tarjeta Principal del Usuario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header con imagen y rol */}
              <div className={`${getRoleBgColor(userData?.role || user.role)} p-6 text-white relative`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      {getRoleIcon(userData?.role || user.role)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {userData?.first_name || 'Usuario'} {userData?.last_name || ''}
                      </h2>
                      <p className="text-white text-opacity-90">
                        {getRoleLabel(userData?.role || user.role)}
                      </p>
                    </div>
                  </div>
                  {!isEditing ? (
                                          <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                      >
                        <FaEdit />
                        Editar Perfil
                      </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {loading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                        Guardar
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                      >
                        <FaTimes />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Información del perfil */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                        placeholder="Tu nombre"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{userData?.first_name || 'No especificado'}</p>
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                        placeholder="Tus apellidos"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{userData?.last_name || 'No especificado'}</p>
                    )}
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{userData?.email || user.email}</p>
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
                        placeholder="Tu número de teléfono"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{userData?.phone_number || 'No especificado'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Información de la Cuenta */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Información de la Cuenta</h2>
                  <p className="text-white text-opacity-90 text-sm">Detalles de tu cuenta</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
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
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Fecha no disponible'}
                </p>
                {user?.created_at && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(user.created_at).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  Estado de la Cuenta
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Activa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;