import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">Bienvenido al Sistema de Gestión de Dispositivos</h1>
      <p className="text-xl md:text-2xl mb-6 text-center">
        Este software le permite registrar, buscar y gestionar dispositivos perdidos o robados.
      </p>
      <div className="space-y-4">
       {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="inline-block mr-5 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              Regístrese aquí
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/devices"
              className="inline-block mr-5 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              Ir a Dispositivos
            </Link>
            <button
              onClick={handleLogout}
              className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
