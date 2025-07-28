import { useState } from "react";
import { createPet } from "../../services/petServices";
import { subirImagenCloudinary } from "../../services/petServices";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaSave, FaUpload } from "react-icons/fa";

const Form = ({ onClose, userId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    birth_date: "",
    allergies: "",
    special_needs: "",
    image: null,
    user_id: user?.user_id || 1,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const regex = {
    name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-\.]{2,50}$/,
    species: /^(Canino|Felino|Reptil|Anfibio|Ave|Pez|Roedor|Otro)$/i,
    breed: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-\.]{2,50}$/,
    birth_date: /^\d{4}-\d{2}-\d{2}$/,
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!regex.name.test(formData.name)) newErrors.name = "El nombre debe tener entre 2 y 50 caracteres";
    if (!regex.species.test(formData.species)) newErrors.species = "Debes seleccionar una especie válida";
    if (!regex.breed.test(formData.breed)) newErrors.breed = "La raza debe tener entre 2 y 50 caracteres";
    if (!regex.birth_date.test(formData.birth_date)) newErrors.birth_date = "Debes seleccionar una fecha válida";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let imageUrl = null;
    if (formData.image) {
      try {
        imageUrl = await subirImagenCloudinary(formData.image);
        console.log("Imagen subida:", imageUrl);
      } catch (err) {
        console.error("Error al subir imagen:", err);
      }
    }

    const petData = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      birth_date: formData.birth_date,
      allergies: formData.allergies || null,
      special_needs: formData.special_needs || null,
      img_url: imageUrl,
      user_id: user?.user_id || 1,
    };

    console.log('Usuario actual:', user);
    console.log('Datos a enviar:', petData);

    try {
      await createPet(petData);
      
      onClose();
      navigate('/pets?refresh=true');
    } catch (error) {
      console.error("Error al crear el pet:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
     
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Registrar Mascota 🐾</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

   
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Mascota *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Max, Luna, Rocky..."
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especie *
              </label>
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.species ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
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
              {errors.species && (
                <p className="mt-1 text-sm text-red-600">{errors.species}</p>
              )}
            </div>

        
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raza *
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Ej: Labrador, Persa, Pastor Alemán..."
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.breed ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {errors.breed && (
                <p className="mt-1 text-sm text-red-600">{errors.breed}</p>
              )}
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento *
              </label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.birth_date ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {errors.birth_date && (
                <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alergias (Opcional)
              </label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Ej: Alergia al polen, medicamentos..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
              />
            </div>

        
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Necesidades Especiales (Opcional)
              </label>
              <input
                type="text"
                name="special_needs"
                value={formData.special_needs}
                onChange={handleChange}
                placeholder="Ej: Dieta especial, cuidados médicos..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUpload className="inline mr-2" />
              Foto de la Mascota (Opcional)
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

        
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <FaSave />
              Registrar Mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
