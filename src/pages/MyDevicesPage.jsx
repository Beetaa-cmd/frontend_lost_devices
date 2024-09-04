// src/pages/MyDevicesPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import DeviceList from '../components/DeviceList';

const MyDevicesPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <DeviceList />
            </div>
        </>
    );
};

export default MyDevicesPage;
