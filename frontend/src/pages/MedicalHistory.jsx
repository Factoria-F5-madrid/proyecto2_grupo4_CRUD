import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/ModalMedicalHistory';
import PetCard from '../components/Cards/PetCard';
import { getAllPets } from '../services/petServices';
import { getMedicalHistoryByPetID } from '../services/medicalHistoryServices';

const MedicalHistory = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAllPets();
        setPets(data);
      } catch (error) {
        setError('Error al cargar las mascotas');
      }
    };
    fetchPets();
  }, []);

  const handleMedicalHistory = async (petId) => {
    try {
      const history = await getMedicalHistoryByPetID(petId);
      setSelectedMedicalHistory(history);
      setShowModal(true);
    } catch (error) {
      setError('Error al cargar el historial médico');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#ffffff] px-4 text-center">
      <img
        src={petImage}
        alt="PetImage"
        className="w-55 h-15 object-contain mb-4"
      />
      {/* <img
        src={perritosImage}
        alt="Perritos"
        className="w-full max-w-xs mb-6 rounded-md shadow-md"
      /> */}
      <h1 className="text-3xl text-[#1c1f26] font-bold mb-6">Historial Médico</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet.pet_id} className="relative">
              <PetCard pet={pet} />
              <button
                onClick={() => handleMedicalHistory(pet.pet_id)}
                className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-indigo-700 transition w-full"
              >
                Ver Historial Médico
              </button>
            </div>
          ))
        ) : (
          <p>No hay mascotas registradas.</p>
        )}
      </div>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setSelectedMedicalHistory(null);
          }}
          medicalHistory={selectedMedicalHistory}
        />
      )}
    </div>
  );
};

export default MedicalHistory;