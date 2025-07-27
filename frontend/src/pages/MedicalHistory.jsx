import React, { useEffect, useState } from 'react';
import { getAllMedicalHistories, deleteMedicalHistory } from '../services/medicalHistoryServices';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaStethoscope, FaSearch, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const MedicalHistory = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAdmin, isEmployee, isUser } = useAuth();

  useEffect(() => {
    loadHistories();
  }, []);

  const loadHistories = async () => {
    try {
      setLoading(true);
      const data = await getAllMedicalHistories();
      setHistories(data);
    } catch (error) {
      console.error("Error al cargar historiales médicos:", error);
      setError("Error al cargar los historiales médicos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (historyId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este historial médico?')) {
      try {
        await deleteMedicalHistory(historyId);
        await loadHistories();
      } catch (error) {
        console.error("Error al eliminar historial:", error);
        alert('Error al eliminar el historial médico');
      }
    }
  };

  const filteredHistories = histories.filter(history =>
    history.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.pet_id?.toString().includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'activo':
      case 'completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'vacunación':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'consulta':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cirugía':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'tratamiento':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EEAD05]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabecera amarilla */}
      <div className="bg-[#EEAD05] py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Historial Médico
          </h1>
          <p className="text-white/90 text-lg">
            Gestiona todos los historiales médicos de las mascotas de manera eficiente
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Barra de herramientas */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Barra de búsqueda */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar historiales médicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
            />
          </div>

          {/* Botón de nuevo historial */}
          {(isAdmin() || isEmployee()) && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#EEAD05] text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 font-medium"
            >
              <FaPlus />
              Nuevo Historial
            </button>
          )}
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tabla de historiales */}
        {filteredHistories.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MASCOTA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TIPO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DESCRIPCIÓN
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      FECHA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistories.map((history) => (
                    <tr key={history.medical_history_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {history.pet_id?.toString().slice(-2).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Mascota #{history.pet_id}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: mh-{history.medical_history_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(history.type)}`}>
                          <FaStethoscope className="mr-1" />
                          {history.type || 'Sin tipo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {history.description || 'Sin descripción'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {history.created_at ? new Date(history.created_at).toLocaleDateString('es-ES') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(history.status)}`}>
                          <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                          {history.status || 'ACTIVO'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {/* Ver detalles */}}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Ver detalles"
                          >
                            <FaEye />
                          </button>
                          {(isAdmin() || isEmployee()) && (
                            <>
                              <button
                                onClick={() => {/* Editar */}}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Editar"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(history.medical_history_id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Eliminar"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <FaStethoscope className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay historiales médicos
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? `No se encontraron historiales que coincidan con "${searchTerm}"`
                : "Aún no hay historiales médicos registrados en el sistema."
              }
            </p>
            {(isAdmin() || isEmployee()) && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#EEAD05] text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <FaPlus />
                Crear primer historial
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal para crear/editar historial */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Nuevo Historial Médico</h2>
            <p className="text-gray-600 mb-4">
              Esta funcionalidad estará disponible próximamente.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#EEAD05] text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;