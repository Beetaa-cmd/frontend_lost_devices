import React from 'react';
import Navbar from '../components/Navbar';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api'; 
import { useNavigate } from 'react-router-dom';
import BancoPopularLogo from '../assets/banco-popular.png';
import BancoBHDLogo from '../assets/banco-bhd.png';
import BancoReservasLogo from '../assets/banco-reservas.png';
import ApapLogo from '../assets/apap.png';
import QikLogo from '../assets/qik.jpg';

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/18297280569', '_blank');
    };

    const handlePaymentSuccess = async (userId) => {
        try {
            await api.patch(`/payment/${userId}/paid`);
            const user = JSON.parse(localStorage.getItem('user')) || {};
            user.hasPaid = true;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/login');
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Complete su Pago</h1>
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                    <p className="text-lg mb-4">Para continuar usando el software, por favor realice un pago de:</p>
                    <div className="text-3xl font-bold text-green-600 mb-6">DOP 500.00</div>

                    <p className="text-lg font-bold text-gray-800 mb-4">Beneficiario: Maicol Jose Cabrera</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                            <img src={BancoPopularLogo} alt="Banco Popular" className="h-12 w-auto mr-2" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-800">Banco Popular:</p>
                                <p className="text-sm text-gray-600">803935550</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={BancoBHDLogo} alt="Banco BHD León" className="h-12 w-auto mr-2" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-800">Banco BHD León:</p>
                                <p className="text-sm text-gray-600">33187220016</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={BancoReservasLogo} alt="Banco de Reservas" className="h-12 w-auto mr-2" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-800">Banco de Reservas:</p>
                                <p className="text-sm text-gray-600">9607061731</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={ApapLogo} alt="APAP" className="h-12 w-auto mr-2" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-800">APAP:</p>
                                <p className="text-sm text-gray-600">1019588241</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-6">
                        <img src={QikLogo} alt="Quik" className="h-12 w-auto mr-2" />
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-800">Quik:</p>
                            <p className="text-sm text-gray-600">1002739085</p>
                        </div>
                    </div>

                    <p className="text-lg mb-6">Una vez realizado el pago, envíe un mensaje por WhatsApp con el comprobante para activar su cuenta.</p>
                    <button 
                        onClick={handleWhatsAppClick} 
                        className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full animate-bounce"
                    >
                        <FaWhatsapp className="text-2xl mr-2" />
                        Iniciar Chat en WhatsApp
                    </button>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
