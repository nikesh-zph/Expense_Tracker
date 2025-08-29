import React from 'react';
import { Link } from 'react-router-dom'; // assuming you will use react-router later

const Homepage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 bg-white shadow-md">
                <div className="text-2xl font-bold text-green-600">
                    MeroKhata
                </div>
                <div className="flex space-x-4">
                    {/* Login Button */}
                    <Link to="/login">
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                            Login
                        </button>
                    </Link>
                    {/* Sign Up Button */}
                    <Link to="/signup">
                        <button className="px-4 py-2 bg-white border border-green-500 hover:bg-green-100 text-green-600 rounded-md">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center flex-grow text-center p-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Track Your Expenses Effortlessly
                </h1>
                <p className="mt-4 text-gray-600 max-w-xl">
                    MeroKhata helps you manage your daily expenses and savings with ease. Stay on top of your finances and achieve your goals faster.
                </p>
                <div className="mt-8">
                    <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg">
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                        Why Choose MeroKhata?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-green-600 mb-2">Simple Tracking</h3>
                            <p className="text-gray-600">
                                Quickly log your expenses daily and visualize where your money goes.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-green-600 mb-2">Insightful Reports</h3>
                            <p className="text-gray-600">
                                View beautiful charts and reports to better plan your financial future.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-green-600 mb-2">Secure and Private</h3>
                            <p className="text-gray-600">
                                Your financial data is encrypted and secured for complete peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-600 text-white text-center py-6 mt-10">
                <p>&copy; 2025 MeroKhata. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
