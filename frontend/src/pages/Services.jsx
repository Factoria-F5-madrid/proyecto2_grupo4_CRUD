import { useState } from 'react';
import { Link } from 'react-router-dom';
import daycareServ from '../assets/daycareServ.png';
import foodServ from '../assets/foodServ.png';
import transportationServ from '../assets/transportationServ.png';
import groomingServ from '../assets/groomingServ.png';
import walkServ from '../assets/walkServ.png';
import vetServ from '../assets/vetServ.png';
import petImage from '../assets/petland-logo-letra-azul.png';
import { FaCalendarAlt, FaInfoCircle, FaClock, FaStar } from 'react-icons/fa';

const Services = () => {
  const [showModal, setShowModal] = useState(false);

  const services = [
    {
      id: 1,
      name: "Guardería",
      image: daycareServ,
      description: "Cuidado profesional para tu mascota",
      available: true,
      price: "€25/día"
    },
    {
      id: 2,
      name: "Transporte",
      image: transportationServ,
      description: "Transporte seguro y cómodo",
      available: true,
      price: "€15/viaje"
    },
    {
      id: 3,
      name: "Comida",
      image: foodServ,
      description: "Alimentación especializada",
      available: true,
      price: "€12/paquete"
    },
    {
      id: 4,
      name: "Peluquería",
      image: groomingServ,
      description: "Cuidado y belleza para tu mascota",
      available: false,
      price: "€30/sesión"
    },
    {
      id: 5,
      name: "Paseo",
      image: walkServ,
      description: "Paseos recreativos y ejercicio",
      available: false,
      price: "€10/paseo"
    },
    {
      id: 6,
      name: "Veterinario",
      image: vetServ,
      description: "Atención médica especializada",
      available: false,
      price: "€50/consulta"
    }
  ];

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
                    <Link 
                      to="/reservations" 
                      className="flex-1 bg-[#EEAD05] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCalendarAlt />
                      Reservar
                    </Link>
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
                    onClick={() => setShowModal(true)}
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
    </div>
  );
};

export default Services; 