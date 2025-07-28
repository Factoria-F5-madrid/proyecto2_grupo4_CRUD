import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import daycareServ from '../assets/daycareServ.png';
import foodServ from '../assets/foodServ.png';
import transportationServ from '../assets/transportationServ.png';
import groomingServ from '../assets/groomingServ.png';
import walkServ from '../assets/walkServ.png';
import vetServ from '../assets/vetServ.png';
import petImage from '../assets/petland-logo-letra-azul.png';
import { FaCalendarAlt, FaInfoCircle, FaClock, FaStar, FaSignInAlt, FaTimes, FaCheck, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUsers, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ModalReservation from '../components/Nav/ModalReservation';
import FormEditService from '../components/Forms/FormEditService';
import FormCreateService from '../components/Forms/FormCreateService';
import { deleteService } from '../services/serviceServices';
import { useAuth } from '../context/AuthContext';

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceForReservation, setSelectedServiceForReservation] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showServiceInfo, setShowServiceInfo] = useState(false);
  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, hasPermission } = useAuth();

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Guardería",
      image: daycareServ,
      description: "Cuidado profesional para tu mascota",
      available: true,
      price: "€25/día",
      detailedInfo: {
        title: "Guardería Profesional",
        description: "Ofrecemos un cuidado completo y profesional para tu mascota en un ambiente seguro y acogedor.",
        features: [
          "Instalaciones limpias y seguras",
          "Personal cualificado y experimentado",
          "Horarios flexibles (24/7)",
          "Alimentación personalizada",
          "Ejercicio y socialización",
          "Reportes diarios de actividad"
        ],
        duration: "Mínimo 1 día",
        capacity: "Hasta 20 mascotas por turno",
        requirements: "Vacunas al día y desparasitación",
        contact: {
          phone: "+34 600 123 456",
          email: "guarderia@petland.com",
          address: "Calle Mascotas 123, Madrid"
        }
      }
    },
    {
      id: 2,
      name: "Transporte",
      image: transportationServ,
      description: "Transporte seguro y cómodo",
      available: true,
      price: "€15/viaje",
      detailedInfo: {
        title: "Servicio de Transporte",
        description: "Transporte seguro y cómodo para tu mascota con vehículos especialmente adaptados.",
        features: [
          "Vehículos climatizados",
          "Jaulas de transporte seguras",
          "Conductores especializados",
          "Cobertura en toda la ciudad",
          "Horarios flexibles",
          "Seguimiento GPS en tiempo real"
        ],
        duration: "Según distancia",
        capacity: "Hasta 3 mascotas por viaje",
        requirements: "Transportín propio o alquiler disponible",
        contact: {
          phone: "+34 600 123 457",
          email: "transporte@petland.com",
          address: "Servicio móvil en toda Madrid"
        }
      }
    },
    {
      id: 3,
      name: "Comida",
      image: foodServ,
      description: "Alimentación especializada",
      available: true,
      price: "€12/paquete",
      detailedInfo: {
        title: "Alimentación Especializada",
        description: "Comida de alta calidad adaptada a las necesidades específicas de tu mascota.",
        features: [
          "Comida premium certificada",
          "Dietas personalizadas",
          "Opciones para mascotas con alergias",
          "Entrega a domicilio",
          "Asesoramiento nutricional",
          "Seguimiento de peso y salud"
        ],
        duration: "Entrega en 24h",
        capacity: "Paquetes de 1kg, 5kg y 10kg",
        requirements: "Evaluación inicial de necesidades",
        contact: {
          phone: "+34 600 123 458",
          email: "comida@petland.com",
          address: "Entrega a domicilio en Madrid"
        }
      }
    },
    {
      id: 4,
      name: "Peluquería",
      image: groomingServ,
      description: "Cuidado y belleza para tu mascota",
      available: false,
      price: "€30/sesión",
      detailedInfo: {
        title: "Peluquería Canina y Felina",
        description: "Servicio completo de peluquería con técnicas profesionales y productos de alta calidad.",
        features: [
          "Baño y secado profesional",
          "Corte de pelo a medida",
          "Corte de uñas",
          "Limpieza de oídos",
          "Cepillado y desenredado",
          "Tratamientos especiales"
        ],
        duration: "2-3 horas por sesión",
        capacity: "1 mascota por sesión",
        requirements: "Cita previa obligatoria",
        contact: {
          phone: "+34 600 123 459",
          email: "peluqueria@petland.com",
          address: "Calle Belleza 456, Madrid"
        }
      }
    },
    {
      id: 5,
      name: "Paseo",
      image: walkServ,
      description: "Paseos recreativos y ejercicio",
      available: false,
      price: "€10/paseo",
      detailedInfo: {
        title: "Servicio de Paseo",
        description: "Paseos recreativos y ejercicio personalizado para mantener a tu mascota activa y feliz.",
        features: [
          "Paseos individuales o grupales",
          "Rutas personalizadas",
          "Ejercicio adaptado a la edad",
          "Socialización con otras mascotas",
          "Reportes de actividad",
          "Horarios flexibles"
        ],
        duration: "30, 45 o 60 minutos",
        capacity: "Hasta 3 mascotas por paseador",
        requirements: "Correa y identificación obligatorias",
        contact: {
          phone: "+34 600 123 460",
          email: "paseo@petland.com",
          address: "Servicio en tu zona de Madrid"
        }
      }
    },
    {
      id: 6,
      name: "Veterinario",
      image: vetServ,
      description: "Atención médica especializada",
      available: false,
      price: "€50/consulta",
      detailedInfo: {
        title: "Atención Veterinaria",
        description: "Servicio médico completo con veterinarios especializados y equipamiento de última generación.",
        features: [
          "Consultas generales",
          "Vacunación y desparasitación",
          "Análisis clínicos",
          "Radiografías y ecografías",
          "Cirugías menores",
          "Medicina preventiva"
        ],
        duration: "30-60 minutos por consulta",
        capacity: "Atención individual",
        requirements: "Historial médico previo",
        contact: {
          phone: "+34 600 123 461",
          email: "veterinario@petland.com",
          address: "Calle Salud 789, Madrid"
        }
      }
    }
  ]);

  const handleReservation = (service) => {
    // Verificar si el usuario está logueado
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Si está logueado, abrir el modal de reserva
    setSelectedServiceForReservation(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedServiceForReservation(null);
  };

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const handleServiceInfo = (service) => {
    setSelectedServiceInfo(service);
    setShowServiceInfo(true);
  };

  const handleCloseServiceInfo = () => {
    setShowServiceInfo(false);
    setSelectedServiceInfo(null);
  };

  const handleEditService = (service) => {
    console.log('Editando servicio:', service);
    setSelectedServiceToEdit(service);
    setShowEditModal(true);
  };

  const handleServiceUpdated = (updatedService) => {
    console.log('Servicio actualizado del backend:', updatedService);
    
    // Mapear los datos del backend al formato del frontend
    const mappedService = {
      id: updatedService.service_id,
      name: updatedService.other_service || updatedService.service_type.value,
      description: updatedService.notes || '',
      price: `€${updatedService.base_price}`,
      available: updatedService.lodging,
      image: updatedService.image || '', // Mantener la imagen original si no se actualizó
      detailedInfo: updatedService.detailedInfo || {} // Mantener la información detallada si existe
    };
    
    console.log('Servicio mapeado para el frontend:', mappedService);
    
    // Actualizar la lista de servicios con el servicio mapeado
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === mappedService.id ? mappedService : service
      )
    );
    setShowEditModal(false);
    setSelectedServiceToEdit(null);
  };

  const handleCreateService = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleServiceCreated = (newService) => {
    console.log('Servicio creado:', newService);
    // Agregar el nuevo servicio a la lista
    setServices(prevServices => [...prevServices, newService]);
    setShowCreateModal(false);
  };

  const handleDeleteService = async (service) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el servicio "${service.name}"?`)) {
      try {
        console.log('Eliminando servicio:', service);
        await deleteService(service.id);
        console.log('Servicio eliminado exitosamente');
        
        // Remover el servicio de la lista local
        setServices(prevServices => 
          prevServices.filter(s => s.id !== service.id)
        );
        
        alert('Servicio eliminado exitosamente');
      } catch (error) {
        console.error('Error eliminando servicio:', error);
        alert('Error al eliminar el servicio: ' + error.message);
      }
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
        <div className="text-center mb-8">
          <img
            src={petImage}
            alt="PetLand Logo"
            className="w-48 h-auto object-contain mx-auto mb-6"
          />
          
          <div className="bg-[#EEAD05] rounded-xl p-6 mb-8 shadow-lg text-white">
            <h1 className="text-4xl font-bold mb-3">Servicios para Mascotas</h1>
            <p className="text-lg">
              Elige el servicio perfecto para tu mascota 🐾
            </p>
          </div>
        </div>

        {/* Botón de crear servicio - solo para admin */}
        {isAdmin() && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleCreateService}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              Crear Servicio
            </button>
      </div>
        )}

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Imagen del servicio */}
              <div className="h-48 overflow-hidden relative group">
                <img 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  src={service.image} 
                  alt={service.name} 
                />
                
                {/* Botones de administrador - solo visibles para admin */}
                {isAdmin() && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditService(service);
                      }}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md"
                      title="Editar servicio"
                    >
                      <FaEdit className="text-indigo-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteService(service);
                      }}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md"
                      title="Eliminar servicio"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
        </div>
      )}
              </div>
      
              {/* Información del servicio */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                  <span className="text-[#EEAD05] font-bold">{service.price}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                {/* Botones de acción */}
                <div className="flex gap-3">
                  {service.available ? (
                    <button 
                      onClick={() => handleReservation(service)}
                      className="flex-1 bg-[#EEAD05] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCalendarAlt />
                      Reservar
                    </button>
                  ) : (
                    <button
                      className="flex-1 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
                      disabled
                    >
                      <FaClock />
                      Próximamente
                      </button>
                    )}
                  
                      <button
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleServiceInfo(service)}
                      >
                    <FaInfoCircle />
                    Saber más
                      </button>
                </div>
              </div>
                  </div>
            ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaStar className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Calidad Garantizada</h3>
            </div>
            <p className="text-gray-600">
              Todos nuestros servicios cuentan con profesionales certificados y 
              las mejores prácticas de cuidado animal.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaClock className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Horario Flexible</h3>
            </div>
            <p className="text-gray-600">
              Servicios disponibles 24/7 para emergencias y horarios flexibles 
              para servicios regulares.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Reservas Fáciles</h3>
            </div>
            <p className="text-gray-600">
              Sistema de reservas online simple y rápido. 
              Confirma tu cita en segundos.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de reserva */}
      {showModal && selectedServiceForReservation && (
        <ModalReservation 
          onClose={handleCloseModal} 
          serviceName={selectedServiceForReservation.name}
        />
      )}

      {/* Modal de login requerido */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl text-center max-w-md w-full">
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaSignInAlt className="text-3xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">¡Inicia Sesión!</h2>
              <p className="text-gray-600 mb-6">
                Para reservar un servicio, necesitas iniciar sesión en tu cuenta.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLoginRedirect}
                  className="bg-[#EEAD05] text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaSignInAlt />
                  Ir a Login
                </button>
                <button
                  onClick={handleCloseLoginPrompt}
                  className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de información detallada */}
      {showServiceInfo && selectedServiceInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header con imagen */}
            <div className="relative h-48 bg-gradient-to-r from-[#EEAD05] to-yellow-500 rounded-t-lg">
              <img 
                src={selectedServiceInfo.image} 
                alt={selectedServiceInfo.name}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-between p-6">
                <div className="text-white">
                  <h2 className="text-3xl font-bold">{selectedServiceInfo.detailedInfo.title}</h2>
                  <p className="text-lg opacity-90">{selectedServiceInfo.price}</p>
                </div>
                <button 
                  onClick={handleCloseServiceInfo} 
                  className="text-white hover:text-gray-200 p-2"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Descripción */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedServiceInfo.detailedInfo.description}
                </p>
              </div>

              {/* Características y Detalles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Características */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <FaCheck className="text-blue-600" />
                    Características del Servicio
                  </h3>
                  <ul className="space-y-2">
                    {selectedServiceInfo.detailedInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detalles */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                    <FaInfoCircle className="text-green-600" />
                    Información Importante
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-600" />
                      <span className="font-semibold">Duración:</span>
                      <span className="text-gray-700">{selectedServiceInfo.detailedInfo.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-green-600" />
                      <span className="font-semibold">Capacidad:</span>
                      <span className="text-gray-700">{selectedServiceInfo.detailedInfo.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheck className="text-green-600" />
                      <span className="font-semibold">Requisitos:</span>
                      <span className="text-gray-700">{selectedServiceInfo.detailedInfo.requirements}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <FaPhone className="text-purple-600" />
                  Información de Contacto
          </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <span>{selectedServiceInfo.detailedInfo.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="text-purple-600" />
                    <a 
                      href={`tel:${selectedServiceInfo.detailedInfo.contact.phone}`} 
                      className="hover:text-purple-600 hover:underline"
                    >
                      {selectedServiceInfo.detailedInfo.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="text-purple-600" />
                    <a 
                      href={`mailto:${selectedServiceInfo.detailedInfo.contact.email}`} 
                      className="hover:text-purple-600 hover:underline"
                    >
                      {selectedServiceInfo.detailedInfo.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Botón de reserva */}
              {selectedServiceInfo.available && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => {
                      handleCloseServiceInfo();
                      handleReservation(selectedServiceInfo);
                    }}
                    className="bg-[#EEAD05] hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-lg"
                  >
                    <FaCalendarAlt />
                    Reservar Ahora
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición de servicio */}
      {showEditModal && selectedServiceToEdit && (
        <FormEditService
          service={selectedServiceToEdit}
          onClose={() => {
            setShowEditModal(false);
            setSelectedServiceToEdit(null);
          }}
          onServiceUpdated={handleServiceUpdated}
        />
      )}

      {/* Modal de crear servicio */}
      {showCreateModal && (
        <FormCreateService
          onClose={handleCloseCreateModal}
          onServiceCreated={handleServiceCreated}
        />
      )}
    </div>
  );
};

export default Services; 