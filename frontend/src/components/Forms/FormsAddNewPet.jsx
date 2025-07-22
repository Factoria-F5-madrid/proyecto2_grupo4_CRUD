import { useState } from "react";

const Form = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pet submitted:", formData);
    onClose(); // Cierra el modal después del submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="species"
        placeholder="Species"
        value={formData.species}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={formData.breed}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <div className="flex justify-between items-center">
        <button
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
