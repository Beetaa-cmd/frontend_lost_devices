import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.isAdmin === true;
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 text-white font-medium">
          <li><Link className="hover:text-gray-400" to="/">Inicio</Link></li>
          {isLoggedIn && (
            <>
              <li><Link className="hover:text-gray-400" to="/devices">Dispositivos</Link></li>
              {isAdmin && <li><Link className="hover:text-gray-400" to="/user-approval">Aprobar Usuarios</Link></li>}
            </>
          )}
          {!isLoggedIn ? (
            <li><Link className="hover:text-gray-400" to="/login">Iniciar Sesión</Link></li>
          ) : (
            <li><button onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}>Cerrar Sesión</button></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
