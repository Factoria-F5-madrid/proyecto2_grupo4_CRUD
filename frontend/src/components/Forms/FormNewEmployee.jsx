// components/Forms/FormNewEmployee.jsx
import React, { useState } from 'react';
import { createEmployee, updateEmployee } from '../../services/employeeServices';

const SPECIALTIES = [
  'Veterinario',
  'Cuidador',
  'Peluquero',
  'Recepcionista',
  'Administrativo',
  'Otro',
];

export default function FormNewEmployee({ onClose, onSuccess, userToEdit }) {
  const isEditing = Boolean(userToEdit);

  const [formData, setFormData] = useState({
    first_name: userToEdit?.first_name || '',
    last_name: userToEdit?.last_name || '',
    specialty: userToEdit?.specialty || '',
    is_active: userToEdit?.is_active ?? true,
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      ...formData,
    };

    if (isEditing) {
      const realId = userToEdit.employee_id;
      await updateEmployee(realId, payload);
      setSuccessMessage('Empleado actualizado correctamente ✅');
    } else {
      await createEmployee(payload);
      setSuccessMessage('Empleado creado correctamente ✅');
    }

    onSuccess?.();
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1500);
  } catch (error) {
    console.error(error);
    alert('Error al guardar el empleado. Verifica los datos.');
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
          {successMessage}
        </div>
      )}

      <input
        type="text"
        name="first_name"
        placeholder="Nombre"
        value={formData.first_name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        name="last_name"
        placeholder="Apellido"
        value={formData.last_name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <select
        name="specialty"
        value={formData.specialty}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      >
        <option value="" disabled>Selecciona especialidad</option>
        {SPECIALTIES.map((spec) => (
          <option key={spec} value={spec}>{spec}</option>
        ))}
      </select>

      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
        <span>Empleado activo</span>
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
