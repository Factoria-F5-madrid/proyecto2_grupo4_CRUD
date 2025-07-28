import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUserTie, FaUser, FaEye } from 'react-icons/fa';
import {
  getAllUsers,
  getUserByID,
  deleteUser,
} from '../services/userServices';
import {
  getAllEmployees,
  getEmployeeByID,
  deleteEmployee,
} from '../services/employeeServices';
import { useAuth } from '../context/AuthContext';
import ModalUsers from '../components/Nav/ModalUsers';
import ModalEmployee from '../components/Nav/ModalEmployee';
import FormViewUser from '../components/Forms/FormViewUser';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { hasPermission, user } = useAuth();

  console.log('Estado del usuario:', user);
  console.log('Permisos del usuario:', user?.permissions);
  console.log('¿Tiene permiso create_user?:', hasPermission('create_user'));
  console.log('¿Tiene permiso read_user?:', hasPermission('read_user'));

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('Cargando usuarios y empleados...');
      
      
      const userData = await getAllUsers();
      console.log('Datos de usuarios recibidos:', userData);

      const normalizedUsers = userData.map((user) => ({
        ...user,
        user_id: `usr-${user.user_id}`,
        role: user.role || 'user',
        type: 'user',
      }));

     
      let normalizedEmployees = [];
      try {
        const employeeData = await getAllEmployees();
        console.log('Datos de empleados recibidos:', employeeData);
        
        normalizedEmployees = employeeData.map((emp) => ({
          ...emp,
          user_id: `emp-${emp.employee_id}`,
          role: emp.role || 'employee',
          type: 'employee',
        }));
      } catch (employeeError) {
        console.error('Error cargando empleados:', employeeError);
        
      }

      const allUsers = [...normalizedUsers, ...normalizedEmployees];
      console.log('Usuarios normalizados:', allUsers);
      
      setUsers(allUsers);
    } catch (error) {
      console.error('Error al cargar usuarios y empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (user) => {
    const realId = parseInt(user.user_id.replace(/^(usr|emp)-/, ''));

    try {
      const data =
        user.type === 'employee'
          ? await getEmployeeByID(realId)
          : await getUserByID(realId);

      setSelectedUser({
        ...data,
        user_id: user.user_id,
        type: user.type,
      });

      setShowViewModal(true);
    } catch (error) {
      console.error('Error al obtener datos para ver:', error);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;
    const realId = parseInt(user.user_id.replace(/^(usr|emp)-/, ''));

    try {
      if (user.type === 'employee') {
        await deleteEmployee(realId);
      } else {
        await deleteUser(realId);
      }
      await loadUsers();
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  };

  const handleEdit = async (user) => {
    const realId = parseInt(user.user_id.replace(/^(usr|emp)-/, ''));

    try {
      const data =
        user.type === 'employee'
          ? await getEmployeeByID(realId)
          : await getUserByID(realId);

      setSelectedUser({
        ...data,
        user_id: user.user_id,
        type: user.type,
      });

      if (user.type === 'employee') {
        setShowModalEmployee(true);
      } else {
        setShowModalUser(true);
      }
    } catch (error) {
      console.error('Error al obtener datos para editar:', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const search = searchTerm.trim().toLowerCase();
    return (
      fullName.includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phone_number?.toString().includes(search) ||
      user.role?.toLowerCase().includes(search)
    );
  });

  const getRoleBadge = (role) => {
    const base = 'px-3 py-1 text-white rounded-full text-xs font-semibold';
    if (role === 'admin') {
      return (
        <span className={`${base} bg-red-500`}>
          <FaUserTie className="inline mr-1" /> Administrador
        </span>
      );
    }
    if (role === 'employee') {
      return (
        <span className={`${base} bg-purple-500`}>
          <FaUserTie className="inline mr-1" /> Empleado
        </span>
      );
    }
    return (
      <span className={`${base} bg-green-500`}>
        <FaUser className="inline mr-1" /> Usuario
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <h1 className="text-4xl font-bold mb-1">Gestión de Usuarios</h1>
        <p className="text-sm">Administra todos los usuarios del sistema de manera eficiente</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {hasPermission('create_user') && (
          <button
            onClick={() => setShowModalUser(true)}
            className="bg-[#edad06] hover:bg-yellow-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
          >
            <FaPlus /> Nuevo Usuario
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Usuario</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Teléfono</th>
              <th className="px-6 py-3 text-left">Rol</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {console.log('Renderizando usuarios filtrados:', filteredUsers)}
            {filteredUsers.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#edad06] text-white flex items-center justify-center rounded-full font-bold uppercase">
                    {user.first_name[0]}{user.last_name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-xs text-gray-500">ID: {user.user_id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-gray-700">{user.phone_number}</td>
                <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {hasPermission('read_user') && (
                      <button
                        onClick={() => handleView(user)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <FaEye />
                      </button>
                    )}
                    {hasPermission('update_user') && (
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {hasPermission('delete_user') && (
                      <button
                        onClick={() => handleDelete(user)}
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


      <ModalUsers
        isOpen={showModalUser}
        onClose={() => {
          setShowModalUser(false);
          setSelectedUser(null);
        }}
        onSuccess={loadUsers}
        selectedUser={selectedUser?.type === 'user' ? selectedUser : null}
      />

      <ModalEmployee
        isOpen={showModalEmployee}
        onClose={() => {
          setShowModalEmployee(false);
          setSelectedUser(null);
        }}
        onSuccess={loadUsers}
        selectedUser={selectedUser?.type === 'employee' ? selectedUser : null}
      />

   
      {showViewModal && selectedUser && (
        <FormViewUser
          user={selectedUser}
          onClose={() => {
            setShowViewModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
