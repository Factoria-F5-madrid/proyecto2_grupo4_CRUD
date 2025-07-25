// src/pages/Home.jsx
import { useState } from 'react';
import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/Modal';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
  
  return (
   <div className="flex-1 flex flex-col items-center justify-center bg-[#ffffff] px-4 ">
      
      <img
        src={petImage}
        alt="PetImage"
        className="w-55 h-15 object-contain mb-4"
      />

    
      <p className="text-[#1c1f26] text-md mb-6">
        Tu mascota es importante para nosotros 🐾, porque su felicidad es nuestra prioridad. Cuidamos de ellas con amor,y la atención que merecen tus compañeros más fieles
      </p>

     
      <img
        src={perritosImage}
        alt="Perritos"
        className="w-full max-w-xs mb-6 rounded-md shadow-md"
      />

      
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Añade un pet
      </button>
       {showModal && <Modal onClose={() => setShowModal(false)} userId={1} /> }
    </div>
  );
};

export default Home;
