import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClipboard, FaMoneyBillWave, FaClock, FaBed, FaCar, FaUtensils, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { getServiceById, updateService } from '../services/serviceServices';
import { useAuth } from '../context/AuthContext';

const ServiceEdit = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    lodging: false,
    service_type: 'Guarderia',
    other_service: '',
    notes: '',
    base_price: '',
    duration: ''
  });
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadService();
  }, [serviceId]);

  const loadService = async () => {
    try {
      setLoading(true);
      const data = await getServiceById(serviceId);
      setService(data);
      
      // Prellenar el formulario con los datos actuales
      setFormData({
        lodging: data.lodging || false,
        service_type: data.service_type || 'Guarderia',
        other_service: data.other_service || '',
        notes: data.notes || '',
        base_price: data.base_price?.toString() || '',
        duration: data.duration || ''
      });
    } catch (error) {
      console.error('Error cargando servicio:', error);
      setError('Error al cargar los detalles del servicio');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasPermission('update_service')) {
      setError('No tienes permisos para actualizar servicios');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Validaciones básicas
      if (!formData.service_type || !formData.base_price) {
        setError('Los campos Tipo de Servicio y Precio Base son obligatorios');
        return;
      }

      // Preparar datos para enviar
      const updateData = {
        lodging: formData.lodging,
        service_type: formData.service_type,
        other_service: formData.other_service || null,
        notes: formData.notes || null,
        base_price: parseFloat(formData.base_price),
        duration: formData.duration || null
      };

      console.log('Enviando datos de actualización:', updateData);
      await updateService(serviceId, updateData);
      
      // Navegar a la vista de detalles
      navigate(`/services/${serviceId}`);
    } catch (error) {
      console.error('Error actualizando servicio:', error);
      setError('Error al actualizar el servicio: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/services/${serviceId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Servicio no encontrado
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <div>
          <h1 className="text-4xl font-bold mb-1">Editar Servicio</h1>
          <p className="text-sm">Servicio #{service.service_id}</p>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Servicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClipboard className="inline mr-2 text-gray-400" />
                Tipo de Servicio *
              </label>
              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Guarderia">Guardería</option>
                <option value="Transporte">Transporte</option>
                <option value="Comida">Comida</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            {/* Precio Base */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                Precio Base (€) *
              </label>
              <input
                type="number"
                name="base_price"
                value={formData.base_price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Duración */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClock className="inline mr-2 text-gray-400" />
                Duración (HH:MM)
              </label>
              <input
                type="time"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Alojamiento */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="lodging"
                  checked={formData.lodging}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <FaBed className="mr-2 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Incluye Alojamiento
                </span>
              </label>
            </div>
          </div>

          {/* Servicio Adicional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servicio Adicional
            </label>
            <input
              type="text"
              name="other_service"
              value={formData.other_service}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción del servicio adicional..."
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Notas adicionales sobre el servicio..."
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#edad06] hover:bg-yellow-400 disabled:bg-yellow-300 text-white rounded-lg flex items-center gap-2"
            >
              <FaSave />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceEdit; 