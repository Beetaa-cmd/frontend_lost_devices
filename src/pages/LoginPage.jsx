import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
