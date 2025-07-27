import React, { useState, useEffect } from 'react';
import { getUserByID, createUser, updateUser } from '../services/userServices';
import Modal from './Modal';

const Account = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);

  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:8000/users', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUserId(data.user_id);
          } else {
            localStorage.removeItem('token');
            setIsModalOpen(true); // Forzar login o creación
          }
        } catch (error) {
          console.error('Error al obtener usuario actual:', error);
          localStorage.removeItem('token');
          setIsModalOpen(true);
        }
      } else {
        setIsModalOpen(true); // Mostrar modal si no hay token
      }
    };
    fetchCurrentUser();
  }, []);

  // Cargar datos del usuario
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const data = await getUserByID(userId);
          setUser(data);
        } catch (error) {
          if (error.response?.status === 401) {
            console.error('Sesión expirada, por favor inicia sesión de nuevo');
            localStorage.removeItem('token');
            setIsModalOpen(true);
          } else {
            setIsModalOpen(true); // Mostrar modal para crear usuario
          }
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSave = async (formData) => {
    if (!user) {
      await createUser(formData);
    } else if (isEditing) {
      await updateUser(userId, formData);
    }
    setIsModalOpen(false);
    setIsEditing(false);
    const updatedUser = await getUserByID(userId);
    setUser(updatedUser);
  };

  if (!userId) return <div>Inicia sesión para continuar...</div>;
  if (!user && !isModalOpen) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-slate-800 p-4 flex">
      {/* Sidebar (simplificado) */}
      <div className="w-72 h-full bg-gray-900 p-7 flex flex-col items-center">
        <div className="h-24 flex items-center">
          <div className="w-8 h-9 bg-blue-500 mr-2" />
          <div className="text-white">Logo</div>
        </div>
        <div className="flex-1 mt-9">
          <div className="text-zinc-200">Your Profile</div>
          {/* Otros elementos del sidebar */}
        </div>
        <div className="p-3 bg-gray-500 rounded-2xl flex items-center">
          <img src="https://placehold.co/60x60" className="w-14 h-14 rounded-full" />
          <div className="ml-2 text-white">Hola, {user?.first_name}</div>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex-1 ml-4 bg-white rounded-2xl p-7">
        {user ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-700">Perfil de Usuario</h2>
            <div>
              <p>Nombre: {user.first_name} {user.last_name}</p>
              <p>Email: {user.email}</p>
              <p>Teléfono: {user.phone_number}</p>
              <button
                onClick={() => { setIsEditing(true); setIsModalOpen(true); }}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Editar
              </button>
            </div>
          </div>
        ) : (
          <Modal onClose={() => setIsModalOpen(false)} userId={userId} onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default Account;