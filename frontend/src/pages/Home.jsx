// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaUserTie, FaDog, FaCalendarAlt, FaMoneyCheckAlt, 
  FaFileInvoice, FaStethoscope, FaChartBar, FaPlus, FaCog 
} from 'react-icons/fa';
import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/Modal';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [stats, setStats] = useState({});
    const navigate = useNavigate();
    const { user, isAdmin, isEmployee, hasRouteAccess } = useAuth();

    useEffect(() => {
        // Aquí se cargarían las estadísticas desde el backend
        setStats({
            totalUsers: 150,
            totalEmployees: 25,
            totalPets: 300,
            totalReservations: 45,
            totalPayments: 120,
            totalInvoices: 89
        });
    }, []);

    const getDashboardCards = () => {
        const cards = [
            {
                title: "Usuarios",
                value: stats.totalUsers || 0,
                icon: <FaUsers className="text-blue-500" />,
                color: "bg-blue-50 border-blue-200",
                route: "/users",
                show: hasRouteAccess('users')
            },
            {
                title: "Empleados",
                value: stats.totalEmployees || 0,
                icon: <FaUserTie className="text-green-500" />,
                color: "bg-green-50 border-green-200",
                route: "/employees",
                show: hasRouteAccess('employees')
            },
            {
                title: "Mascotas",
                value: stats.totalPets || 0,
                icon: <FaDog className="text-purple-500" />,
                color: "bg-purple-50 border-purple-200",
                route: "/pets",
                show: hasRouteAccess('pets')
            },
            {
                title: "Reservas",
                value: stats.totalReservations || 0,
                icon: <FaCalendarAlt className="text-orange-500" />,
                color: "bg-orange-50 border-orange-200",
                route: "/reservations",
                show: hasRouteAccess('reservations')
            },
            {
                title: "Pagos",
                value: stats.totalPayments || 0,
                icon: <FaMoneyCheckAlt className="text-green-500" />,
                color: "bg-green-50 border-green-200",
                route: "/payments",
                show: hasRouteAccess('payments')
            },
            {
                title: "Facturas",
                value: stats.totalInvoices || 0,
                icon: <FaFileInvoice className="text-red-500" />,
                color: "bg-red-50 border-red-200",
                route: "/invoices",
                show: hasRouteAccess('invoices')
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
                title: "Nueva Reserva",
                icon: <FaCalendarAlt />,
                action: () => navigate('/reservations'),
                show: hasRouteAccess('reservations')
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
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                            <div className="text-3xl">
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Acciones Rápidas */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3"
                        >
                            <div className="text-blue-500 text-xl">
                                {action.icon}
                            </div>
                            <span className="font-medium text-gray-700">{action.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mensaje de bienvenida para usuarios normales */}
            {!isAdmin() && !isEmployee() && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-center">
                        <img
                            src={perritosImage}
                            alt="Perritos"
                            className="w-32 h-32 object-contain mr-6"
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                ¡Bienvenido a PetLand!
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Tu mascota es importante para nosotros 🐾, porque su felicidad es nuestra prioridad. 
                                Cuidamos de ellas con amor y la atención que merecen tus compañeros más fieles.
                            </p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                            >
                                Añade tu mascota
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para añadir mascota */}
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
