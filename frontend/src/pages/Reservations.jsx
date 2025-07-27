import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaDog, FaClipboard, FaUserTie, FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllReservations, deleteReservation } from '../services/reservationServices';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      console.log("🔍 Cargando reservas...");
      const data = await getAllReservations();
      console.log("✅ Datos de reservas recibidos:", data);
      setReservations(data);
    } catch (error) {
      console.error("❌ Error al cargar reservas:", error);
      setError("Error al cargar las reservas: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      try {
        await deleteReservation(reservationId);
        loadReservations();
      } catch (error) {
        console.error('Error eliminando reserva:', error);
        setError("Error al eliminar la reserva");
      }
    }
  };

  const handleView = (reservationId) => {
    navigate(`/reservations/${reservationId}`);
  };

  const handleEdit = (reservationId) => {
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

  const filteredReservations = reservations.filter(reservation =>
    reservation.reservation_id?.toString().includes(searchTerm) ||
    reservation.user_id?.toString().includes(searchTerm) ||
    reservation.pet_id?.toString().includes(searchTerm) ||
    reservation.service_id?.toString().includes(searchTerm) ||
    reservation.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <h1 className="text-4xl font-bold mb-1">Gestión de Reservas</h1>
        <p className="text-sm">Administra todas las reservas de PetLand</p>
      </div>

      {/* Barra de búsqueda y botón */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar reservas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {hasPermission('create_reservation') && (
          <button
            onClick={() => navigate('/reservations/new')}
            className="bg-[#edad06] hover:bg-yellow-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
          >
            <FaPlus /> Nueva Reserva
          </button>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Tabla de reservas */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Reserva</th>
              <th className="px-6 py-3 text-left">Usuario</th>
              <th className="px-6 py-3 text-left">Mascota</th>
              <th className="px-6 py-3 text-left">Servicio</th>
              <th className="px-6 py-3 text-left">Fecha</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.reservation_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#edad06] text-white flex items-center justify-center rounded-full font-bold">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Reserva #{reservation.reservation_id}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(reservation.checkin_date)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-2" />
                    ID: {reservation.user_id}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaDog className="text-gray-400 mr-2" />
                    ID: {reservation.pet_id || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaClipboard className="text-gray-400 mr-2" />
                    ID: {reservation.service_id}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-2" />
                    {formatDate(reservation.checkin_date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                    {reservation.status || 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {hasPermission('read_reservation') && (
                      <button
                        onClick={() => handleView(reservation.reservation_id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver detalles"
                      >
                        <FaEye />
                      </button>
                    )}
                    {hasPermission('update_reservation') && (
                      <button
                        onClick={() => handleEdit(reservation.reservation_id)}
                        className="text-green-600 hover:text-green-800"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {hasPermission('delete_reservation') && (
                      <button
                        onClick={() => handleDelete(reservation.reservation_id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensaje cuando no hay reservas */}
      {filteredReservations.length === 0 && !loading && (
        <div className="text-center py-12">
          <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No hay reservas
          </h3>
          <p className="text-gray-500">
            Las reservas aparecerán aquí cuando se creen.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reservations;