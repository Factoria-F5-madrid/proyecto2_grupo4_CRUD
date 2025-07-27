import React, { useEffect, useState } from 'react';
import { getAllMedicalHistories, deleteMedicalHistory } from '../services/medicalHistoryServices';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaStethoscope, FaSearch, FaEdit, FaTrash, FaEye, FaTimes, FaCalendar, FaUser, FaPaw } from 'react-icons/fa';
import FormEditMedicalHistory from '../components/Forms/FormEditMedicalHistory';
import FormCreateMedicalHistory from '../components/Forms/FormCreateMedicalHistory';

const MedicalHistory = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAdmin, isEmployee, isUser } = useAuth();

  useEffect(() => {
    loadHistories();
  }, []);

  const loadHistories = async () => {
    try {
      setLoading(true);
      const data = await getAllMedicalHistories();
      console.log('Datos cargados del backend:', data);
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

  const handleViewDetails = (history) => {
    setSelectedHistory(history);
    setShowDetailModal(true);
  };

  const handleEdit = (history) => {
    console.log('Historial seleccionado para editar:', history);
    setSelectedHistory(history);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    loadHistories();
    setShowEditModal(false);
    setSelectedHistory(null);
  };

  const handleCreateSuccess = () => {
    loadHistories();
    setShowCreateModal(false);
  };

  const filteredHistories = histories.filter(history =>
    history.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.pet_id?.toString().includes(searchTerm)
  );



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
              onClick={() => setShowCreateModal(true)}
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
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistories.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
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
                               ID: mh-{history.id}
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

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(history)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Ver detalles"
                          >
                            <FaEye />
                          </button>
                          {(isAdmin() || isEmployee()) && (
                            <>
                              <button
                                onClick={() => handleEdit(history)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Editar"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(history.id)}
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
                onClick={() => setShowCreateModal(true)}
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
      {showCreateModal && (
        <FormCreateMedicalHistory
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Modal de detalles del historial médico */}
      {showDetailModal && selectedHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaStethoscope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informe Médico Detallado
                  </h2>
                  <p className="text-sm text-gray-500">
                    ID: mh-{selectedHistory.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-6">
              {/* Información de la mascota */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaPaw className="text-orange-500" />
                  <h3 className="font-semibold text-gray-900">Información de la Mascota</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ID de Mascota</p>
                    <p className="font-medium text-gray-900">#{selectedHistory.pet_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Historial</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(selectedHistory.type)}`}>
                      <FaStethoscope className="mr-1" />
                      {selectedHistory.type || 'Sin tipo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detalles del historial */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Descripción del Tratamiento</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedHistory.description || 'No hay descripción disponible para este historial médico.'}
                  </p>
                </div>
              </div>

              {/* Información adicional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaCalendar className="text-gray-500" />
                    Fechas
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Fecha de Creación</p>
                      <p className="font-medium text-gray-900">
                        {selectedHistory.created_at ? new Date(selectedHistory.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                    {selectedHistory.updated_at && (
                      <div>
                        <p className="text-sm text-gray-600">Última Actualización</p>
                        <p className="font-medium text-gray-900">
                          {new Date(selectedHistory.updated_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    Información
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">ID del Historial</p>
                      <p className="font-medium text-gray-900">mh-{selectedHistory.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ID de la Mascota</p>
                      <p className="font-medium text-gray-900">#{selectedHistory.pet_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del veterinario (si está disponible) */}
              {selectedHistory.veterinarian && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Veterinario Responsable</h3>
                  <p className="text-gray-700">{selectedHistory.veterinarian}</p>
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showEditModal && selectedHistory && (
        <FormEditMedicalHistory
          medicalHistory={selectedHistory}
          onClose={() => {
            setShowEditModal(false);
            setSelectedHistory(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default MedicalHistory;