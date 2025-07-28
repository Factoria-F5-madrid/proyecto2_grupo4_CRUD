import React, { useState } from 'react';
import { createMedicalHistory } from '../../services/medicalHistoryServices';
import { FaStethoscope, FaTimes } from 'react-icons/fa';

export default function FormCreateMedicalHistory({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    pet_id: '',
    type: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanPayload = {
        pet_id: parseInt(formData.pet_id),
        type: formData.type,
        description: formData.description
      };

      console.log('Creando historial médico:', cleanPayload);

      await createMedicalHistory(cleanPayload);
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al crear historial médico:', error);
      setError('Error al crear el historial médico. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaStethoscope className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Nuevo Historial Médico
              </h2>
              <p className="text-sm text-gray-500">
                Crea un nuevo historial médico
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

      
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID de la Mascota
            </label>
            <input
              type="number"
              name="pet_id"
              value={formData.pet_id}
              onChange={handleChange}
              required
              placeholder="Ej: 1, 2, 3..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
            />
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Historial
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent"
            >
              <option value="">Seleccionar tipo</option>
              <option value="consulta">Consulta</option>
              <option value="vacunación">Vacunación</option>
              <option value="tratamiento">Tratamiento</option>
              <option value="cirugía">Cirugía</option>
              <option value="revisión">Revisión</option>
              <option value="emergencia">Emergencia</option>
            </select>
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Tratamiento
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe el tratamiento, diagnóstico o procedimiento realizado..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent resize-none"
            />
          </div>

   
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#EEAD05] text-white px-4 py-2 rounded hover:bg-yellow-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creando...
                </>
              ) : (
                'Crear Historial'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 