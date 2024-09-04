import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im'; // Importa un icono de carga
import { FaPhoneAlt } from 'react-icons/fa'; // Importa un ícono de teléfono

const LoginForm = () => {
  const [formData, setFormData] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { correo, contrasena } = formData;

    if (!correo || !contrasena) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); // Activa el estado de loading

    try {
      const response = await api.post('/users/login', formData);
      const { token, user, requiresPayment } = response.data;

      // Verifica si el usuario ha sido aprobado
      if (!user.isApproved) {
        navigate('/not-approved');
        return;
      }

      if (requiresPayment) {
        sessionStorage.setItem('userId', user._id);
        navigate('/payment');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/devices');
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 403) {
        navigate('/not-approved');
      } else if (error.response && error.response.status === 402) {
        setError('Payment required. Please complete the payment process.');
      } else {
        setError('Credenciales inválidas.');
      }
    } finally {
      setLoading(false); // Desactiva el estado de loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md box-border relative"
        onSubmit={handleSubmit}
      >
        {/* Ícono de smartphone */}
        <div className="flex justify-center mb-6">
          <FaPhoneAlt className="w-16 h-16 text-blue-500" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</h2>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
          className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? <ImSpinner2 className="animate-spin mr-2" /> : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
