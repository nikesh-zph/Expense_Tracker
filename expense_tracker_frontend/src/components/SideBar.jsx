import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaExchangeAlt,
    FaChartPie,
    FaFileAlt,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
            isActive ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-green-700 hover:text-white'
        }`;

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-full shadow-lg"
            >
                <FaBars />
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-72 bg-gray-900 border-r border-green-700 z-40 transform transition-transform duration-300 ease-in-out shadow-lg
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block overflow-y-auto`}
            >
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-4 md:hidden border-b border-green-800">
                    <h2 className="text-xl font-bold text-green-400">Expense Tracker</h2>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-green-400">
                        <FaTimes />
                    </button>
                </div>

                {/* Desktop Header */}
                <h2 className="text-2xl font-bold text-green-400 text-center py-6 border-b border-green-800 hidden md:block">
                    Expense Tracker
                </h2>

                {/* Navigation Links */}
                <nav className="flex flex-col flex-1 px-4 py-6 space-y-2">
                    <NavLink to="/dashboard" className={linkStyle}>
                        <FaTachometerAlt /> Dashboard
                    </NavLink>
                    <NavLink to="/history" className={linkStyle}>
                        <FaExchangeAlt /> Transactions
                    </NavLink>
                    <NavLink to="/newTransaction" className={linkStyle}>
                        <FaExchangeAlt /> New Transactions
                    </NavLink>
                    <NavLink to="/budget" className={linkStyle}>
                        <FaChartPie /> Budget
                    </NavLink>
                    <NavLink to="/saved" className={linkStyle}>
                        <FaChartPie /> Saved Transaction
                    </NavLink>
                    <NavLink to="/setting" className={linkStyle}>
                        <FaCog /> Settings
                    </NavLink>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-green-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all font-medium text-sm"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
