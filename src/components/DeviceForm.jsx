import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceFormModal from './DeviceFormModal';
import api from '../utils/api';

const DeviceFormTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    modelo: '',
    color: '',
    imei: '',
    recompensa: '',
    descripcion: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { modelo, color, imei, recompensa, descripcion } = formData;
    if (!modelo || !color || !imei || !recompensa || !descripcion) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await api.post('/devices/register', formData);
      setSuccess('Dispositivo registrado con éxito.');
      setFormData({
        modelo: '',
        color: '',
        imei: '',
        recompensa: '',
        descripcion: '',
      });
      setError('');
      setTimeout(() => {
        setIsModalOpen(false); // Cierra el modal después de un registro exitoso
      }, 500); // Espera 500ms para mostrar el mensaje de éxito antes de cerrar el modal
    } catch (error) {
      console.error('Error registrando dispositivo:', error);
      setError('Error registrando el dispositivo.');
    }
  };

  const handleViewDevices = () => {
    navigate('/my-devices'); // Redirige a la página de los dispositivos registrados por el usuario
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="w-full max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Registrar Dispositivo Nuevo
      </button>
      <button 
        onClick={handleViewDevices} 
        className="w-full max-w-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Ver Mis Dispositivos
      </button>
      <DeviceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        success={success}
      />
    </div>
  );
};

export default DeviceFormTrigger;
