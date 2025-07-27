import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaUserTie, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { getAllEmployees, deleteEmployee } from '../services/employeeServices';
import { useAuth } from '../context/AuthContext';
import ModalEmployee from '../components/Nav/ModalEmployee';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      try {
        await deleteEmployee(employeeId);
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone_number?.toString().includes(searchTerm) ||
    employee.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <h1 className="text-4xl font-bold mb-1">Gestión de Empleados</h1>
        <p className="text-sm">Administra todos los empleados de PetLand</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empleados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabla de empleados */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Empleado</th>
              <th className="px-6 py-3 text-left">Teléfono</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Departamento</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredEmployees.map((employee) => (
              <tr key={employee.employee_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#edad06] text-white flex items-center justify-center rounded-full font-bold uppercase">
                    {employee.first_name[0]}{employee.last_name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {employee.first_name} {employee.last_name}
                    </div>
                    <div className="text-xs text-gray-500">ID: {employee.employee_id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-2" />
                    {employee.phone_number}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    {employee.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{employee.specialty || 'No asignado'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {hasPermission('update_employee') && (
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {hasPermission('delete_employee') && (
                      <button
                        onClick={() => handleDelete(employee.employee_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* Modal */}
      <ModalEmployee
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedEmployee(null);
        }}
        onSuccess={loadEmployees}
        selectedUser={selectedEmployee}
      />
    </div>
  );
}
