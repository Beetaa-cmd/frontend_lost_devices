import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DevicePage from './pages/DevicePage';
import UserApprovalPage from './pages/UserApprovalPage';
import NotApprovedPage from './pages/NotApprovedPage';
import PaymentPage from './pages/PaymentPage';
import UpdateDeviceStatusPage from './pages/UpdateDeviceStatusPage';
import MyDevicesPage from './pages/MyDevicesPage'; 


const App = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Router>
        <Routes basename="/">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/devices" element={<DevicePage />} />
          <Route path="/user-approval" element={<UserApprovalPage />} />
          <Route path="/not-approved" element={<NotApprovedPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/update-device-status/:id" element={<UpdateDeviceStatusPage />} />
          <Route path="/my-devices" element={<MyDevicesPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
