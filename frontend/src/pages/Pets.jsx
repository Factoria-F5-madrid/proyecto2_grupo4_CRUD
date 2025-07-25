import React, { useEffect, useState } from "react";
import { getAllPets } from "../services/petServices";
import PetCard from "../components/Cards/PetCard";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAllPets();
        setPets(data);
      } catch (error) {
        setError("Error al cargar las mascotas", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl text-[#1c1f26] text-center  font-bold mb-6">Mascotas registradas</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pets.length > 0 ? (
          pets.map((pet) => <PetCard key={pet.pet_id} pet={pet} />)
        ) : (
          <p>No hay mascotas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Pets;
