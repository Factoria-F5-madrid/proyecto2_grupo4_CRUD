// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';

const Home = () => {
  return (
   <div className="flex-1 flex flex-col items-center justify-center bg-[#ffffff] px-4 text-center">
      {/* Imagen en lugar del texto "uh oh" */}
      <img
        src={petImage}
        alt="PetImage"
        className="w-55 h-15 object-contain mb-4"
      />

      {/* Texto pequeño debajo */}
      <p className="text-[#1c1f26] text-md mb-6">
        Tu mascota es importante para nosotros 🐾, porque su felicidad es nuestra prioridad. Cuidamos de ellas con amor, dedicación y la atención que merecen tus compañeros más fieles
      </p>

      {/* Imagen de perritos */}
      <img
        src={perritosImage}
        alt="Perritos"
        className="w-full max-w-xs mb-6 rounded-md shadow-md"
      />

      {/* Botón "añade un pet" */}
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Añade un pet
      </button>
    </div>
  );
};

export default Home;
