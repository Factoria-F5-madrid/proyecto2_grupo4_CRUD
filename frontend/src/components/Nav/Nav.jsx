import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserAlt, FaCog, FaCalendarAlt, FaBars, FaTimes,
  FaMoneyCheckAlt, FaStethoscope, FaFileInvoice,
  FaDog, FaClipboardList, FaUsers, FaUserTie, FaClipboard,
  FaEnvelope, FaSignInAlt, FaHome, FaChartBar
} from "react-icons/fa";
import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";
import PetLandLogo from "../../assets/petLand-sinFondo.png"; 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasRouteAccess, isAdmin, isEmployee, isUser } = useAuth();

  // Configuración de navegación basada en roles
  const getNavigationItems = () => {
    const items = [];

    // Dashboard - Todos los usuarios
    items.push({
      icon: <FaHome />,
      label: "Dashboard",
      to: "/",
      show: true
    });

    // Servicios - Todos los usuarios
    items.push({
      icon: <FaClipboard />,
      label: "Servicios",
      to: "/services",
      show: true
    });

    // Enlaces específicos para Admin
    if (isAdmin()) {
      items.push(
        {
          icon: <FaUsers />,
          label: "Usuarios",
          to: "/users",
          show: hasRouteAccess('users')
        },
        {
          icon: <FaUserTie />,
          label: "Empleados",
          to: "/employees",
          show: hasRouteAccess('employees')
        }
      );
    }

    // Enlaces para Admin
    if (isAdmin()) {
      items.push(
        {
          icon: <FaDog />,
          label: "Mascotas",
          to: "/pets",
          show: hasRouteAccess('pets')
        },
        {
          icon: <FaCalendarAlt />,
          label: "Reservas",
          to: "/reservations",
          show: hasRouteAccess('reservations')
        },
        {
          icon: <FaStethoscope />,
          label: "Historial Médico",
          to: "/medicalhistory",
          show: hasRouteAccess('medical_history')
        },
        {
          icon: <FaMoneyCheckAlt />,
          label: "Pagos",
          to: "/payments",
          show: hasRouteAccess('payments')
        },
        {
          icon: <FaFileInvoice />,
          label: "Facturas",
          to: "/invoices",
          show: hasRouteAccess('invoices')
        }
      );
    }

    // Enlaces para Employee
    if (isEmployee()) {
      items.push(
        {
          icon: <FaDog />,
          label: "Mascotas",
          to: "/pets",
          show: hasRouteAccess('pets')
        },
        {
          icon: <FaCalendarAlt />,
          label: "Reservas",
          to: "/reservations",
          show: hasRouteAccess('reservations')
        },
        {
          icon: <FaStethoscope />,
          label: "Historial Médico",
          to: "/medicalhistory",
          show: hasRouteAccess('medical_history')
        },
        {
          icon: <FaFileInvoice />,
          label: "Facturas",
          to: "/invoices",
          show: hasRouteAccess('invoices')
        }
      );
    }

    // Enlaces para usuarios regulares
    if (isUser()) {
      items.push(
        {
          icon: <FaDog />,
          label: "Mis Mascotas",
          to: "/pets",
          show: hasRouteAccess('pets')
        },
        {
          icon: <FaStethoscope />,
          label: "Historial Médico",
          to: "/medicalhistory",
          show: hasRouteAccess('medical_history')
        },
        {
          icon: <FaFileInvoice />,
          label: "Mis Facturas",
          to: "/invoices",
          show: hasRouteAccess('invoices')
        }
      );
    }

    // Enlaces comunes para todos
    items.push(
      {
        icon: <FaUserAlt />,
        label: "Mi Cuenta",
        to: "/account",
        show: user
      }
    );

    // Enlaces específicos por rol
    if (!isAdmin() && !isEmployee()) {
      items.push(
        {
          icon: <FaEnvelope />,
          label: "Contacto",
          to: "/contact",
          show: true
        }
      );
    }

    // Login solo si no hay usuario
    if (!user) {
      items.push({
        icon: <FaSignInAlt />,
        label: "Login",
        to: "/login",
        show: true
      });
    }

    return items.filter(item => item.show);
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {user && (
            <div className="text-xs text-gray-400">
              {user.email}
            </div>
          )}
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
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
      </div>

      {/* Botón de logout */}
      {user && (
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm py-2 px-3 rounded hover:bg-red-600 transition w-full text-left text-red-400 hover:text-white"
          >
            <span>🚪</span>
            {isOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      )}
    </div>
  );
}

function SidebarLink({ icon, label, to, isOpen, navigate, isActive }) {
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-3 text-sm py-2 px-3 rounded transition w-full text-left ${
        isActive 
          ? 'bg-yellow-500 text-white' 
          : 'hover:bg-gray-700 text-gray-300 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      {isOpen && <span>{label}</span>}
    </button>
  );
}
