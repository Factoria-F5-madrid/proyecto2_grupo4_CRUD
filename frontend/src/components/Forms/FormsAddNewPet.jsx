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
    user_id: 1,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

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

    if (!regex.name.test(formData.name)) newErrors.name = "Falta el nombre";
    if (!regex.species.test(formData.species)) newErrors.species = "Especie inválida";
    if (!regex.breed.test(formData.breed)) newErrors.breed = "Falta la raza";
    if (!regex.birth_date.test(formData.birth_date)) newErrors.birth_date = "Fecha inválida";

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
      user_id: 1,
    };

    try {
      await createPet(petData);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error al crear el pet:", error);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-1"
>
  <h2 className="text-xl font-semibold text-indigo-700 text-center">Register your Pet 🐾</h2>

  <div>
    <label className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder={errors.name || "Enter name"}
      className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
        errors.name ? "border-red-500 placeholder-red-500" : "border-gray-300"
      }`}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Species</label>
    <select
      name="species"
      value={formData.species}
      onChange={handleChange}
      className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
        errors.species ? "border-red-500 text-red-500" : "border-gray-300"
      }`}
    >
      <option value="">Select a species</option>
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
    <label className="block text-sm font-medium text-gray-700">Breed</label>
    <input
      type="text"
      name="breed"
      value={formData.breed}
      onChange={handleChange}
      placeholder={errors.breed || "Enter breed"}
      className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
        errors.breed ? "border-red-500 placeholder-red-500" : "border-gray-300"
      }`}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Birth Date</label>
    <input
      type="date"
      name="birth_date"
      value={formData.birth_date}
      onChange={handleChange}
      className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm ${
        errors.birth_date ? "border-red-500 text-red-500" : "border-gray-300"
      }`}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Allergies</label>
    <input
      type="text"
      name="allergies"
      value={formData.allergies}
      onChange={handleChange}
      placeholder="Optional"
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Special Needs</label>
    <input
      type="text"
      name="special_needs"
      value={formData.special_needs}
      onChange={handleChange}
      placeholder="Optional"
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleChange}
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
    />
    {preview && (
      <img
        src={preview}
        alt="Preview"
        className="mt-2 w-24 h-24 object-cover rounded-lg border"
      />
    )}
  </div>

  <div className="flex justify-end gap-4 pt-2">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm shadow"
    >
      Save Pet
    </button>
  </div>
</form>

  );
};

export default Form;
