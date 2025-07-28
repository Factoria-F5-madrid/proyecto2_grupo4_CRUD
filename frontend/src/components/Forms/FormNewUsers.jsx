// components/Forms/FormNewUsers.jsx
import React, { useState } from 'react';
import { createUser, updateUser } from '../../services/userServices';
import { useAuth } from '../../context/AuthContext';

export default function FormNewUsers({ onClose, onSuccess, userToEdit }) {
  const isEditing = Boolean(userToEdit);
  const { isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    first_name: userToEdit?.first_name || '',
    last_name: userToEdit?.last_name || '',
    phone_number: userToEdit?.phone_number || '',
    email: userToEdit?.email || '',
    address: userToEdit?.address || '',
    password: '',
    role: userToEdit?.role || 'user',
    specialty: userToEdit?.specialty || '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const cleanPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: Number(formData.phone_number),
      email: formData.email,
      address: formData.address,
      password: formData.password || undefined,
      role: formData.role,
    };

   
    if (formData.role === 'employee' && formData.specialty) {
      cleanPayload.specialty = formData.specialty;
    }

    if (isEditing) {
      const userId = userToEdit.user_id.replace('usr-', '');
      await updateUser(userId, cleanPayload);
      setSuccessMessage(' Usuario actualizado correctamente.');
    } else {
      await createUser(cleanPayload);
      setSuccessMessage(' Usuario creado correctamente.');
      setFormData({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
        password: '',
        role: 'user',
        specialty: '',
      });
    }

    onSuccess(isEditing ? { ...cleanPayload, user_id: userToEdit.user_id } : null);

    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 2000);
  } catch (error) {
    console.error(error);
    alert('Error al guardar el usuario. Verifica los datos.');
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[#1c1c26]">
      {successMessage && (
        <div className="bg-green-100 text-green-700 text-sm p-2 rounded">
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
      <input
        type="number"
        name="phone_number"
        placeholder="Teléfono"
        value={formData.phone_number}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />


      {isAdmin() && (
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 bg-white"
        >
          <option value="user">Usuario</option>
          <option value="employee">Empleado</option>
          <option value="admin">Administrador</option>
        </select>
      )}

    
      {formData.role === 'employee' && (
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 bg-white"
        >
          <option value="">Selecciona especialidad</option>
          <option value="Veterinario">Veterinario</option>
          <option value="Cuidador">Cuidador</option>
          <option value="Peluquero">Peluquero</option>
          <option value="Recepcionista">Recepcionista</option>
          <option value="Administrativo">Administrativo</option>
          <option value="Otro">Otro</option>
        </select>
      )}

      {!isEditing && (
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      )}

     
      {!isAdmin() && (
        <input type="hidden" name="role" value="user" />
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="text-[#1c1f26] hover:text-gray-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[#edad06] text-white px-4 py-2 rounded hover:bg-yellow-400"
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
