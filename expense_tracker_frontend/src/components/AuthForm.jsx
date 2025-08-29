import { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setFormData({ userName: '', email: '', password: '' });
        setErrorMsg('');
        setSuccessMsg('');
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            if (isSignUp) {
                const response = await axios.post('http://localhost:8081/mywallet/auth/signup', formData);
                console.log(response.data);
                setSuccessMsg('Signup successful! Please check your email for verification.');
            } else {
                const response = await axios.post('http://localhost:8081/mywallet/auth/signin', {
                    email: formData.email,
                    password: formData.password,
                });
                console.log(response.data);
                setSuccessMsg('Login successful! Redirecting...');
                // You can redirect here after success
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800">
                {isSignUp ? 'Create your Account' : 'Welcome Back'}
            </h2>
            {errorMsg && <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{errorMsg}</div>}
            {successMsg && <div className="p-2 text-sm text-green-600 bg-green-100 rounded">{successMsg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                    <div>
                        <label className="block mb-1 text-gray-600">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                )}
                <div>
                    <label className="block mb-1 text-gray-600">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-600">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 font-semibold text-white rounded-md ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
            </form>

            <div className="text-center text-sm text-gray-500">
                {isSignUp ? 'Already registered?' : "Don't have an account?"}
                <button
                    onClick={toggleForm}
                    className="ml-1 font-semibold text-blue-600 hover:underline"
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
