import React, { useState, useEffect } from 'react';
import { updatePet } from '../../services/petServices';
import { FaTimes } from 'react-icons/fa';

const FormsEditPet = ({ pet, onClose, onPetUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birth_date: '',
    allergies: '',
    special_needs: '',
    img_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: pet.species || '',
        breed: pet.breed || '',
        birth_date: pet.birth_date ? pet.birth_date.split('T')[0] : '', // Formatear fecha para input
        allergies: pet.allergies || '',
        special_needs: pet.special_needs || '',
        img_url: pet.img_url || ''
      });
    }
  }, [pet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔄 Actualizando mascota:', pet.pet_id, formData);
      
      const updatedPet = await updatePet(pet.pet_id, formData);
      console.log('✅ Mascota actualizada:', updatedPet);
      
      onPetUpdated(updatedPet);
      onClose();
    } catch (error) {
      console.error('❌ Error actualizando mascota:', error);
      setError('Error al actualizar la mascota: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Editar Mascota</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especie *
          </label>
          <select
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Selecciona una especie</option>
            <option value="Canino">Canino</option>
            <option value="Felino">Felino</option>
            <option value="Reptil">Reptil</option>
            <option value="Anfibio">Anfibio</option>
            <option value="Ave">Ave</option>
            <option value="Pez">Pez</option>
            <option value="Roedor">Roedor</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Raza *
          </label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alergias
          </label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            placeholder="Ej: Polen, ciertos alimentos..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Necesidades Especiales
          </label>
          <textarea
            name="special_needs"
            value={formData.special_needs}
            onChange={handleInputChange}
            rows="3"
            placeholder="Ej: Medicación especial, dieta específica..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen
          </label>
          <input
            type="url"
            name="img_url"
            value={formData.img_url}
            onChange={handleInputChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormsEditPet; 