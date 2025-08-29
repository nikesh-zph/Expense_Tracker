import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BellIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return new Date(timestamp).toLocaleDateString();
};

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [panelOpen, setPanelOpen] = useState(false);
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/notifications/${email}`);
                setNotifications(res.data.response || []);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };

        if (email) fetchNotifications();
    }, [email]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = async (id) => {
        try {
            await axios.post(`http://localhost:8081/api/notifications/mark-read/${id}`);
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, read: true } : n))
            );
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post(`http://localhost:8081/api/notifications/mark-all-read/${email}`);
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const renderIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'alert': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
            case 'success': return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
            case 'info': return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
            default: return <BellIcon className="w-5 h-5 rounded-l-md text-white" />;
        }
    };

    return (
        <>
            {/* Bell Icon - Always fixed in top right */}
            <div className="fixed top-4 right-6 z-50">
                <button
                    onClick={() => setPanelOpen(true)}
                    className="relative focus:outline-none transition-transform hover:scale-105"
                >
                    <BellIcon className="w-8 h-8 text-white" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-1.5 font-semibold shadow-md">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Overlay */}
            {panelOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={() => setPanelOpen(false)}
                />
            )}

            {/* Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-2xl border-l border-gray-700 transform transition-transform duration-300 ease-in-out z-50
                ${panelOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{ width: "90%", maxWidth: "400px" }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <span className="font-bold text-lg">Notifications</span>
                    <div className="flex items-center gap-3">
                        <button
                            className="text-blue-400 text-sm hover:underline"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </button>
                        <XMarkIcon
                            className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => setPanelOpen(false)}
                        />
                    </div>
                </div>

                {/* List */}
                <ul className="max-h-[calc(100%-60px)] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <li className="p-5 text-gray-500 text-center">No notifications</li>
                    ) : (
                        notifications.map((n) => (
                            <li
                                key={n.id}
                                className={`flex gap-3 items-start px-4 py-3 hover:bg-gray-800 cursor-pointer transition-all ${
                                    !n.read ? 'bg-gray-800/80' : ''
                                }`}
                                onClick={() => markAsRead(n.id)}
                            >
                                <div className="pt-1">{renderIcon(n.type)}</div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{n.message}</p>
                                    <p className="text-xs text-gray-400">{formatTimeAgo(n.timestamp)}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default NotificationBell;
