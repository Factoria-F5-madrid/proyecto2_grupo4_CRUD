import { useState } from 'react';
import { Link } from 'react-router-dom';
import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/ModalInvoice';

const Invoice = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#ffffff] px-4 text-center">
      <img
        src={petImage}
        alt="PetImage"
        className="w-55 h-15 object-contain mb-4"
      />
      {/* Imagen de perritos */}
      <img
          src={perritosImage}
          alt="Perritos"
          className="w-full max-w-xs mb-6 rounded-md shadow-md"
      />
      {/* Botón "solicita la factura" */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Solicita la factura
      </button>
        {showModal && <Modal onClose={() => setShowModal(false)} /> }
    </div>
  )
}

export default Invoice