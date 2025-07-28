import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaCalendarAlt, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { createPayment } from '../services/paymentServices';
import { useAuth } from '../context/AuthContext';

const PaymentCreate = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    invoice_id: '',
    amount: '',
    payment_method: 'Efectivo',
    payment_date: new Date().toISOString().slice(0, 16), 
    payment_status: 'Pendiente',
    refund_processed: false
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
    
    if (!hasPermission('create_payment')) {
      setError('No tienes permisos para crear pagos');
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (!formData.invoice_id || !formData.amount || !formData.payment_method) {
        setError('Los campos Factura ID, Cantidad y Método de Pago son obligatorios');
        return;
      }

   
      const createData = {
        invoice_id: parseInt(formData.invoice_id),
        amount: parseFloat(formData.amount),
        payment_method: formData.payment_method,
        payment_date: new Date(formData.payment_date).toISOString(),
        payment_status: formData.payment_status,
        refund_processed: formData.refund_processed
      };

      console.log('Enviando datos de creación:', createData);
      const newPayment = await createPayment(createData);
      
     
      navigate(`/payments/${newPayment.payment_id}`);
    } catch (error) {
      console.error('Error creando pago:', error);
      setError('Error al crear el pago: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/payments');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <div>
          <h1 className="text-4xl font-bold mb-1">Crear Nuevo Pago</h1>
          <p className="text-sm">Registra un nuevo pago en el sistema</p>
        </div>
      </div>

    
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                ID de Factura *
              </label>
              <input
                type="number"
                name="invoice_id"
                value={formData.invoice_id}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ID de la factura"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                Cantidad (€) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCreditCard className="inline mr-2 text-gray-400" />
                Método de Pago *
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Bizum">Bizum</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMoneyBillWave className="inline mr-2 text-gray-400" />
                Estado del Pago
              </label>
              <select
                name="payment_status"
                value={formData.payment_status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
                <option value="Fallido">Fallido</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Reembolsado">Reembolsado</option>
              </select>
            </div>

        
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-gray-400" />
                Fecha de Pago
              </label>
              <input
                type="datetime-local"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

        
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="refund_processed"
                  checked={formData.refund_processed}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Reembolso Procesado
                </span>
              </label>
            </div>
          </div>

      
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
              {saving ? 'Creando...' : 'Crear Pago'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCreate; 