import React, { useEffect, useState } from 'react';
import { getAllMedicalHistories } from '../services/medicalHistoryServices';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaStethoscope } from 'react-icons/fa';

const MedicalHistory = () => {
  const [histories, setHistories] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user, isUser } = useAuth();

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        console.log("🔍 Iniciando fetchHistories...");
        console.log("👤 Usuario actual:", user);
        
        const data = await getAllMedicalHistories();
        console.log("✅ Datos recibidos:", data);
        console.log("📊 Número de historiales:", data.length);
        
        setHistories(data);
      } catch (error) {
        console.error("❌ Error al cargar historiales médicos:", error);
        setError("Error al cargar los historiales médicos: " + error.message);
      }
    };

    fetchHistories();
  }, [user]);

  console.log("🎨 Renderizando MedicalHistory component");
  console.log("📊 Estado actual de histories:", histories);
  console.log("👤 Usuario:", user);
  console.log("🔐 Es usuario regular:", isUser());

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-[#1c1f26] font-bold">Historial Médico</h1>
        {isUser() && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <FaPlus />
            Solicitar Historial
          </button>
        )}
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {histories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {histories.map((history) => (
            <div key={history.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FaStethoscope className="text-blue-500 text-xl" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {history.type}
                </h3>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Descripción:</span> {history.description}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Mascota ID:</span> {history.pet_id}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fecha:</span> {new Date(history.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaStethoscope className="text-gray-400 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">
            {isUser() 
              ? "No tienes historiales médicos registrados aún." 
              : "No hay historiales médicos registrados."
            }
          </p>
          {isUser() && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto"
            >
              <FaPlus />
              Solicitar mi primer historial
            </button>
          )}
        </div>
      )}

      {/* Modal para solicitar historial */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Solicitar Historial Médico</h2>
            <p className="text-gray-600 mb-4">
              Esta funcionalidad estará disponible próximamente.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;