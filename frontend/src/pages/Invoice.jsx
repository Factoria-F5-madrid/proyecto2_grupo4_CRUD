import React, { useEffect, useState } from 'react';
import { getAllInvoices } from '../services/invoiceServices';
import { useAuth } from '../context/AuthContext';
import { 
  FaFileInvoice, 
  FaMoneyBillWave, 
  FaCheckCircle, 
  FaTimesCircle,
  FaPercent,
  FaCalendarAlt,
  FaSpinner,
  FaPlus
} from 'react-icons/fa';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAdmin, isEmployee, isUser } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        console.log("🔍 Iniciando fetchInvoices...");
        console.log("👤 Usuario actual:", user);
        
        const data = await getAllInvoices();
        console.log("✅ Datos recibidos:", data);
        console.log("📊 Número de facturas:", data.length);
        
        setInvoices(data);
      } catch (error) {
        console.error("❌ Error al cargar facturas:", error);
        setError("Error al cargar las facturas: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user]);

  console.log("🎨 Renderizando Invoice component");
  console.log("📊 Estado actual de invoices:", invoices);
  console.log("👤 Usuario:", user);
  console.log("🔐 Es admin:", isAdmin());
  console.log("🔐 Es employee:", isEmployee());
  console.log("🔐 Es usuario regular:", isUser());

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
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando facturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-[#1c1f26] font-bold">
            {isAdmin() || isEmployee() ? 'Facturas del Sistema' : 'Mis Facturas'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isAdmin() || isEmployee() 
              ? 'Gestiona todas las facturas del sistema'
              : 'Aquí puedes ver todas las facturas de tus servicios contratados'
            }
          </p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {invoices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((invoice) => (
            <div key={invoice.invoice_id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    <FaFileInvoice className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {invoice.fiscal_number}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {invoice.invoice_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(invoice.completed)}
                  <span className={`text-sm font-medium ${
                    invoice.completed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getStatusLabel(invoice.completed)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <FaMoneyBillWave />
                    <span className="font-medium">Servicios incluidos:</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {getIncludedServicesLabel(invoice.included_services)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPercent className="text-green-500" />
                  <span className="font-medium">IVA:</span> {invoice.vat}%
                </div>
                
                {invoice.additional_price && parseFloat(invoice.additional_price) > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMoneyBillWave className="text-orange-500" />
                    <span className="font-medium">Precio adicional:</span> {formatPrice(invoice.additional_price)}
                  </div>
                )}
                
                {invoice.discounts && (
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    Descuentos aplicados
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaCalendarAlt />
                    <span>Creada: {formatDate(invoice.created_at)}</span>
                  </div>
                  {invoice.updated_at && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <FaCalendarAlt />
                      <span>Actualizada: {formatDate(invoice.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mx-auto mb-4">
            {isAdmin() || isEmployee() ? <FaFileInvoice /> : <FaPlus />}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {isAdmin() || isEmployee() 
              ? "No hay facturas en el sistema" 
              : "No tienes facturas aún"
            }
          </h3>
          <p className="text-gray-500 text-lg mb-4">
            {isAdmin() || isEmployee() 
              ? "Las facturas aparecerán aquí cuando se generen en el sistema." 
              : "Las facturas aparecerán aquí cuando contrates servicios."
            }
          </p>
          {isUser() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-800 text-sm">
                💡 <strong>Consejo:</strong> Las facturas se generan automáticamente cuando contratas servicios.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Invoice;