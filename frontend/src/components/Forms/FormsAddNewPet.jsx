import { useState } from "react";
import { createPet } from "../../services/petServices";

const Form = ({ onClose, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    birth_date: "",
    allergies: "",
    special_needs: "",
  });

  const [errors, setErrors] = useState({});

  const regex = {
    name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/,
    species: /^(Dog|Cat|Rabbit|Other)$/i,
    breed: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\- ]{2,30}$/,
    birth_date: /^\d{4}-\d{2}-\d{2}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpia error al escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!regex.name.test(formData.name)) {
      newErrors.name = "Falta el nombre";
    }

    if (!regex.species.test(formData.species)) {
      newErrors.species = "Especie inválida (Dog, Cat, Rabbit, Other)";
    }

    if (!regex.breed.test(formData.breed)) {
      newErrors.breed = "Falta la raza";
    }

    if (!regex.birth_date.test(formData.birth_date)) {
      newErrors.birth_date = "Fecha inválida (YYYY-MM-DD)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const petData = {
      ...formData,
      allergies: formData.allergies || null,
      special_needs: formData.special_needs || null,
      user_id: userId,
    };

    console.log("Pet submitted:", petData);
    onClose(); // cerrar modal
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder={errors.name || "Name"}
        value={formData.name}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded ${
          errors.name ? "border-red-500 placeholder-red-500" : ""
        }`}
      />
      <select
        name="species"
        value={formData.species}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded ${
          errors.species ? "border-red-500 text-red-500" : ""
        }`}
      >
        <option value="">Seleccione una especie</option>
        <option value="Canino">Canino</option>
        <option value="Felino">Felino</option>
        <option value="Reptil">Reptil</option>
        <option value="Anfibio">Anfibio</option>
        <option value="Ave">Ave</option>
        <option value="Pez">Pez</option>
        <option value="Roedor">Roedor</option>
        <option value="Otro">Otro</option>
      </select>
      <input
        type="text"
        name="breed"
        placeholder={errors.breed || "Breed"}
        value={formData.breed}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded ${
          errors.breed ? "border-red-500 placeholder-red-500" : ""
        }`}
      />
      <input
        type="date"
        name="birth_date"
        placeholder="Birth Date"
        value={formData.birth_date}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded ${
          errors.birth_date ? "border-red-500 text-red-500" : ""
        }`}
      />
      <input
        type="text"
        name="allergies"
        placeholder="Allergies (optional)"
        value={formData.allergies}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="special_needs"
        placeholder="Special Needs (optional)"
        value={formData.special_needs}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      />
      <div className="flex justify-between items-center">
        <button
          onClick={createPet}
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save
        
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
