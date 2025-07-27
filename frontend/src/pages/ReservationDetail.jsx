import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaDog, FaClipboard, FaUserTie, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { getReservationById, deleteReservation } from '../services/reservationServices';
import { useAuth } from '../context/AuthContext';

const ReservationDetail = () => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    } catch (error) {
      console.error('Error cargando reserva:', error);
      setError('Error al cargar los detalles de la reserva');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      try {
        await deleteReservation(reservationId);
        navigate('/reservations');
      } catch (error) {
        console.error('Error eliminando reserva:', error);
        setError('Error al eliminar la reserva');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/reservations/${reservationId}/edit`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'No disponible';
    return timeString.substring(0, 5); // Solo HH:MM
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
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
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-1">Detalles de Reserva</h1>
            <p className="text-sm">Reserva #{reservation.reservation_id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/reservations')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FaArrowLeft /> Volver
            </button>
            {hasPermission('update_reservation') && (
              <button
                onClick={handleEdit}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <FaEdit /> Editar
              </button>
            )}
            {hasPermission('delete_reservation') && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <FaTrash /> Eliminar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información principal */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Información General</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}>
                {reservation.status || 'Pendiente'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaUser className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Usuario</p>
                <p className="font-medium">ID: {reservation.user_id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaDog className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Mascota</p>
                <p className="font-medium">ID: {reservation.pet_id || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaClipboard className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Servicio</p>
                <p className="font-medium">ID: {reservation.service_id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fechas y horarios */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fechas y Horarios</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Check-in</p>
                <p className="font-medium">{formatDate(reservation.checkin_date)}</p>
              </div>
            </div>

            {reservation.checkout_date && (
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de Check-out</p>
                  <p className="font-medium">{formatDate(reservation.checkout_date)}</p>
                </div>
              </div>
            )}

            {reservation.checkin_date && reservation.checkout_date && (
              <div className="flex items-center gap-3">
                <FaClock className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Horario</p>
                  <p className="font-medium">
                    {formatTime(reservation.checkin_date)} - {formatTime(reservation.checkout_date)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empleado asignado */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Empleado Asignado</h2>
          
          <div className="flex items-center gap-3">
            <FaUserTie className="text-gray-400" />
            <div>
              {reservation.assigned_employee ? (
                <div>
                  <p className="font-medium">
                    {reservation.assigned_employee.first_name} {reservation.assigned_employee.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {reservation.assigned_employee.specialty}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">Sin asignar</p>
              )}
            </div>
          </div>
        </div>

        {/* Notas */}
        {reservation.internal_notes && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notas</h2>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{reservation.internal_notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationDetail; 