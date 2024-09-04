// src/components/UpdateDeviceStatusForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const UpdateDeviceStatusForm = () => {
    const { id } = useParams(); // Obtiene el ID del equipo de la URL
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeviceStatus = async () => {
            try {
                const response = await api.get(`/device/${id}`);
                setStatus(response.data.device.status);
            } catch (error) {
                console.error('Error fetching device status:', error);
                setError('Failed to fetch device status');
            }
        };

        fetchDeviceStatus();
    }, [id]);

    const handleStatusChange = async (e) => {
        e.preventDefault();

        try {
            const response = await api.patch(`/device/${id}/status`, { status });
            setSuccess('Device status updated successfully');
            navigate('/devices'); // Redirige a la lista de dispositivos
        } catch (error) {
            console.error('Error updating device status:', error);
            setError('Failed to update device status');
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleStatusChange}>
                <label className="block mb-4">
                    <span className="text-gray-700">Current Status:</span>
                    <select
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="lost">Lost</option>
                        <option value="recovered">Recovered</option>
                        {/* Agrega más estados según sea necesario */}
                    </select>
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default UpdateDeviceStatusForm;
