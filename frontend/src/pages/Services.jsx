import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import daycareServ from '../assets/daycareServ.png';
import foodServ from '../assets/foodServ.png';
import transportationServ from '../assets/transportationServ.png';
import groomingServ from '../assets/groomingServ.png';
import walkServ from '../assets/walkServ.png';
import vetServ from '../assets/vetServ.png';
import petImage from '../assets/petland-logo-letra-azul.png';
import { FaCalendarAlt, FaInfoCircle, FaClock, FaStar, FaSignInAlt } from 'react-icons/fa';
import ModalReservation from '../components/Nav/ModalReservation';
import { useAuth } from '../context/AuthContext';

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showServiceInfo, setShowServiceInfo] = useState(false);
  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const services = [
    {
      id: 1,
      name: "Guardería",
      image: daycareServ,
      description: "Cuidado profesional para tu mascota",
      available: true,
      price: "€25/día",
      detailedInfo: {
        duration: "1-7 días",
        includes: ["Alimentación personalizada", "Ejercicio diario", "Cuidado veterinario básico", "Reporte diario"],
        requirements: ["Vacunas al día", "Desparasitación reciente", "Comportamiento social"],
        benefits: ["Socialización con otros animales", "Monitoreo 24/7", "Espacios seguros y limpios"]
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
        duration: "30-60 minutos",
        includes: ["Transporte puerta a puerta", "Jaula segura", "Aire acondicionado", "Conductor certificado"],
        requirements: ["Mascota con correa/jaula", "Dirección exacta", "Horario confirmado"],
        benefits: ["Sin estrés para la mascota", "Puntualidad garantizada", "Cobertura de seguro"]
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
        duration: "Entrega en 24h",
        includes: ["Comida premium", "Raciones personalizadas", "Suplementos vitamínicos", "Asesoría nutricional"],
        requirements: ["Información de peso y edad", "Alergias conocidas", "Preferencias alimentarias"],
        benefits: ["Nutrición balanceada", "Mejora de la salud", "Control de peso"]
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
        duration: "2-3 horas",
        includes: ["Baño y secado", "Corte de pelo", "Corte de uñas", "Limpieza de oídos"],
        requirements: ["Mascota tranquila", "Cita previa", "Vacunas al día"],
        benefits: ["Hygiene mejorada", "Prevención de problemas", "Aspecto saludable"]
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
        duration: "30-45 minutos",
        includes: ["Paseo personalizado", "Ejercicio controlado", "Socialización", "Reporte del paseo"],
        requirements: ["Mascota con correa", "Comportamiento básico", "Horario acordado"],
        benefits: ["Ejercicio diario", "Estimulación mental", "Reducción de ansiedad"]
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
        duration: "45-60 minutos",
        includes: ["Examen físico completo", "Vacunación", "Desparasitación", "Asesoría médica"],
        requirements: ["Historial médico", "Cita previa", "Mascota en ayunas (si aplica)"],
        benefits: ["Prevención de enfermedades", "Detección temprana", "Cuidado preventivo"]
      }
    }
  ];

  const handleReservation = (service) => {
    // Verificar si el usuario está logueado
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Si está logueado, abrir el modal de reserva
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
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

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Imagen del servicio */}
              <div className="h-48 overflow-hidden">
                <img 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  src={service.image} 
                  alt={service.name} 
                />
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
      {showModal && selectedService && (
        <ModalReservation 
          onClose={handleCloseModal} 
          serviceName={selectedService.name}
        />
      )}

      {/* Modal de información del servicio */}
      {showServiceInfo && selectedServiceInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={selectedServiceInfo.image} 
                      alt={selectedServiceInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedServiceInfo.name}</h2>
                    <p className="text-[#EEAD05] font-semibold text-lg">{selectedServiceInfo.price}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseServiceInfo}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <p className="text-gray-600 text-lg">{selectedServiceInfo.description}</p>
              </div>

              {/* Información detallada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Duración */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <FaClock className="text-blue-600" />
                    Duración
                  </h3>
                  <p className="text-blue-700">{selectedServiceInfo.detailedInfo.duration}</p>
                </div>

                {/* Incluye */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Incluye</h3>
                  <ul className="space-y-1">
                    {selectedServiceInfo.detailedInfo.includes.map((item, index) => (
                      <li key={index} className="text-green-700 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requisitos */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Requisitos</h3>
                  <ul className="space-y-1">
                    {selectedServiceInfo.detailedInfo.requirements.map((item, index) => (
                      <li key={index} className="text-orange-700 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Beneficios */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Beneficios</h3>
                  <ul className="space-y-1">
                    {selectedServiceInfo.detailedInfo.benefits.map((item, index) => (
                      <li key={index} className="text-purple-700 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botón de reserva */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                {selectedServiceInfo.available ? (
                  <button
                    onClick={() => {
                      handleCloseServiceInfo();
                      handleReservation(selectedServiceInfo);
                    }}
                    className="w-full bg-[#EEAD05] text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCalendarAlt />
                    Reservar Ahora
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 mb-3">Este servicio estará disponible próximamente</p>
                    <button
                      onClick={handleCloseServiceInfo}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default Services; 