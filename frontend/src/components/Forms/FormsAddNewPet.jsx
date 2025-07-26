import { useState } from "react";
import { createPet } from "../../services/petServices";
import { subirImagenCloudinary } from "../../services/petServices";

const Form = ({ onClose, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    birth_date: "",
    allergies: "",
    special_needs: "",
    image: null,
    user_id: userId || 1, // Usar el userId pasado como prop
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const regex = {
    name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/,
    species: /^(Canino|Felino|Reptil|Anfibio|Ave|Pez|Roedor|Otro)$/i,
    breed: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\- ]{2,30}$/,
    birth_date: /^\d{4}-\d{2}-\d{2}$/,
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        // Validar tamaño de archivo (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, image: "La imagen debe ser menor a 5MB" }));
          return;
        }
        
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          setErrors((prev) => ({ ...prev, image: "Debe ser un archivo de imagen" }));
          return;
        }

        setFormData((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Limpiar error general al cambiar cualquier campo
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const newErrors = {};

    // Validaciones
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (!regex.name.test(formData.name)) {
      newErrors.name = "Nombre inválido (2-30 caracteres, solo letras)";
    }

    if (!formData.species) {
      newErrors.species = "La especie es requerida";
    } else if (!regex.species.test(formData.species)) {
      newErrors.species = "Especie inválida";
    }

    if (!formData.breed.trim()) {
      newErrors.breed = "La raza es requerida";
    } else if (!regex.breed.test(formData.breed)) {
      newErrors.breed = "Raza inválida (2-30 caracteres)";
    }

    if (!formData.birth_date) {
      newErrors.birth_date = "La fecha de nacimiento es requerida";
    } else if (!regex.birth_date.test(formData.birth_date)) {
      newErrors.birth_date = "Fecha inválida";
    } else {
      // Validar que la fecha no sea futura
      const today = new Date();
      const birthDate = new Date(formData.birth_date);
      if (birthDate > today) {
        newErrors.birth_date = "La fecha no puede ser futura";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = null;
      
      // Subir imagen si existe
      if (formData.image) {
        try {
          console.log("Subiendo imagen...");
          imageUrl = await subirImagenCloudinary(formData.image);
          console.log("Imagen subida exitosamente:", imageUrl);
        } catch (imageError) {
          console.error("Error al subir imagen:", imageError);
          setSubmitError("Error al subir la imagen. Intenta de nuevo.");
          setIsSubmitting(false);
          return;
        }
      }

      // Preparar datos para enviar
      const petData = {
        name: formData.name.trim(),
        species: formData.species,
        breed: formData.breed.trim(),
        birth_date: formData.birth_date,
        allergies: formData.allergies.trim() || null,
        special_needs: formData.special_needs.trim() || null,
        img_url: imageUrl,
        user_id: parseInt(formData.user_id), // Asegurar que sea número
      };

      console.log("Enviando datos de mascota:", petData);

      // Crear mascota
      const result = await createPet(petData);
      console.log("Mascota creada exitosamente:", result);
      
      // Cerrar modal y recargar
      onClose();
      window.location.reload();
      
    } catch (error) {
      console.error("Error al crear la mascota:", error);
      
      // Manejo específico de errores
      if (error.response) {
        // Error del servidor (4xx, 5xx)
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 422) {
          // Error de validación
          setSubmitError("Datos inválidos. Verifica todos los campos.");
          if (errorData.detail) {
            console.log("Detalles del error:", errorData.detail);
          }
        } else if (status === 500) {
          setSubmitError("Error interno del servidor. Intenta de nuevo.");
        } else {
          setSubmitError(`Error del servidor: ${status}`);
        }
      } else if (error.request) {
        // Error de red
        setSubmitError("Error de conexión. Verifica tu internet.");
      } else {
        setSubmitError("Error inesperado. Intenta de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4"
    >
      {/* Error general */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {submitError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre de tu mascota"
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Especie *
        </label>
        <select
          name="species"
          value={formData.species}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.species ? "border-red-500" : "border-gray-300"
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
        {errors.species && <p className="text-red-500 text-xs mt-1">{errors.species}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Raza *
        </label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Raza de tu mascota"
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.breed ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de Nacimiento *
        </label>
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.birth_date ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alergias
        </label>
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Alergias conocidas (opcional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Necesidades Especiales
        </label>
        <input
          type="text"
          name="special_needs"
          value={formData.special_needs}
          onChange={handleChange}
          placeholder="Cuidados especiales (opcional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Foto de tu mascota
        </label>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        
        {preview && (
          <div className="mt-3 flex justify-center">
            <img
              src={preview}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </>
          ) : (
            "Guardar Mascota"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;