// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaUserTie, FaDog, FaCalendarAlt, FaMoneyCheckAlt, 
  FaFileInvoice, FaStethoscope, FaChartBar, FaPlus, FaCog, FaSpinner, FaClipboard
} from 'react-icons/fa';
import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/Modal';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getAdminStats } from '../services/dashboardServices';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, isAdmin, isEmployee, hasRouteAccess } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                console.log("🔍 Iniciando fetchStats en Home...");
                console.log("👤 Usuario actual:", user);
                
                // Usar diferentes servicios según el rol
                let data;
                if (isAdmin() || isEmployee()) {
                    data = await getAdminStats(); // Para admin/employee: reservas
                } else {
                    data = await getDashboardStats(); // Para usuarios: servicios
                }
                
                console.log("✅ Estadísticas obtenidas:", data);
                
                setStats(data);
            } catch (error) {
                console.error("❌ Error obteniendo estadísticas:", error);
                setError("Error al cargar las estadísticas");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user, isAdmin, isEmployee]);

    const getDashboardCards = () => {
        const cards = [
            {
                title: "Mascotas",
                value: stats.totalPets || 0,
                icon: <FaDog className="text-purple-500" />,
                color: "bg-purple-50 border-purple-200",
                route: "/pets",
                show: hasRouteAccess('pets')
            },
            {
                title: isAdmin() || isEmployee() ? "Reservas" : "Servicios",
                value: isAdmin() || isEmployee() ? (stats.totalReservations || 0) : (stats.totalServices || 0),
                icon: isAdmin() || isEmployee() ? <FaCalendarAlt className="text-orange-500" /> : <FaClipboard className="text-green-500" />,
                color: isAdmin() || isEmployee() ? "bg-orange-50 border-orange-200" : "bg-green-50 border-green-200",
                route: isAdmin() || isEmployee() ? "/reservations" : "/services",
                show: isAdmin() || isEmployee() ? hasRouteAccess('reservations') : hasRouteAccess('services')
            },
            {
                title: "Facturas",
                value: stats.totalInvoices || 0,
                icon: <FaFileInvoice className="text-red-500" />,
                color: "bg-red-50 border-red-200",
                route: "/invoices",
                show: hasRouteAccess('invoices')
            },
            {
                title: "Historial Médico",
                value: stats.totalMedicalHistory || 0,
                icon: <FaStethoscope className="text-blue-500" />,
                color: "bg-blue-50 border-blue-200",
                route: "/medicalhistory",
                show: hasRouteAccess('medical_history')
            }
        ];

        return cards.filter(card => card.show);
    };

    const getQuickActions = () => {
        const actions = [
            {
                title: "Añadir Mascota",
                icon: <FaPlus />,
                action: () => setShowModal(true),
                show: hasRouteAccess('pets')
            },
            {
                title: isAdmin() || isEmployee() ? "Nueva Reserva" : "Ver Servicios",
                icon: isAdmin() || isEmployee() ? <FaCalendarAlt /> : <FaClipboard />,
                action: () => navigate(isAdmin() || isEmployee() ? '/reservations' : '/services'),
                show: isAdmin() || isEmployee() ? hasRouteAccess('reservations') : hasRouteAccess('services')
            },
            {
                title: "Historial Médico",
                icon: <FaStethoscope />,
                action: () => navigate('/medicalhistory'),
                show: hasRouteAccess('medical_history')
            },
            {
                title: "Configuración",
                icon: <FaCog />,
                action: () => navigate('/settings'),
                show: hasRouteAccess('settings')
            }
        ];

        return actions.filter(action => action.show);
    };

    const dashboardCards = getDashboardCards();
    const quickActions = getQuickActions();

    if (loading) {
        return (
            <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Cargando dashboard...</p>
                </div>
            </div>
        );
    }
  
  return (
        <div className="flex-1 p-6 bg-gray-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {isAdmin() ? 'Dashboard Administrativo' : 
                             isEmployee() ? 'Panel de Empleado' : 'Bienvenido a PetLand'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isAdmin() ? 'Gestiona todo el sistema desde aquí' :
                             isEmployee() ? 'Accede a las herramientas de gestión' :
                             'Tu mascota es importante para nosotros 🐾'}
                        </p>
                    </div>
      <img
        src={petImage}
                        alt="PetLand Logo"
                        className="w-32 h-12 object-contain"
                    />
                </div>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p>{error}</p>
                </div>
            )}

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {dashboardCards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg border ${card.color} cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => navigate(card.route)}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{card.title}</p>
                                <p className="text-sm text-gray-600 mt-1">Haz click para ver</p>
                            </div>
                            <div className="text-3xl">
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para añadir mascota */}
            {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
