import React from "react";

const PetCard = ({ pet }) => {
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

  return (
    <div className="bg-[#edad06] shadow-md rounded-lg overflow-hidden max-w-xs w-full mx-auto">
      <img
        src={img_url || "https://via.placeholder.com/300x200.png?text=No+Image"}
        alt={name}
        className="w-full h-60 object-cover"
      />
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
