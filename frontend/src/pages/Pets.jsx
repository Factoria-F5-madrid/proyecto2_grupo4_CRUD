import React, { useEffect, useState } from "react";
import { getAllPets } from "../services/petServices";
import PetCard from "../components/Cards/PetCard";
import FormsAddNewPet from "../components/Forms/FormsAddNewPet";
import { useAuth } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { user, isUser } = useAuth();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log("🔍 Iniciando fetchPets...");
        console.log("👤 Usuario actual:", user);
        
        const data = await getAllPets();
        console.log("✅ Datos recibidos:", data);
        console.log("📊 Número de mascotas:", data.length);
        
        setPets(data);
      } catch (error) {
        console.error("❌ Error al cargar mascotas:", error);
        setError("Error al cargar las mascotas: " + error.message);
      }
    };

    fetchPets();
  }, [user]);

  const handlePetCreated = () => {
    // Recargar la lista de mascotas después de crear una nueva
    window.location.reload();
  };

  console.log("🎨 Renderizando Pets component");
  console.log("📊 Estado actual de pets:", pets);
  console.log("👤 Usuario:", user);
  console.log("🔐 Es usuario regular:", isUser());

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-[#1c1f26] font-bold">Mascotas registradas</h1>
        {isUser() && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition duration-300 ease-in-out"
          >
            <FaPlus />
            Añadir Mascota
          </button>
        )}
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pets.map((pet) => <PetCard key={pet.pet_id} pet={pet} />)}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            {isUser() 
              ? "No tienes mascotas registradas aún." 
              : "No hay mascotas registradas."
            }
          </p>
          {isUser() && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto transition duration-300 ease-in-out"
            >
              <FaPlus />
              Registrar mi primera mascota
            </button>
          )}
        </div>
      )}

      {/* Modal para el formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <FormsAddNewPet 
              onClose={() => setShowForm(false)} 
              userId={user?.user_id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pets;
