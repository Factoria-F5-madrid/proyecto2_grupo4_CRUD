import React, { useState } from 'react';
import { createReservation } from '../../services/reservationServices';
import { useAuth } from '../../context/AuthContext';
import { FaCalendarAlt, FaClock, FaTimes, FaSpinner, FaCheck } from 'react-icons/fa';

const ModalReservation = ({ onClose, serviceName }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    service_type: '',
    date: '',
    time: '',
    internal_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Opciones de servicios disponibles
  const serviceOptions = [
    { value: 'Guarderia', label: 'Guardería' },
    { value: 'Transporte', label: 'Transporte' },
    { value: 'Comida', label: 'Comida' },
    { value: 'Otros', label: 'Otros Servicios' }
  ];

  // Mapeo de servicios a service_type
  const getServiceType = (serviceName) => {
    const serviceMap = {
      'Guardería': 'Guarderia',
      'Transporte': 'Transporte',
      'Comida': 'Comida',
      'Peluquería': 'Otros',
      'Paseo': 'Otros',
      'Veterinario': 'Otros'
    };
    return serviceMap[serviceName] || 'Otros';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Verificar que el usuario esté autenticado
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.');
      }

      // Verificar que el usuario esté presente en el contexto
      if (!user) {
        throw new Error('No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
      }

      // Obtener el user_id del usuario logueado
      const userId = user.user_id ? user.user_id.toString().replace('usr-', '') : null;
      
      if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario');
      }

      if (!formData.service_type) {
        throw new Error('Por favor, selecciona un tipo de servicio');
      }

      if (!formData.date) {
        throw new Error('Por favor, selecciona una fecha');
      }

      if (!formData.time) {
        throw new Error('Por favor, selecciona una hora');
      }

      // Crear fecha y hora combinadas
      let checkinDate;
      if (formData.date && formData.time) {
        const [year, month, day] = formData.date.split('-');
        const [hour, minute] = formData.time.split(':');
        checkinDate = new Date(year, month - 1, day, hour, minute);
      } else {
        // Usar fecha y hora actual como fallback
        checkinDate = new Date();
      }
      
      // Calcular automáticamente la fecha de salida (1 día después)
      const checkoutDate = new Date(checkinDate);
      checkoutDate.setDate(checkoutDate.getDate() + 1);

      // Crear notas con fecha y hora
      const notesWithDateTime = formData.date && formData.time 
        ? `Fecha: ${formData.date} - Hora: ${formData.time}${formData.internal_notes ? ` - ${formData.internal_notes}` : ''}`
        : formData.internal_notes || '';

      const cleanPayload = {
        user_id: parseInt(userId),
        service_type: formData.service_type,
        checkin_date: checkinDate.toISOString().slice(0, 19), // Formato: 2025-01-30T10:00:00
        checkout_date: checkoutDate.toISOString().slice(0, 19), // Formato: 2025-01-30T10:00:00
        internal_notes: notesWithDateTime
      };

      console.log('Token:', token);
      console.log('Usuario:', user);
      console.log('User ID:', userId);
      console.log('Creando reserva:', cleanPayload);

      await createReservation(cleanPayload);
      
      setMessage({ type: 'success', text: 'Reserva creada correctamente' });
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al crear reserva:', error);
      
      let errorMessage = 'Error al crear la reserva.';
      let shouldRedirect = false;
      
      if (error.message.includes('token') || error.message.includes('autenticación') || error.message.includes('inválido')) {
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        shouldRedirect = true;
      } else if (error.response?.status === 401) {
        errorMessage = 'No autorizado. Por favor, inicia sesión nuevamente.';
        shouldRedirect = true;
      } else if (error.response?.status === 403) {
        errorMessage = 'No tienes permisos para crear esta reserva.';
      } else if (error.response?.status === 422) {
        errorMessage = 'Datos inválidos. Verifica la información ingresada.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Error del servidor. Intenta nuevamente más tarde.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });

      // Redirigir al login si es necesario
      if (shouldRedirect) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaCalendarAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Nueva Reserva
              </h2>
              <p className="text-sm text-gray-500">
                Reserva para {serviceName}
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message.text && (
            <div className={`p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Tipo de Servicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Tipo de Servicio
            </label>
            <select
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
            >
              <option value="">Selecciona un servicio</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Fecha de Reserva
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
            />
          </div>

          {/* Hora */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaClock className="inline mr-2" />
              Hora de Reserva
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
            />
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas Adicionales (Opcional)
            </label>
            <textarea
              name="internal_notes"
              value={formData.internal_notes}
              onChange={handleChange}
              placeholder="Información adicional sobre la reserva..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Especifica cualquier detalle adicional para tu reserva
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#EEAD05] text-white px-4 py-2 rounded hover:bg-yellow-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <FaCheck />
                  Crear Reserva
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalReservation; 