import React from 'react';

const Modal = ({ onClose, invoice }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1f26] bg-opacity-50">
      <div className="bg-white w-full max-w-2xl mx-4 p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#1c1f26] hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#1c1f26]">
          Detalles de la Factura #{invoice?.invoice_id}
        </h2>
        {invoice ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Factura</h3>
              <p><strong>Número Fiscal:</strong> {invoice.fiscal_number || 'N/A'}</p>
              <p><strong>Descuentos:</strong> {invoice.discounts ? 'Sí' : 'No'}</p>
              <p><strong>Precio Adicional:</strong> ${invoice.additional_price || 0}</p>
              <p><strong>IVA:</strong> ${invoice.vat || 0}</p>
              <p><strong>Servicio Incluido:</strong> {invoice.included_services || 'N/A'}</p>
              <p><strong>Completado:</strong> {invoice.completed ? 'Sí' : 'No'}</p>
              <p><strong>Creado:</strong> {new Date(invoice.created_at).toLocaleString() || 'N/A'}</p>
              <p><strong>Actualizado:</strong> {new Date(invoice.updated_at).toLocaleString() || 'N/A'}</p>
            </div>
            {invoice.service && (
              <div>
                <h3 className="text-lg font-semibold">Servicio</h3>
                <p><strong>Tipo de Servicio:</strong> {invoice.service.service_type || 'N/A'}</p>
                <p><strong>Hospedaje:</strong> {invoice.service.lodging ? 'Sí' : 'No'}</p>
                <p><strong>Precio Base:</strong> ${invoice.service.base_price || 0}</p>
                <p><strong>Duración:</strong> {invoice.service.duration ? new Date(`1970-01-01T${invoice.service.duration}Z`).toISOString().substr(11, 8) : 'N/A'}</p>
                <p><strong>Notas:</strong> {invoice.service.notes || 'N/A'}</p>
              </div>
            )}
            {invoice.service?.reservations && invoice.service.reservations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Reserva</h3>
                {invoice.service.reservations.map((reservation) => (
                  <div key={reservation.reservation_id} className="ml-4">
                    <p><strong>ID Reserva:</strong> {reservation.reservation_id || 'N/A'}</p>
                    <p><strong>Fecha Creación:</strong> {new Date(reservation.created_at).toLocaleString() || 'N/A'}</p>
                    <p><strong>Check-in:</strong> {new Date(reservation.checkin_date).toLocaleString() || 'N/A'}</p>
                    <p><strong>Check-out:</strong> {new Date(reservation.checkout_date).toLocaleString() || 'N/A'}</p>
                    <p><strong>Estado:</strong> {reservation.status || 'N/A'}</p>
                    <p><strong>Notas Internas:</strong> {reservation.internal_notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            )}
            {invoice.service?.reservations && invoice.service.reservations.length > 0 && invoice.service.reservations[0]?.user && (
              <div>
                <h3 className="text-lg font-semibold">Usuario</h3>
                <p><strong>Nombre:</strong> {invoice.service.reservations[0].user.first_name || 'N/A'} {invoice.service.reservations[0].user.last_name || ''}</p>
                <p><strong>Teléfono:</strong> {invoice.service.reservations[0].user.phone_number || 'N/A'}</p>
                <p><strong>Email:</strong> {invoice.service.reservations[0].user.email || 'N/A'}</p>
                <p><strong>Dirección:</strong> {invoice.service.reservations[0].user.address || 'N/A'}</p>
              </div>
            )}
            {invoice.service?.reservations && invoice.service.reservations.length > 0 && invoice.service.reservations[0]?.user?.pet && (
              <div>
                <h3 className="text-lg font-semibold">Mascota</h3>
                <p><strong>Nombre:</strong> {invoice.service.reservations[0].user.pet.name || 'N/A'}</p>
                <p><strong>Especie:</strong> {invoice.service.reservations[0].user.pet.species || 'N/A'}</p>
                <p><strong>Raza:</strong> {invoice.service.reservations[0].user.pet.breed || 'N/A'}</p>
                <p><strong>Fecha de Nacimiento:</strong> {new Date(invoice.service.reservations[0].user.pet.birth_date).toLocaleDateString() || 'N/A'}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Cargando detalles...</p>
        )}
      </div>
    </div>
  );
};

export default Modal;