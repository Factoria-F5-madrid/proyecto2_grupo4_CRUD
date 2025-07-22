import React from "react";

const PetCard = ({ pet }) => {
  const { name, species, breed, birth_date, image_url } = pet;

  // Calcular edad a partir de la fecha de nacimiento
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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72">
      <img
        src={image_url || "https://via.placeholder.com/300x200.png?text=No+Image"}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p><strong>Especie:</strong> {species}</p>
        <p><strong>Raza:</strong> {breed}</p>
        <p><strong>Edad:</strong> {birth_date ? `${getAge(birth_date)} años` : "No definida"}</p>
      </div>
    </div>
  );
};

export default PetCard;
