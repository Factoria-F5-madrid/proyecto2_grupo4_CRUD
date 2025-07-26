import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/ModalInvoice';
import { getAllInvoices, getInvoiceByID } from '../services/invoiceServices';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getAllInvoices();
        setInvoices(data);
      } catch (error) {
        setError('Error al cargar las facturas');
      }
    };
    fetchInvoices();
  }, []);

  const handleInvoiceDetails = async (invoiceId) => {
    try {
      const invoice = await getInvoiceByID(invoiceId);
      setSelectedInvoice(invoice);
      setShowModal(true);
    } catch (error) {
      setError('Error al cargar los detalles de la factura');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#ffffff] px-4 text-center">
      <img
        src={petImage}
        alt="PetImage"
        className="w-55 h-15 object-contain mb-4"
      />
      {/* <img
        src={perritosImage}
        alt="Perritos"
        className="w-full max-w-xs mb-6 rounded-md shadow-md"
      /> */}
      <h1 className="text-3xl text-[#1c1f26] font-bold mb-6">Facturas</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div key={invoice.invoice_id} className="relative">
              <div className="bg-[#edad06] shadow-md rounded-lg overflow-hidden max-w-xs w-full mx-auto">
                <div className="p-4 text-[#1c1f26]">
                  <h3 className="text-xl font-semibold mb-2">Factura #{invoice.invoice_id}</h3>
                  <p><strong>Número Fiscal:</strong> {invoice.fiscal_number || 'N/A'}</p>
                  <p><strong>Monto Total:</strong> ${invoice.additional_price ? (invoice.additional_price + invoice.vat) : invoice.vat || 0}</p>
                  <p><strong>Completado:</strong> {invoice.completed ? 'Sí' : 'No'}</p>
                </div>
              </div>
              <button
                onClick={() => handleInvoiceDetails(invoice.invoice_id)}
                className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-indigo-700 transition w-full"
              >
                Ver Detalles
              </button>
            </div>
          ))
        ) : (
          <p>No hay facturas registradas.</p>
        )}
      </div>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default Invoice;