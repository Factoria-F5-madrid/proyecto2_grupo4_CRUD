import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserAlt, FaCog, FaCalendarAlt, FaBars, FaTimes,
  FaMoneyCheckAlt, FaStethoscope, FaFileInvoice,
  FaDog, FaClipboardList, FaUsers, FaUserTie, FaClipboard,
  FaEnvelope, FaSignInAlt
} from "react-icons/fa";
import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";
import PetLandLogo from "../../assets/petLand-sinFondo.png"; 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout, hasRouteAccess, isAdmin, isEmployee, isUser } = useAuth();

  // Configuración de navegación basada en roles
  const getNavigationItems = () => {
    const items = [
      {
        icon: <FaClipboard />,
        label: "Servicios",
        to: "/services",
        show: true // Todos pueden ver servicios
      },
      {
        icon: <FaEnvelope />,
        label: "Contacto",
        to: "/contact",
        show: true // Siempre visible
      },
      {
        icon: <FaSignInAlt />,
        label: "Login",
        to: "/login",
        show: !user // Solo visible si no hay usuario logueado
      }
    ];

    return items.filter(item => item.show);
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`${isOpen ? "w-72" : "w-20"} bg-[#1c1f26] text-white duration-300 flex flex-col justify-between`}>

    
      <div>
        <div className="flex items-center justify-between p-6">
          {isOpen && <img src={PetLandLogo} alt="Logo" className="h-8" />}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        
        <div className="px-6 mb-6">
          <p className="text-sm text-gray-300 mb-2">
            {isAdmin() ? "Admin Panel" : 
             isEmployee() ? "Employee Panel" : "Mi Panel"}
          </p>
        </div>

        
        <nav className="flex flex-col gap-2 px-6">
          {navigationItems.map((item, index) => (
            <SidebarLink 
              key={index}
              icon={item.icon} 
              label={item.label} 
              to={item.to} 
              isOpen={isOpen} 
              navigate={navigate} 
            />
          ))}
        </nav>
      </div>
    </div>
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
