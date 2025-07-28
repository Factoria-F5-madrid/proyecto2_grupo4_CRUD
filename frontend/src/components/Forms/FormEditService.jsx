import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaUpload } from 'react-icons/fa';
import { updateService } from '../../services/serviceServices';
import { subirImagenCloudinary } from '../../services/petServices';

const FormEditService = ({ service, onClose, onServiceUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    image: null,
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        available: service.available !== false,
        image: null,
        imageUrl: service.image || ''
      });
      setPreview(service.image || '');
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file' && files[0]) {
      const file = files[0];
      console.log('Archivo seleccionado:', file);
      console.log('Tipo de archivo:', file.type);
      console.log('Tamaño:', file.size);
      console.log('Nombre:', file.name);
      
      setFormData(prev => ({ ...prev, image: file }));
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Preview creado');
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validaciones básicas
      if (!formData.name.trim()) {
        throw new Error('El nombre del servicio es obligatorio');
      }
      if (!formData.description.trim()) {
        throw new Error('La descripción del servicio es obligatoria');
      }
      if (!formData.price.trim()) {
        throw new Error('El precio del servicio es obligatorio');
      }

      // Aquí iría la lógica para subir la imagen si se seleccionó una nueva
      let finalImageUrl = formData.imageUrl;
      if (formData.image) {
        console.log('Subiendo nueva imagen...');
        console.log('Tipo de archivo:', formData.image.type);
        console.log('Tamaño del archivo:', formData.image.size);
        console.log('Nombre del archivo:', formData.image.name);
        
        try {
          finalImageUrl = await subirImagenCloudinary(formData.image);
          console.log('Imagen subida exitosamente:', finalImageUrl);
        } catch (error) {
          console.error('Error subiendo imagen:', error);
          throw new Error('Error al subir la imagen: ' + error.message);
        }
      } else {
        console.log('No se seleccionó nueva imagen, manteniendo la actual');
      }

      // Mapear los datos del frontend a la estructura del backend
      const updatedServiceData = {
        lodging: formData.available, // available se mapea a lodging
        service_type: formData.name === "Guardería" ? "Guarderia" : 
                     formData.name === "Transporte" ? "Transporte" :
                     formData.name === "Comida" ? "Comida" : "Otros",
        other_service: formData.name, // nombre del servicio
        notes: formData.description, // descripción
        base_price: parseFloat(formData.price.replace(/[^0-9.]/g, '')), // extraer solo números del precio
        duration: null, // por ahora null
        image_url: finalImageUrl // URL de la imagen subida
      };

      console.log('Servicio original:', service);
      console.log('FormData:', formData);
      console.log('Datos a enviar:', updatedServiceData);
      console.log('ID del servicio:', service.id);
      console.log('Tipo de service_type:', typeof updatedServiceData.service_type);
      
      // Llamar a la API para actualizar el servicio
      const response = await updateService(service.id, updatedServiceData);
      console.log('Servicio actualizado exitosamente:', response);
      
      onServiceUpdated(response);
      onClose();
    } catch (error) {
      console.error('Error actualizando servicio:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaSave className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Editar Servicio
              </h2>
              <p className="text-sm text-gray-500">
                Modifica la información del servicio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Tipo de Servicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Servicio *
            </label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Guardería">Guardería</option>
              <option value="Transporte">Transporte</option>
              <option value="Comida">Comida</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          {/* Notas/Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas/Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe el servicio..."
            />
          </div>

          {/* Precio Base */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio Base (€) *
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price.replace(/[^0-9.]/g, '')}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25.00"
            />
          </div>

          {/* Disponibilidad */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Servicio disponible
            </label>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUpload className="inline mr-2" />
              Imagen del Servicio
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Actualizando...
                </>
              ) : (
                <>
                  <FaSave />
                  Actualizar Servicio
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditService; 