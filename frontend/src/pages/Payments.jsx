import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaMoneyBillWave, FaCalendarAlt, FaSearch, FaEye, FaEdit, FaTrash, FaPlus, FaCheckCircle, FaTimesCircle, FaClock, FaUndo } from 'react-icons/fa';
import { getAllPayment, deletePayment } from '../services/paymentServices';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      console.log("🔍 Cargando pagos...");
      const data = await getAllPayment();
      console.log("✅ Datos de pagos recibidos:", data);
      setPayments(data);
    } catch (error) {
      console.error("❌ Error al cargar pagos:", error);
      setError("Error al cargar los pagos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paymentId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este pago?')) {
      try {
        await deletePayment(paymentId);
        loadPayments();
      } catch (error) {
        console.error('Error eliminando pago:', error);
        setError("Error al eliminar el pago");
      }
    }
  };

  const handleView = (paymentId) => {
    navigate(`/payments/${paymentId}`);
  };

  const handleEdit = (paymentId) => {
    navigate(`/payments/${paymentId}/edit`);
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'tarjeta de crédito':
        return <FaCreditCard className="text-blue-500" />;
      case 'tarjeta de débito':
        return <FaCreditCard className="text-green-500" />;
      case 'efectivo':
        return <FaMoneyBillWave className="text-green-600" />;
      case 'transferencia':
        return <FaMoneyBillWave className="text-purple-500" />;
      case 'bizum':
        return <FaMoneyBillWave className="text-blue-600" />;
      case 'paypal':
        return <FaMoneyBillWave className="text-blue-400" />;
      default:
        return <FaMoneyBillWave className="text-gray-500" />;
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method?.toLowerCase()) {
      case 'tarjeta de crédito':
        return 'Tarjeta de Crédito';
      case 'tarjeta de débito':
        return 'Tarjeta de Débito';
      case 'efectivo':
        return 'Efectivo';
      case 'transferencia':
        return 'Transferencia';
      case 'bizum':
        return 'Bizum';
      case 'paypal':
        return 'PayPal';
      default:
        return method || 'Método no especificado';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completado':
        return <FaCheckCircle className="text-green-500" />;
      case 'pendiente':
        return <FaClock className="text-yellow-500" />;
      case 'fallido':
        return <FaTimesCircle className="text-red-500" />;
      case 'cancelado':
        return <FaTimesCircle className="text-red-600" />;
      case 'reembolsado':
        return <FaUndo className="text-blue-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'fallido':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reembolsado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const filteredPayments = payments.filter(payment =>
    payment.payment_id?.toString().includes(searchTerm) ||
    payment.invoice_id?.toString().includes(searchTerm) ||
    payment.payment_method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.payment_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount?.toString().includes(searchTerm)
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
        <h1 className="text-4xl font-bold mb-1">Gestión de Pagos</h1>
        <p className="text-sm">Administra todos los pagos de PetLand</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pagos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Botón Nuevo Pago */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => navigate('/payments/new')}
          className="bg-[#edad06] hover:bg-yellow-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Nuevo Pago
        </button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Tabla de pagos */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Factura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Método
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.payment_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-lg mr-3">
                      {getPaymentMethodIcon(payment.payment_method)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Pago #{payment.payment_id}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {payment.payment_id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Factura #{payment.invoice_id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {getPaymentMethodLabel(payment.payment_method)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-medium text-green-600">
                    {formatPrice(payment.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(payment.payment_status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(payment.payment_status)}`}>
                      {payment.payment_status || 'Pendiente'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(payment.payment_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(payment.payment_id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver detalles"
                    >
                      <FaEye />
                    </button>
                    {hasPermission('update_payment') && (
                      <button
                        onClick={() => handleEdit(payment.payment_id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {hasPermission('delete_payment') && (
                      <button
                        onClick={() => handleDelete(payment.payment_id)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Estado vacío */}
      {filteredPayments.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mx-auto mb-4">
            <FaMoneyBillWave />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm ? 'No se encontraron pagos' : 'No hay pagos registrados'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Los pagos aparecerán aquí cuando se registren en el sistema.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Payments;