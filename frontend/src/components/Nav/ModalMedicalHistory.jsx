import React from 'react';

const Modal = ({ onClose, medicalHistory }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1f26] bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#1c1f26] hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#1c1f26]">
          Historial Médico
        </h2>
        {medicalHistory && medicalHistory.length > 0 ? (
          <ul className="space-y-4">
            {medicalHistory.map((record) => (
              <li key={record.id} className="border-b pb-2">
                <p><strong>Fecha:</strong> {record.date || 'No disponible'}</p>
                <p><strong>Descripción:</strong> {record.description || 'No disponible'}</p>
                <p><strong>Veterinario:</strong> {record.veterinarian || 'No disponible'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay registros médicos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;