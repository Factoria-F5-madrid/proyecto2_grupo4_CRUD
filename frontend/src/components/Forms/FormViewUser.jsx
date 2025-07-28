import React from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUserTie, FaIdCard } from "react-icons/fa";

const FormViewUser = ({ user, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'employee':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'user':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'Administrador';
      case 'employee':
        return 'Empleado';
      case 'user':
        return 'Usuario';
      default:
        return role || 'No definido';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FaUser className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Ficha de {user.first_name} {user.last_name}
              </h2>
              <p className="text-sm text-gray-500">
                Información completa del usuario
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información personal */}
            <div className="space-y-6">
              {/* Avatar y nombre */}
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <div className="h-24 w-24 bg-[#edad06] text-white flex items-center justify-center rounded-full font-bold text-2xl uppercase mx-auto mb-4">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600">ID: {user.user_id}</p>
              </div>

              {/* Información de contacto */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaEnvelope className="text-blue-600" />
                  Información de Contacto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="font-medium text-gray-900">{user.phone_number}</p>
                    </div>
                  </div>
                  {user.address && (
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Dirección</p>
                        <p className="font-medium text-gray-900">{user.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Información del rol */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaUserTie className="text-purple-600" />
                  Información del Rol
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Rol</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Usuario</p>
                    <p className="font-medium text-gray-900 capitalize">{user.type || 'Usuario'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="space-y-6">
              {/* Fechas */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaCalendar className="text-green-600" />
                  Fechas
                </h3>
                <div className="space-y-3">
                  {user.registration_date && (
                    <div>
                      <p className="text-sm text-gray-600">Fecha de Registro</p>
                      <p className="font-medium text-gray-900">{formatDate(user.registration_date)}</p>
                    </div>
                  )}
                  {user.last_update && (
                    <div>
                      <p className="text-sm text-gray-600">Última Actualización</p>
                      <p className="font-medium text-gray-900">{formatDate(user.last_update)}</p>
                    </div>
                  )}
                  {user.update_date && (
                    <div>
                      <p className="text-sm text-gray-600">Fecha de Modificación</p>
                      <p className="font-medium text-gray-900">{formatDate(user.update_date)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Información del sistema */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaIdCard className="text-gray-600" />
                  Información del Sistema
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">ID del Usuario</p>
                    <p className="font-medium text-gray-900">{user.user_id}</p>
                  </div>
                  {user.updated_by && (
                    <div>
                      <p className="text-sm text-gray-600">Actualizado por</p>
                      <p className="font-medium text-gray-900">{user.updated_by}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Información específica según el tipo */}
              {user.type === 'employee' && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Información de Empleado</h3>
                  <div className="space-y-3">
                    {user.specialty && (
                      <div>
                        <p className="text-sm text-gray-600">Especialidad</p>
                        <p className="font-medium text-gray-900">{user.specialty}</p>
                      </div>
                    )}
                    {user.hire_date && (
                      <div>
                        <p className="text-sm text-gray-600">Fecha de Contratación</p>
                        <p className="font-medium text-gray-900">{formatDate(user.hire_date)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormViewUser; 