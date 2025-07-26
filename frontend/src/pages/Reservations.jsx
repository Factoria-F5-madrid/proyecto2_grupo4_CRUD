import React, { useState, useEffect } from 'react';
import { getAllReservations } from '../services/reservationServices';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaClock, FaUser, FaDog, FaClipboard, FaUserTie } from 'react-icons/fa';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAdmin, isEmployee } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log("🔍 Iniciando fetchReservations...");
        console.log("👤 Usuario actual:", user);
        
        const data = await getAllReservations();
        console.log("✅ Datos de reservas recibidos:", data);
        console.log("📊 Número de reservas:", data.length);
        
        setReservations(data);
      } catch (error) {
        console.error("❌ Error al cargar reservas:", error);
        setError("Error al cargar las reservas: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

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
      <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reservas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-[#1c1f26] font-bold mb-2">
          {isAdmin() ? 'Gestión de Reservas' : isEmployee() ? 'Reservas del Sistema' : 'Mis Reservas'}
        </h1>
        <p className="text-gray-600">
          {isAdmin() || isEmployee() 
            ? 'Gestiona todas las reservas del sistema' 
            : 'Consulta el estado de tus reservas'
          }
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {reservations.length > 0 ? (
        <div className="grid gap-6">
          {reservations.map((reservation) => (
            <div
              key={reservation.reservation_id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <FaCalendarAlt />
                      <span className="font-semibold">Reserva #{reservation.reservation_id}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}>
                      {reservation.status || 'Pendiente'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Usuario</p>
                        <p className="font-medium">ID: {reservation.user_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaDog className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Mascota</p>
                        <p className="font-medium">ID: {reservation.pet_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaClipboard className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Servicio</p>
                        <p className="font-medium">ID: {reservation.service_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Fecha</p>
                        <p className="font-medium">{formatDate(reservation.checkin_date)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Empleado Asignado</p>
                        {reservation.assigned_employee ? (
                          <div>
                            <p className="font-medium">
                              {reservation.assigned_employee.first_name} {reservation.assigned_employee.last_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {reservation.assigned_employee.specialty}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">Sin asignar</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {reservation.checkin_date && reservation.checkout_date && (
                    <div className="mt-4 flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatTime(reservation.checkin_date)} - {formatTime(reservation.checkout_date)}
                      </span>
                    </div>
                  )}

                  {reservation.internal_notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Notas:</strong> {reservation.internal_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {isAdmin() || isEmployee() ? 'No hay reservas en el sistema' : 'No tienes reservas'}
          </h3>
          <p className="text-gray-500">
            {isAdmin() || isEmployee() 
              ? 'Las reservas aparecerán aquí cuando los usuarios las creen.' 
              : 'Crea tu primera reserva para empezar.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Reservations;