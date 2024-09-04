import React, { useState } from 'react';
import api from '../utils/api';

const SearchDevice = () => {
  const [imei, setImei] = useState('');
  const [device, setDevice] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/devices/search/${imei}`);
      if (response.data) {
        setDevice(response.data.device);
        console.log(response.data.device);
        setError('');
      } else {
        setDevice(null);
        setError('No se encontró ningún dispositivo con ese IMEI.');
      }
    } catch (err) {
      setError('Error al buscar el dispositivo. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Buscar Dispositivo por IMEI</h2>
      <form 
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl box-border"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Ingresa el IMEI"
          required
          className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300"
        >
          Buscar
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {device && (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl mt-8 box-border">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Información del Dispositivo:</h3>
          <div className="space-y-4">
            <p><strong>Modelo:</strong> {device.modelo}</p>
            <p><strong>Color:</strong> {device.color}</p>
            <p><strong>IMEI:</strong> {device.imei}</p>
            <p><strong>Recompensa:</strong> {device.recompensa}</p>
            <p><strong>Descripción:</strong> {device.descripcion}</p>
            <div>
              <p className="font-bold">Registrado Por:</p>
              <ul className="list-disc list-inside">
                <li><strong>Nombre y Apellido:</strong> {device.usuario ? `${device.usuario.nombre} ${device.usuario.apellido}` : 'Información no disponible'}</li>
                <li><strong>Usuario y Teléfono:</strong> {device.usuario ? `${device.usuario.usuario} - ${device.usuario.telefonoTienda}` : 'Información no disponible'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDevice;
