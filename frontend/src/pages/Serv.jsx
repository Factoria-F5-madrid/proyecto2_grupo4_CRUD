import { useState } from 'react';
import { Link } from 'react-router-dom';
import daycareServ from '../assets/daycareServ.png';
import foodServ from '../assets/foodServ.png';
import transportationServ from '../assets/transportationServ.png';
import groomingServ from '../assets/groomingServ.png';
import walkServ from '../assets/walkServ.png';
import vetServ from '../assets/vetServ.png';
import petImage from '../assets/petLand-logo-letra-azul.png';

const Serv = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col justify-start items-center bg-gray-50">
      <div className="w-full max-w-7xl bg-white rounded-2xl flex flex-col justify-center items-center overflow-hidden shadow-lg">
        <div className="w-full px-4 sm:px-8 md:px-10 pt-7 flex flex-col justify-start items-center gap-6">
          <img
            src={petImage}
            alt="PetImage"
            className="w-40 sm:w-48 md:w-55 h-12 sm:h-14 md:h-15 object-contain"
          />
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl font-bold font-['Noto_Sans'] leading-relaxed">
              Servicios para Mascotas
            </div>
            <div className="text-center text-slate-500 text-sm sm:text-base md:text-lg font-normal font-['Noto_Sans'] leading-normal">
              Elige un servicio para tu mascota
            </div>
          </div>
          <div className="w-full h-1 flex justify-start items-center">
            <div className="flex-1 h-0 outline outline-[3px] outline-offset-[-1.5px] outline-gray-100" />
          </div>
        </div>
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 py-10 flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Guardería */}
            <div className="flex-1 h-96 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
              <div className="w-full h-3/4 rounded-t-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={daycareServ} alt="Guardería" />
              </div>
              <div className="w-full p-4 bg-yellow-400 text-center flex flex-col justify-center items-center rounded-b-2xl">
                <div className="text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal mb-2">Guardería</div>
                <div className="w-full flex justify-center items-center gap-4">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center hover:bg-blue-600 transition-colors">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition-colors">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Transporte */}
            <div className="flex-1 h-96 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
              <div className="w-full h-3/4 rounded-t-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={transportationServ} alt="Transporte" />
              </div>
              <div className="w-full p-4 bg-yellow-400 text-center flex flex-col justify-center items-center rounded-b-2xl">
                <div className="text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal mb-2">Transporte</div>
                <div className="w-full flex justify-center items-center gap-4">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center hover:bg-blue-600 transition-colors">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition-colors">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Comida */}
            <div className="flex-1 h-96 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
              <div className="w-full h-3/4 rounded-t-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={foodServ} alt="Comida" />
              </div>
              <div className="w-full p-4 bg-yellow-400 text-center flex flex-col justify-center items-center rounded-b-2xl">
                <div className="text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal mb-2">Comida</div>
                <div className="w-full flex justify-center items-center gap-4">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center hover:bg-blue-600 transition-colors">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition-colors">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Peluquería */}
            <div className="flex-1 h-96 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
              <div className="w-full h-3/4 rounded-t-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={groomingServ} alt="Peluquería" />
              </div>
              <div className="w-full p-4 bg-yellow-400 text-center flex flex-col justify-center items-center rounded-b-2xl">
                <div className="text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal mb-2">Peluquería</div>
                <div className="w-full flex justify-center items-center gap-4">
                  <div className="w-32 p-4 bg-gray-300 rounded-2xl flex justify-center items-center cursor-not-allowed">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Próximamente</div>
                  </div>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition-colors">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Paseo */}
            <div className="flex-1 h-96 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
              <div className="w-full h-3/4 rounded-t-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={walkServ} alt="Paseo" />
              </div>
              <div className="w-full p-4 bg-yellow-400 text-center flex flex-col justify-center items-center rounded-b-2xl">
                <div className="text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal mb-2">Paseo</div>
                <div className="w-full flex justify-center items-center gap-4">
                  <div className="w-32 p-4 bg-gray-300 rounded-2xl flex justify-center items-center cursor-not-allowed">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Próximamente</div>
                  </div>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition-colors">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Veterinario */}
            <div className="flex-1 h-96 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
              <div className="w-full h-3/4 rounded-t-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={vetServ} alt="Veterinario" />
              </div>
              <div className="w-full p-4 bg-yellow-400 text-center flex flex-col justify-center items-center rounded-b-2xl">
                <div className="text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal mb-2">Veterinario</div>
                <div className="w-full flex justify-center items-center gap-4">
                  <div className="w-32 p-4 bg-gray-300 rounded-2xl flex justify-center items-center cursor-not-allowed">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Próximamente</div>
                  </div>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition-colors">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Serv;