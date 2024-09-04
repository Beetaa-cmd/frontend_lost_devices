import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      // Verifica si el usuario ha sido aprobado pero aún no ha pagado
      // if (user.isApproved && !user.hasPaid) {
      //   sessionStorage.setItem('userId', user._id); // Asegúrate de usar sessionStorage
      //   console.log('Redirigiendo a la página de pago');
      //   navigate('/payment');
      //   return;
      // }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setSuccess('Inicio de sesión exitoso.');
      navigate('/devices');
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 403) {
        navigate('/not-approved');
        
      } else if (error.response && error.response.status === 402) {
        setError('Payment required. Please complete the payment process.');
        // navigate('/payment');      

      } else {
        setError('Credenciales inválidas.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md box-border' onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          type="text"
          name="correo"
          placeholder="Usuario"
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
