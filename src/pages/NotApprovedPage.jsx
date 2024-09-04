import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotApprovedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">Acceso Denegado</h1>
      <p className="text-lg mt-4">Su cuenta aún no ha sido aprobada. Por favor, contacte al administrador.</p>
      <p className="text-lg font-semibold mt-2">Correo: maycol71@live.com</p>
      <button 
        onClick={handleGoHome} 
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Volver a Inicio
      </button>
    </div>
  );
};

export default NotApprovedPage;

