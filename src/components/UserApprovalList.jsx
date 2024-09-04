import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const UserApprovalList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await api.get('/users/unpaid');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (userId) => {
    try {
      await api.patch(`/users/approve/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, isApproved: true } : user));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const updatePaymentStatus = async (userId) => {
    try {
      await api.patch(`/payment/${userId}/paid`);
      setUsers(users.filter((user) => user._id !== userId)); // Eliminar usuario de la lista después de actualizar el pago
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Eliminar usuario de la lista después de eliminarlo
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h3 className="text-3xl font-extrabold mb-8 text-gray-800">Usuarios Pendientes de Aprobación</h3>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li key={user._id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-700">Usuario: <span className="font-normal">{user.usuario}</span></p>
                <p className="text-lg font-semibold text-gray-700">Nombre: <span className="font-normal">{user.nombre} {user.apellido}</span></p>
                <p className="text-lg font-semibold text-gray-700">Dirección: <span className="font-normal">{user.direccionTienda}</span></p>
                <p className="text-lg font-semibold text-gray-700">Teléfono: <span className="font-normal">{user.telefonoTienda}</span></p>
              </div>
              <div className="flex space-x-2">
                {!user.isApproved && (
                  <button 
                    onClick={() => approveUser(user._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                  >
                    Aprobar
                  </button>
                )}
                {user.isApproved && !user.hasPaid && (
                  <button 
                    onClick={() => updatePaymentStatus(user._id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                  >
                    Actualizar Pago
                  </button>
                )}
                <button 
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserApprovalList;
