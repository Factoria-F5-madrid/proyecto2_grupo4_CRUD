import React, { useState, useEffect } from 'react';
import { FaClipboard, FaCalendarAlt, FaMoneyBillWave, FaClock, FaBed, FaCar, FaUtensils, FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllService, deleteService } from '../services/serviceServices';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      console.log("🔍 Cargando servicios...");
      const data = await getAllService();
      console.log("✅ Datos de servicios recibidos:", data);
      setServices(data);
    } catch (error) {
      console.error("❌ Error al cargar servicios:", error);
      setError("Error al cargar los servicios: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      try {
        await deleteService(serviceId);
        loadServices();
      } catch (error) {
        console.error('Error eliminando servicio:', error);
        setError("Error al eliminar el servicio");
      }
    }
  };

  const handleView = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const handleEdit = (serviceId) => {
    navigate(`/services/${serviceId}/edit`);
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
    const [hours, minutes] = duration.split(':');
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredServices = services.filter(service =>
    service.service_id?.toString().includes(searchTerm) ||
    service.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.other_service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.base_price?.toString().includes(searchTerm)
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
        <h1 className="text-4xl font-bold mb-1">Gestión de Servicios</h1>
        <p className="text-sm">Administra todos los servicios de PetLand</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Tabla de servicios */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alojamiento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => (
              <tr key={service.service_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-lg mr-3">
                      {getServiceIcon(service.service_type)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {service.other_service || getServiceTypeLabel(service.service_type)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {service.service_id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {getServiceTypeLabel(service.service_type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(service.base_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDuration(service.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.lodging ? (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Sí
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(service.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(service.service_id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver detalles"
                    >
                      <FaEye />
                    </button>
                    {hasPermission('update_service') && (
                      <button
                        onClick={() => handleEdit(service.service_id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {hasPermission('delete_service') && (
                      <button
                        onClick={() => handleDelete(service.service_id)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Estado vacío */}
      {filteredServices.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mx-auto mb-4">
            <FaClipboard />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm ? 'No se encontraron servicios' : 'No hay servicios disponibles'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Los servicios aparecerán aquí cuando se agreguen al sistema.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Services; 