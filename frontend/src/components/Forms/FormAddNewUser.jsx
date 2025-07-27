import React, { useState, useEffect } from 'react';
import { subirImagenCloudinary } from '../../services/petServices';
import { createUser, updateUser } from '../../services/userServices'

const Form = ({ onClose, userId, onSave, user }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: '',
    updated_by: userId || '', // Quién actualiza, por ahora userId
    hashed_password: '', // Se generará en el backend
    role: 'client', // Valor por defecto del modelo
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  // Prellenar datos si es edición
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        address: user.address,
        updated_by: userId,
        role: user.role,
        image: null, // Nueva imagen opcional
      });
      setPreview(user.image_url || null); // Asumiendo que el backend devuelve image_url
    }
  }, [user, userId]);

  // Expresiones regulares para validación
  const regex = {
    first_name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/,
    last_name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/,
    phone_number: /^\d{10}$/, // 10 dígitos
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email básico
    address: /^.{5,200}$/, // Mínimo 5, máximo 200 caracteres
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!regex.first_name.test(formData.first_name)) newErrors.first_name = 'Nombre inválido';
    if (!regex.last_name.test(formData.last_name)) newErrors.last_name = 'Apellido inválido';
    if (!regex.phone_number.test(formData.phone_number)) newErrors.phone_number = 'Teléfono inválido (10 dígitos)';
    if (!regex.email.test(formData.email)) newErrors.email = 'Email inválido';
    if (!regex.address.test(formData.address)) newErrors.address = 'Dirección inválida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let imageUrl = user?.image_url || null;
    if (formData.image) {
      try {
        imageUrl = await subirImagenCloudinary(formData.image);
      } catch (err) {
        console.error('Error al subir imagen:', err);
        return;
      }
    }

    const userData = {
      ...formData,
      image_url: imageUrl,
      hashed_password: user ? undefined : '', // Backend genera en creación
    };

    try {
      await (user ? updateUser(userId, userData) : createUser(userData));
      onSave(userData);
      onClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-indigo-700 text-center">
        {user ? 'Editar Datos' : 'Registra tu Perfil'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder={errors.first_name || 'Enter first name'}
          className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
            errors.first_name ? 'border-red-500 placeholder-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Apellido</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder={errors.last_name || 'Enter last name'}
          className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
            errors.last_name ? 'border-red-500 placeholder-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder={errors.phone_number || 'Enter phone (10 digits)'}
          className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
            errors.phone_number ? 'border-red-500 placeholder-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={errors.email || 'Enter email'}
          className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
            errors.email ? 'border-red-500 placeholder-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder={errors.address || 'Enter address'}
          className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
            errors.address ? 'border-red-500 placeholder-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Foto de Perfil (Opcional)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        {preview && (
          <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg border" />
        )}
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm shadow"
        >
          {user ? 'Guardar Cambios' : 'Crear Perfil'}
        </button>
      </div>
    </form>
  );
};

export default Form;