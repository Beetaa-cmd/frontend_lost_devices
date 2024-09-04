import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await api.get('/devices/my-devices');
                setDevices(response.data.devices);
            } catch (error) {
                setError('Error al obtener los dispositivos');
            }
        };

        fetchDevices();
    }, []);

    const handleStatusChange = async (deviceId, newStatus) => {
        try {
            await api.patch(`/devices/device/${deviceId}/status`, { status: newStatus });
            setDevices(devices.map(device => 
                device._id === deviceId ? { ...device, status: newStatus } : device
            ));
        } catch (error) {
            setError('Error al actualizar el estado del dispositivo');
        }
    };

    const handleDeleteDevice = async (deviceId) => {
        try {
            await api.delete(`/devices/device/${deviceId}`);
            setDevices(devices.filter(device => device._id !== deviceId));
        } catch (error) {
            setError('Error al eliminar el dispositivo');
            console.error('Error al eliminar el dispositivo:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Mis Dispositivos</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="divide-y divide-gray-300">
                {devices.map(device => (
                    <li key={device._id} className="py-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="flex-grow mb-4 md:mb-0">
                                <p className="text-lg font-semibold"><strong>Modelo:</strong> {device.modelo}</p>
                                <p className="text-lg"><strong>IMEI:</strong> {device.imei}</p>
                                <p className="text-lg"><strong>Estado:</strong> {device.status}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button 
                                    className={`font-bold py-2 px-4 rounded ${device.status === 'entregado' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                    onClick={() => handleStatusChange(device._id, 'entregado')}
                                    disabled={device.status === 'entregado'}
                                >
                                    Marcar como Entregado
                                </button>
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDeleteDevice(device._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceList;
