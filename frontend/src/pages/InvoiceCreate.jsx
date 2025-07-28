import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoice, FaMoneyBillWave, FaPercent, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { createInvoice } from '../services/invoiceServices';
import { useAuth } from '../context/AuthContext';

const InvoiceCreate = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    service_id: '',
    fiscal_number: '',
    discounts: false,
    additional_price: '',
    vat: '21.00',
    included_services: 'Básico',
    completed: false
  });
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasPermission('create_invoice')) {
      setError('No tienes permisos para crear facturas');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Validaciones básicas
      if (!formData.service_id || !formData.fiscal_number || !formData.vat) {
        setError('Los campos Servicio ID, Número Fiscal e IVA son obligatorios');
        return;
      }

      // Preparar datos para enviar
      const createData = {
        service_id: parseInt(formData.service_id),
        fiscal_number: formData.fiscal_number,
        discounts: formData.discounts,
        additional_price: formData.additional_price ? parseFloat(formData.additional_price) : null,
        vat: parseFloat(formData.vat),
        included_services: formData.included_services,
        completed: formData.completed
      };

      console.log('Enviando datos de creación:', createData);
      const newInvoice = await createInvoice(createData);
      
      // Navegar a la vista de detalles de la nueva factura
      navigate(`/invoices/${newInvoice.invoice_id}`);
    } catch (error) {
      console.error('Error creando factura:', error);
      setError('Error al crear la factura: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/invoices');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <div>
          <h1 className="text-4xl font-bold mb-1">Crear Nueva Factura</h1>
          <p className="text-sm">Genera una nueva factura para un servicio</p>
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
            {/* Servicio ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                Servicio ID *
              </label>
              <input
                type="number"
                name="service_id"
                value={formData.service_id}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ID del servicio"
              />
            </div>

            {/* Número Fiscal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFileInvoice className="inline mr-2 text-gray-400" />
                Número Fiscal *
              </label>
              <input
                type="text"
                name="fiscal_number"
                value={formData.fiscal_number}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="FAC-001"
              />
            </div>

            {/* IVA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPercent className="inline mr-2 text-gray-400" />
                IVA (%) *
              </label>
              <input
                type="number"
                name="vat"
                value={formData.vat}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="21.00"
              />
            </div>

            {/* Precio Adicional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                Precio Adicional
              </label>
              <input
                type="number"
                name="additional_price"
                value={formData.additional_price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Servicios Incluidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                Servicios Incluidos
              </label>
              <select
                name="included_services"
                value={formData.included_services}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Básico">Básico</option>
                <option value="Premium">Premium</option>
                <option value="Completo">Completo</option>
                <option value="Personalizado">Personalizado</option>
              </select>
            </div>

            {/* Descuentos */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="discounts"
                  checked={formData.discounts}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Aplicar Descuentos
                </span>
              </label>
            </div>

            {/* Completada */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Factura Completada
                </span>
              </label>
            </div>
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
              {saving ? 'Creando...' : 'Crear Factura'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceCreate; 