import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserAlt, FaCog, FaCalendarAlt, FaBars, FaTimes,
  FaMoneyCheckAlt, FaStethoscope, FaFileInvoice,
  FaDog, FaClipboardList, FaSignOutAlt, FaUsers, FaUserTie, FaClipboard
} from "react-icons/fa";
import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext"; 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout, hasRouteAccess, isAdmin, isEmployee, isUser } = useAuth();

  // Configuración de navegación basada en roles
  const getNavigationItems = () => {
    const items = [
      {
        icon: <FaClipboardList />,
        label: "Dashboard",
        to: "/home",
        show: true // Todos los roles pueden ver dashboard
      },
      {
        icon: <FaUsers />,
        label: "Usuarios",
        to: "/users",
        show: hasRouteAccess('users') && isAdmin() // Solo admin puede ver usuarios
      },
      {
        icon: <FaUserTie />,
        label: "Empleados",
        to: "/employees",
        show: hasRouteAccess('employees') && isAdmin() // Solo admin puede ver empleados
      },
      {
        icon: <FaDog />,
        label: "Mascotas",
        to: "/pets",
        show: hasRouteAccess('pets') // Todos los roles pueden ver mascotas (con filtros por usuario)
      },
      {
        icon: <FaCalendarAlt />,
        label: "Reservas",
        to: "/reservations",
        show: hasRouteAccess('reservations') && (isAdmin() || isEmployee()) // Solo admin y employee ven reservas
      },
      {
        icon: <FaStethoscope />,
        label: "Historial Médico",
        to: "/medicalhistory",
        show: hasRouteAccess('medical_history') // Todos los roles pueden ver historial médico (con filtros por usuario)
      },
      {
        icon: <FaMoneyCheckAlt />,
        label: "Pagos",
        to: "/payments",
        show: hasRouteAccess('payments') && (isAdmin() || isEmployee()) // Solo admin y employee ven pagos
      },
      {
        icon: <FaFileInvoice />,
        label: "Facturas",
        to: "/invoices",
        show: hasRouteAccess('invoices') // Todos los roles pueden ver facturas (con filtros por usuario)
      },
      {
        icon: <FaClipboard />,
        label: "Servicios",
        to: "/services",
        show: isUser() // Solo usuarios regulares ven servicios
      },
      {
        icon: <FaUserAlt />,
        label: "Cuenta",
        to: "/account",
        show: true // Siempre visible
      },
      {
        icon: <FaCog />,
        label: "Configuración",
        to: "/settings",
        show: hasRouteAccess('settings') && isAdmin() // Solo admin puede ver configuración
      }
    ];

    return items.filter(item => item.show);
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`${isOpen ? "w-72" : "w-20"} bg-[#1c1f26] text-white duration-300 flex flex-col justify-between`}>

    
      <div>
        <div className="flex items-center justify-between p-6">
          {isOpen && <img src="../../src/assets/petLand-sinFondo.png" alt="Logo" className="h-8" />}
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

    
      <div className="flex items-center gap-3 px-6 py-4 bg-gray-800">
        <img
          src="https://placehold.co/40x40"
          className="rounded-full border border-gray-500"
          alt="User"
        />
        {isOpen && (
          <div className="flex-1">
            <p className="text-sm text-gray-300">
              {user?.role === 'admin' ? 'Administrador' : 
               user?.role === 'employee' ? 'Empleado' : 'Usuario'}
            </p>
            <p className="text-lg font-semibold text-white">
              {user ? `${user.first_name || user.email} ${user.last_name || ''}` : 'Guest'}
            </p>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-1"
            >
              <FaSignOutAlt size={12} />
              Logout
            </button>
          </div>
        )}
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
