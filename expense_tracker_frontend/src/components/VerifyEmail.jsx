import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!code) {
            toast.error('Please enter the verification code.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/mywallet/auth/signup/verify?code=${code}`, {
                method: 'GET',
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Email verified successfully! Please log in.');
                navigate('/login');
            } else {
                toast.error(data.message || 'Verification failed.');
            }
        } catch (error) {
            toast.error('An error occurred during verification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Verify Your Email</h2>

                <div className="mb-4">
                    <label htmlFor="code" className="block text-gray-300 font-semibold mb-2">
                        Verification Code
                    </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your verification code"
                    />
                </div>

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${
                        loading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
