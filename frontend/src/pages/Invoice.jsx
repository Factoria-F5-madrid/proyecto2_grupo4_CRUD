import React, { useState, useEffect } from 'react';
import { FaFileInvoice, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaPercent, FaCalendarAlt, FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllInvoices, deleteInvoice } from '../services/invoiceServices';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
      try {
        setLoading(true);
      console.log("🔍 Cargando facturas...");
        const data = await getAllInvoices();
      console.log("✅ Datos de facturas recibidos:", data);
        setInvoices(data);
      } catch (error) {
        console.error("❌ Error al cargar facturas:", error);
        setError("Error al cargar las facturas: " + error.message);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete = async (invoiceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta factura?')) {
      try {
        await deleteInvoice(invoiceId);
        loadInvoices();
      } catch (error) {
        console.error('Error eliminando factura:', error);
        setError("Error al eliminar la factura");
      }
    }
  };

  const handleView = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const handleEdit = (invoiceId) => {
    navigate(`/invoices/${invoiceId}/edit`);
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

  const filteredInvoices = invoices.filter(invoice =>
    invoice.fiscal_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoice_id?.toString().includes(searchTerm) ||
    invoice.service_id?.toString().includes(searchTerm) ||
    getStatusLabel(invoice.completed).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getIncludedServicesLabel(invoice.included_services).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <h1 className="text-4xl font-bold mb-1">Gestión de Facturas</h1>
        <p className="text-sm">Administra todas las facturas de PetLand</p>
      </div>

      {/* Barra de búsqueda y botón */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar facturas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {hasPermission('create_invoice') && (
          <button
            onClick={() => navigate('/invoices/new')}
            className="bg-[#edad06] hover:bg-yellow-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
          >
            <FaPlus /> Nueva Factura
          </button>
        )}
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      
      {/* Tabla de facturas */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Factura</th>
              <th className="px-6 py-3 text-left">Servicio</th>
              <th className="px-6 py-3 text-left">Servicios Incluidos</th>
              <th className="px-6 py-3 text-left">IVA</th>
              <th className="px-6 py-3 text-left">Precio Adicional</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.invoice_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#edad06] text-white flex items-center justify-center rounded-full font-bold">
                      <FaFileInvoice />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {invoice.fiscal_number}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {invoice.invoice_id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-gray-400 mr-2" />
                    ID: {invoice.service_id}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {getIncludedServicesLabel(invoice.included_services)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaPercent className="text-green-500 mr-2" />
                    {invoice.vat}%
                </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {invoice.additional_price && parseFloat(invoice.additional_price) > 0 ? (
                    <span className="text-green-600 font-medium">
                      {formatPrice(invoice.additional_price)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(invoice.completed)}
                    <span className={`text-xs font-medium ${
                    invoice.completed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getStatusLabel(invoice.completed)}
                  </span>
                </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {hasPermission('read_invoice') && (
                      <button
                        onClick={() => handleView(invoice.invoice_id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver detalles"
                      >
                        <FaEye />
                      </button>
                    )}
                    {hasPermission('update_invoice') && (
                      <button
                        onClick={() => handleEdit(invoice.invoice_id)}
                        className="text-green-600 hover:text-green-800"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {hasPermission('delete_invoice') && (
                      <button
                        onClick={() => handleDelete(invoice.invoice_id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      {/* Mensaje cuando no hay facturas */}
      {filteredInvoices.length === 0 && !loading && (
        <div className="text-center py-12">
          <FaFileInvoice className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No hay facturas
          </h3>
          <p className="text-gray-500">
            Las facturas aparecerán aquí cuando se generen.
          </p>
        </div>
      )}
    </div>
  );
};

export default Invoice;