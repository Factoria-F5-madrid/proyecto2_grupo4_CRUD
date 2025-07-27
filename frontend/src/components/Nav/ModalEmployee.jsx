// components/ModalEmployee.jsx
import React from 'react';
import FormNewEmployee from '../Forms/FormNewEmployee';

export default function ModalEmployee({ isOpen, onClose, onSuccess, selectedUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {selectedUser ? 'Editar Empleado' : 'Nuevo Empleado'}
        </h2>
        <FormNewEmployee
          onClose={onClose}
          onSuccess={onSuccess}
          userToEdit={selectedUser}
        />
      </div>
    </div>
  );
}
