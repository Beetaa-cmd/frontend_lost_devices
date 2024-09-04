// src/pages/UpdateDeviceStatusPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import UpdateDeviceStatusForm from '../components/UpdateDeviceStatusForm';

const UpdateDeviceStatusPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Device Status</h1>
                <UpdateDeviceStatusForm />
            </div>
        </>
    );
};

export default UpdateDeviceStatusPage;
