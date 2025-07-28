import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaDog, FaClipboard, FaUserTie, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { getReservationById, updateReservation } from '../services/reservationServices';
import { useAuth } from '../context/AuthContext';

const ReservationEdit = () => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    status: 'pending',
    internal_notes: ''
  });
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadReservation();
  }, [reservationId]);

  const loadReservation = async () => {
    try {
      setLoading(true);
      const data = await getReservationById(reservationId);
      setReservation(data);
      
     
      setFormData({
        status: data.status || 'pending',
        internal_notes: data.internal_notes || ''
      });
    } catch (error) {
      console.error('Error cargando reserva:', error);
      setError('Error al cargar los detalles de la reserva');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasPermission('update_reservation')) {
      setError('No tienes permisos para actualizar reservas');
      return;
    }

    try {
      setSaving(true);
      setError('');

    
      if (!formData.status) {
        setError('El estado es obligatorio');
        return;
      }

     
      const updateData = {
        status: formData.status,
        internal_notes: formData.internal_notes || null
      };

      console.log('Enviando datos de actualización:', updateData);
      await updateReservation(reservationId, updateData);
      
    
      navigate(`/reservations/${reservationId}`);
    } catch (error) {
      console.error('Error actualizando reserva:', error);
      setError('Error al actualizar la reserva: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/reservations/${reservationId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error && !reservation) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Reserva no encontrada
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
                  <div>
            <h1 className="text-4xl font-bold mb-1">Editar Reserva</h1>
            <p className="text-sm">Reserva #{reservation.reservation_id}</p>
          </div>
      </div>

   
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

     
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClock className="inline mr-2 text-gray-400" />
                Estado *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmado</option>
                <option value="cancelled">Cancelado</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas Internas
            </label>
            <textarea
              name="internal_notes"
              value={formData.internal_notes}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Notas adicionales sobre la reserva..."
            />
          </div>

       
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#edad06] hover:bg-yellow-400 disabled:bg-yellow-300 text-white rounded-lg flex items-center gap-2"
            >
              <FaSave />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationEdit; 