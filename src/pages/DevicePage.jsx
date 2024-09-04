import React from 'react';
import DeviceForm from '../components/DeviceForm';
import Navbar from '../components/Navbar';
import SearchDevice from '../components/SearchDevice';

const DevicePage = () => {
  return (
    <div className='device-page-container'>
      <Navbar />
      <div className='flex flex-col items-center mt-10 justify-center'>
        <DeviceForm />
        <SearchDevice />
      </div>
    </div>
  );
};

export default DevicePage;
