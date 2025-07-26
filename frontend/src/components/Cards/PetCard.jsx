import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PetCard = ({ pet, onEditClick, onDeleteClick }) => {
  const { name, species, breed, birth_date, img_url } = pet;

  const getAge = (dateString) => {
    const birth = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleCardClick = (e) => {
    // Evitar que se active si se hace click en los botones
    if (e.target.closest('.action-button')) {
      return;
    }
    onEditClick(pet);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${name}? Esta acción no se puede deshacer.`)) {
      onDeleteClick(pet);
    }
  };

  return (
    <div 
      className="bg-[#edad06] shadow-md rounded-lg overflow-hidden max-w-xs w-full mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300 relative group"
      onClick={handleCardClick}
    >
      <img
        src={img_url || "https://via.placeholder.com/300x200.png?text=No+Image"}
        alt={name}
        className="w-full h-60 object-cover"
      />
      
      {/* Botones de acción */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="action-button bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(pet);
          }}
          title="Editar mascota"
        >
          <FaEdit className="text-indigo-600" />
        </button>
        <button
          className="action-button bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md"
          onClick={handleDeleteClick}
          title="Eliminar mascota"
        >
          <FaTrash className="text-red-600" />
        </button>
      </div>
      
      <div className="p-4 text-[#1c1f26]">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p><strong>Especie:</strong> {species}</p>
        <p><strong>Raza:</strong> {breed}</p>
        <p><strong>Edad:</strong>  {birth_date ? `${getAge(birth_date)} ${getAge(birth_date) === 1 ? "año" : "años"}` : "No disponible"}</p>
      </div>
    </div>
  );
};

export default PetCard;
