import { useState } from 'react';
import { Link } from 'react-router-dom';
import daycareServ from '../assets/daycareServ.png';
import foodServ from '../assets/foodServ.png';
import transportationServ from '../assets/transportationServ.png';
import othersServ from '../assets/othersServ.png'
import petImage from '../assets/petLand-logo-letra-azul.png';

const Serv = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="self-stretch h-[1024px] p-2.5 inline-flex flex-col justify-start items-start">
      <div className="self-stretch flex-1 bg-white rounded-2xl flex flex-col justify-center items-center overflow-hidden">
        <div className="self-stretch h-40 px-10 pt-7 flex flex-col justify-start items-center gap-6">
          <img
            src={petImage}
            alt="PetImage"
            className="w-55 h-15 object-contain"
          />
          <div className="flex-1 inline-flex flex-col justify-center items-center">
            <div className="self-stretch text-center text-gray-700 text-xl font-bold font-['Noto_Sans'] leading-relaxed">Servicios para Mascotas</div>
            <div className="self-stretch text-center text-slate-500 text-base font-normal font-['Noto_Sans'] leading-normal">Elige un servicio para tu mascota</div>
          </div>
          <div className="self-stretch h-1 inline-flex justify-start items-center">
            <div className="flex-1 h-0 outline outline-[3px] outline-offset-[-1.50px] outline-gray-100" />
          </div>
        </div>
        <div className="self-stretch flex-1 px-24 py-10 flex flex-col justify-start items-center gap-10">
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            {/* Primera fila de la cuadrícula 2x2 */}
            <div className="self-stretch inline-flex justify-start items-start gap-5">
              <div className="flex-1 h-72 px-4 pt-5 bg-white rounded-2xl shadow-[0px_4px_20px_-2px_rgba(50,50,71,0.02)] shadow-[0px_0px_5px_0px_rgba(12,26,75,0.05)] outline outline-1 outline-offset-[-0.50px] outline-gray-100 inline-flex flex-col justify-between items-center overflow-hidden">
                <div className="pt-2 pb-5 flex flex-col justify-start items-center">
                  <div className="text-center text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal">Guardería</div>
                </div>
                <img className="w-64 h-52" src={daycareServ} alt="Guardería" />
                <div className="w-full flex justify-center items-center gap-4 pb-5">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
              <div className="flex-1 h-72 px-4 pt-5 bg-white rounded-2xl shadow-[0px_4px_20px_-2px_rgba(50,50,71,0.02)] shadow-[0px_0px_5px_0px_rgba(12,26,75,0.05)] outline outline-1 outline-offset-[-0.50px] outline-gray-100 inline-flex flex-col justify-between items-center overflow-hidden">
                <div className="pt-2 pb-5 flex flex-col justify-start items-center">
                  <div className="text-center text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal">Transporte</div>
                </div>
                <img className="w-64 h-52" src={transportationServ} alt="Transporte" />
                <div className="w-full flex justify-center items-center gap-4 pb-5">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Segunda fila de la cuadrícula 2x2 */}
            <div className="self-stretch inline-flex justify-start items-start gap-5">
              <div className="flex-1 h-72 px-4 pt-5 bg-white rounded-2xl shadow-[0px_4px_20px_-2px_rgba(50,50,71,0.02)] shadow-[0px_0px_5px_0px_rgba(12,26,75,0.05)] outline outline-1 outline-offset-[-0.50px] outline-gray-100 inline-flex flex-col justify-between items-center overflow-hidden">
                <div className="pt-2 pb-5 flex flex-col justify-start items-center">
                  <div className="text-center text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal">Comida</div>
                </div>
                <img className="w-64 h-52" src={foodServ} alt="Comida" />
                <div className="w-full flex justify-center items-center gap-4 pb-5">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-slate-400 text-base font-medium font-['Noto_Sans'] leading-tight">Saber más</div>
                  </button>
                </div>
              </div>
              <div className="flex-1 h-72 px-4 pt-5 bg-white rounded-2xl shadow-[0px_4px_20px_-2px_rgba(50,50,71,0.02)] shadow-[0px_0px_5px_0px_rgba(12,26,75,0.05)] outline outline-1 outline-offset-[-0.50px] outline-gray-100 inline-flex flex-col justify-between items-center overflow-hidden">
                <div className="pt-2 pb-5 flex flex-col justify-start items-center">
                  <div className="text-center text-gray-700 text-base font-semibold font-['Noto_Sans'] leading-normal">Otros</div>
                </div>
                <img className="w-64 h-52" src={othersServ} alt="Otros" />
                <div className="w-full flex justify-center items-center gap-4 pb-5">
                  <Link to="/reservations" className="w-32 p-4 bg-blue-500 rounded-2xl flex justify-center items-center">
                    <div className="text-center text-white text-base font-medium font-['Noto_Sans'] leading-tight">Reservar</div>
                  </Link>
                  <button className="w-32 p-4 rounded-2xl flex justify-center items-center">
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


export default Serv