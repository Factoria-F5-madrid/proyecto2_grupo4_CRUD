import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserAlt, FaCog, FaCalendarAlt, FaBars, FaTimes, FaPlus,
  FaMoneyCheckAlt, FaStethoscope, FaFileInvoice, FaEnvelope,
  FaDog, FaClipboardList, FaPaw
} from "react-icons/fa";
import Modal from "./Modal"; 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <div className={`${isOpen ? "w-72" : "w-20"} bg-[#1c1f26] text-white duration-300 flex flex-col justify-between`}>

    {/* Header / Logo */}
      <div>
        <div className="flex items-center justify-between p-6">
          {isOpen && <img src="../../src/assets/petLand-sinFondo.png" alt="Logo" className="h-8" />}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Add section */}
        <div className="px-6 mb-6">
          <p className="text-sm text-gray-300 mb-2">Your Pets</p>
          <button 
          onClick={() => setShowModal(true)}
          className="w-full py-2 bg-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600">
            <FaPlus /> {isOpen && "Add new"}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2 px-6">
          <SidebarLink icon={<FaClipboardList />} label="Dashboard" to="/home" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaEnvelope />} label="Contact Us" to="/contact" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaCalendarAlt />} label="Reservations" to="/reservations" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaDog />} label="Pets" to="/pets" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaStethoscope />} label="Medical History" to="/medicalhistory" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaMoneyCheckAlt />} label="Payments" to="/payments" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaFileInvoice />} label="Invoices" to="/invoices" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaUserAlt />} label="Account" to="/account" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaCog />} label="Settings" to="/settings" isOpen={isOpen} navigate={navigate} />
          <SidebarLink icon={<FaPaw />} label="Service" to="/serv" isOpen={isOpen} navigate={navigate} />
        </nav>
      </div>

      {/* Footer user preview */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gray-800">
        <img
          src="https://placehold.co/40x40"
          className="rounded-full border border-gray-500"
          alt="User"
        />
        {isOpen && (
          <div>
            <p className="text-sm text-gray-300">Hello</p>
            <p className="text-lg font-semibold text-white">YEDER</p>
          </div>
        )}
      </div>
    </div>
      {showModal && <Modal onClose={() => setShowModal(false)} /> }
        </>

  );
}

function SidebarLink({ icon, label, to, isOpen, navigate }) {
  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-3 text-sm py-2 px-3 rounded hover:bg-gray-700 transition w-full text-left"
    >
      <span>{icon}</span>
      {isOpen && <span>{label}</span>}
    </button>
  );
}
