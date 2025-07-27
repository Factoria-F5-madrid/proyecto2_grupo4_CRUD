import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileInvoice, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaPercent, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { getInvoiceByID } from '../services/invoiceServices';
import { useAuth } from '../context/AuthContext';

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { invoiceId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    loadInvoice();
  }, [invoiceId]);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      const data = await getInvoiceByID(invoiceId);
      setInvoice(data);
    } catch (error) {
      console.error('Error cargando factura:', error);
      setError('Error al cargar los detalles de la factura');
    } finally {
      setLoading(false);
    }
  };



  const getStatusIcon = (completed) => {
    return completed ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red-500" />
    );
  };

  const getStatusLabel = (completed) => {
    return completed ? 'Completada' : 'Pendiente';
  };

  const getIncludedServicesLabel = (includedServices) => {
    switch (includedServices?.toLowerCase()) {
      case 'básico':
        return 'Básico';
      case 'premium':
        return 'Premium';
      case 'completo':
        return 'Completo';
      case 'personalizado':
        return 'Personalizado';
      default:
        return includedServices || 'No especificado';
    }
  };

  const formatPrice = (price) => {
    if (!price) return '€0.00';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Factura no encontrada
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-1">Detalles de Factura</h1>
            <p className="text-sm">{invoice.fiscal_number}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/invoices')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FaArrowLeft /> Volver
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información principal */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Información General</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estado:</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(invoice.completed)}
                <span className={`text-sm font-medium ${
                  invoice.completed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {getStatusLabel(invoice.completed)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaFileInvoice className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Número Fiscal</p>
                <p className="font-medium">{invoice.fiscal_number}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Servicio ID</p>
                <p className="font-medium">{invoice.service_id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPercent className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">IVA</p>
                <p className="font-medium">{invoice.vat}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Servicios y precios */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios y Precios</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Servicios Incluidos</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {getIncludedServicesLabel(invoice.included_services)}
                </span>
              </div>
            </div>

            {invoice.additional_price && parseFloat(invoice.additional_price) > 0 && (
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Precio Adicional</p>
                  <p className="font-medium text-green-600">
                    {formatPrice(invoice.additional_price)}
                  </p>
                </div>
              </div>
            )}

            {invoice.discounts && (
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Descuentos</p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Aplicados
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fechas</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Creación</p>
                <p className="font-medium">{formatDate(invoice.created_at)}</p>
              </div>
            </div>

            {invoice.updated_at && (
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Última Actualización</p>
                  <p className="font-medium">{formatDate(invoice.updated_at)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Información Adicional</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">ID de Factura</p>
              <p className="font-medium">{invoice.invoice_id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Estado de Completado</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                invoice.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {invoice.completed ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail; 