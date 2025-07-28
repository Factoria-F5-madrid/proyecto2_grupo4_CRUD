import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSpinner, FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyReservations();
  }, []);

  const fetchMyReservations = async () => {
    try {
      setLoading(true);
    
      const mockReservations = [
        {
          reservation_id: 1,
          service_name: "Guardería",
          checkin_date: "2025-01-30T10:00:00",
          checkout_date: "2025-01-31T10:00:00",
          status: "confirmed",
          internal_notes: "Fecha: 2025-01-30 - Hora: 10:00 - Mascota: Luna"
        },
        {
          reservation_id: 2,
          service_name: "Transporte",
          checkin_date: "2025-02-05T14:30:00",
          checkout_date: "2025-02-05T15:30:00",
          status: "pending",
          internal_notes: "Fecha: 2025-02-05 - Hora: 14:30 - Destino: Veterinario"
        }
      ];
      
      setReservations(mockReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 mx-auto mb-4 text-blue-500 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-800">Cargando reservas...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis Reservas
          </h1>
          <p className="text-gray-600">
            Aquí puedes ver todas tus reservas y su estado actual
          </p>
        </div>

     
        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <FaCalendarAlt className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No tienes reservas
            </h3>
            <p className="text-gray-500 mb-6">
              Aún no has realizado ninguna reserva
            </p>
            <button
              onClick={() => window.location.href = '/services'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Ver Servicios
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <div
                key={reservation.reservation_id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
              
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {reservation.service_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Reserva #{reservation.reservation_id}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </div>
                </div>

               
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500" />
                          Fechas
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Entrada:</span>
                            <span className="text-sm font-medium">
                              {formatDate(reservation.checkin_date)} a las {formatTime(reservation.checkin_date)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Salida:</span>
                            <span className="text-sm font-medium">
                              {formatDate(reservation.checkout_date)} a las {formatTime(reservation.checkout_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

               
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-500" />
                        Detalles
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {reservation.internal_notes || 'Sin detalles adicionales'}
                        </p>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations; 