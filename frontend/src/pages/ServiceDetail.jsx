import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClipboard, FaCalendarAlt, FaMoneyBillWave, FaClock, FaBed, FaCar, FaUtensils, FaArrowLeft } from 'react-icons/fa';
import { getServiceByID } from '../services/serviceServices';

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadService();
  }, [serviceId]);

  const loadService = async () => {
    try {
      setLoading(true);
      const data = await getServiceByID(serviceId);
      setService(data);
    } catch (error) {
      console.error('Error cargando servicio:', error);
      setError('Error al cargar los detalles del servicio');
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType?.toLowerCase()) {
      case 'guarderia':
        return <FaBed className="text-blue-500" />;
      case 'transporte':
        return <FaCar className="text-green-500" />;
      case 'comida':
        return <FaUtensils className="text-orange-500" />;
      case 'otros':
        return <FaClipboard className="text-purple-500" />;
      default:
        return <FaClipboard className="text-gray-500" />;
    }
  };

  const getServiceTypeLabel = (serviceType) => {
    switch (serviceType?.toLowerCase()) {
      case 'guarderia':
        return 'Guardería';
      case 'transporte':
        return 'Transporte';
      case 'comida':
        return 'Comida';
      case 'otros':
        return 'Otros Servicios';
      default:
        return serviceType || 'Servicio';
    }
  };

  const formatPrice = (price) => {
    if (!price) return '€0.00';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDuration = (duration) => {
    if (!duration) return 'No especificada';
    // Asumiendo que duration viene en formato HH:MM:SS
    const [hours, minutes] = duration.split(':');
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (!service) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Servicio no encontrado
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
            <h1 className="text-4xl font-bold mb-1">Detalles de Servicio</h1>
            <p className="text-sm">ID: {service.service_id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/services')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FaArrowLeft /> Volver
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información principal */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Información General</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {getServiceIcon(service.service_type)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo de Servicio</p>
                <p className="font-medium">{getServiceTypeLabel(service.service_type)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Precio Base</p>
                <p className="font-medium text-green-600">{formatPrice(service.base_price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Duración</p>
                <p className="font-medium">{formatDuration(service.duration)}</p>
              </div>
            </div>

            {service.lodging && (
              <div className="flex items-center gap-3">
                <FaBed className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Alojamiento</p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Incluido
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detalles adicionales */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles Adicionales</h2>
          
          <div className="space-y-4">
            {service.other_service && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Servicio Adicional</p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800">{service.other_service}</p>
                </div>
              </div>
            )}

            {service.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Notas</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700">{service.notes}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-2">Estado de Alojamiento</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.lodging 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {service.lodging ? 'Incluye alojamiento' : 'Sin alojamiento'}
              </span>
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fechas</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Creación</p>
                <p className="font-medium">{formatDate(service.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información del servicio */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Información del Servicio</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">ID del Servicio</p>
              <p className="font-medium">{service.service_id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Tipo de Servicio</p>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {getServiceTypeLabel(service.service_type)}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Precio</p>
              <p className="font-medium text-green-600">{formatPrice(service.base_price)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail; 