import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllService } from '../services/serviceServices';
import { useAuth } from '../context/AuthContext';
import { 
  FaClipboard, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaClock, 
  FaBed, 
  FaCar, 
  FaUtensils,
  FaPlus,
  FaSpinner,
  FaEye
} from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAdmin, isEmployee, isUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        console.log("🔍 Iniciando fetchServices...");
        console.log("👤 Usuario actual:", user);
        
        const data = await getAllService();
        console.log("✅ Datos recibidos:", data);
        console.log("📊 Número de servicios:", data.length);
        
        setServices(data);
      } catch (error) {
        console.error("❌ Error al cargar servicios:", error);
        setError("Error al cargar los servicios: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  console.log("🎨 Renderizando Services component");
  console.log("📊 Estado actual de services:", services);
  console.log("👤 Usuario:", user);
  console.log("🔐 Es admin:", isAdmin());
  console.log("🔐 Es employee:", isEmployee());
  console.log("🔐 Es usuario regular:", isUser());

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
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-[#1c1f26] font-bold">
            {isAdmin() || isEmployee() ? 'Servicios Disponibles' : 'Mis Servicios Contratados'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isAdmin() || isEmployee() 
              ? 'Gestiona todos los servicios disponibles en el sistema'
              : 'Aquí puedes ver todos los servicios que has contratado para tus mascotas'
            }
          </p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.service_id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">
                  {getServiceIcon(service.service_type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getServiceTypeLabel(service.service_type)}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {service.service_id}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {service.other_service && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Servicio adicional:</span> {service.other_service}
                    </p>
                  </div>
                )}
                
                {service.notes && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Notas:</span> {service.notes}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMoneyBillWave className="text-green-500" />
                  <span className="font-medium">Precio:</span> {formatPrice(service.base_price)}
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-blue-500" />
                  <span className="font-medium">Duración:</span> {formatDuration(service.duration)}
                </div>
                
                {service.lodging && (
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    <FaBed className="inline mr-1" />
                    Incluye alojamiento
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Creado: {formatDate(service.created_at)}
                  </p>
                  <button
                    onClick={() => navigate(`/services/${service.service_id}`)}
                    className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <FaEye />
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mx-auto mb-4">
            {isAdmin() || isEmployee() ? <FaClipboard /> : <FaPlus />}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {isAdmin() || isEmployee() 
              ? "No hay servicios disponibles" 
              : "No has contratado servicios aún"
            }
          </h3>
          <p className="text-gray-500 text-lg mb-4">
            {isAdmin() || isEmployee() 
              ? "Los servicios aparecerán aquí cuando se agreguen al sistema." 
              : "Los servicios aparecerán aquí cuando hagas una reserva."
            }
          </p>
          {isUser() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-800 text-sm">
                💡 <strong>Consejo:</strong> Para contratar servicios, ve a la sección de "Reservas" y crea una nueva reserva.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Services; 