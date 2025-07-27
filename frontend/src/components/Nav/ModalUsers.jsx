// components/ModalUsers.jsx
import React from 'react';
import FormNewUsers from '../Forms/FormNewUsers';

export default function ModalUsers({ isOpen, onClose, onSuccess, selectedUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>
        <FormNewUsers
          onClose={onClose}
          onSuccess={onSuccess}
          userToEdit={selectedUser}
        />
      </div>
    </div>
  );
}
