import React from "react";
import { FaTimes, FaPaw, FaCalendar, FaUser, FaHeart, FaWeight, FaRuler } from "react-icons/fa";

const FormViewPet = ({ pet, onClose }) => {
  const getAge = (dateString) => {
    if (!dateString) return "No disponible";
    const birth = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FaPaw className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Ficha de {pet.name}
              </h2>
              <p className="text-sm text-gray-500">
                Información completa de la mascota
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagen de la mascota */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={pet.img_url || "https://via.placeholder.com/400x300.png?text=No+Image"}
                  alt={pet.name}
                  className="w-full h-80 object-cover"
                />
              </div>
              
              {/* Información básica */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaPaw className="text-yellow-600" />
                  Información Básica
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="font-medium text-gray-900">{pet.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Especie:</span>
                    <span className="font-medium text-gray-900">{pet.species}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Raza:</span>
                    <span className="font-medium text-gray-900">{pet.breed}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información detallada */}
            <div className="space-y-6">
              {/* Fechas */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaCalendar className="text-blue-600" />
                  Fechas
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                    <p className="font-medium text-gray-900">{formatDate(pet.birth_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Edad</p>
                    <p className="font-medium text-gray-900">
                      {getAge(pet.birth_date)} {getAge(pet.birth_date) === 1 ? "año" : "años"}
                    </p>
                  </div>
                  {pet.registration_date && (
                    <div>
                      <p className="text-sm text-gray-600">Fecha de Registro</p>
                      <p className="font-medium text-gray-900">{formatDate(pet.registration_date)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Propietario */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  Propietario
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">ID del Propietario</p>
                    <p className="font-medium text-gray-900">#{pet.user_id}</p>
                  </div>
                </div>
              </div>

              {/* Características físicas */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaRuler className="text-purple-600" />
                  Características Físicas
                </h3>
                <div className="space-y-2">
                  {pet.weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peso:</span>
                      <span className="font-medium text-gray-900">{pet.weight} kg</span>
                    </div>
                  )}
                  {pet.height && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Altura:</span>
                      <span className="font-medium text-gray-900">{pet.height} cm</span>
                    </div>
                  )}
                  {pet.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium text-gray-900">{pet.color}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Información médica */}
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaHeart className="text-red-600" />
                  Información Médica
                </h3>
                <div className="space-y-2">
                  {pet.medical_conditions && (
                    <div>
                      <p className="text-sm text-gray-600">Condiciones Médicas</p>
                      <p className="font-medium text-gray-900">{pet.medical_conditions}</p>
                    </div>
                  )}
                  {pet.allergies && (
                    <div>
                      <p className="text-sm text-gray-600">Alergias</p>
                      <p className="font-medium text-gray-900">{pet.allergies}</p>
                    </div>
                  )}
                  {pet.medications && (
                    <div>
                      <p className="text-sm text-gray-600">Medicamentos</p>
                      <p className="font-medium text-gray-900">{pet.medications}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notas adicionales */}
              {pet.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Notas Adicionales</h3>
                  <p className="text-gray-700">{pet.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormViewPet; 