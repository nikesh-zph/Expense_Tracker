import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/mywallet/user/settings/profile?email=${email}`);
                if (response.data.status === 'SUCCESS') {
                    setProfile(response.data.response);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (email) fetchProfile();
    }, [email]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleChangePassword = () => navigate('/reset-password');

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUploadImageClick = () => fileInputRef.current?.click();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("email", email);

        try {
            const response = await axios.post(`http://localhost:8081/mywallet/user/settings/profileImg`, formData);
            if (response.data.status === 'SUCCESS') {
                setProfile(prev => ({
                    ...prev,
                    image: response.data.response.image,
                }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleDeleteImage = async () => {
        try {
            const response = await axios.delete(`http://localhost:8081/mywallet/user/settings/profileImg`);
            if (response.data.status === 'SUCCESS') {
                setProfile(prev => ({ ...prev, image: null }));
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const renderAvatar = () => {
        const avatarSize = "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"; // Responsive sizes

        if (profile?.image) {
            return (
                <img
                    src={`data:image/png;base64,${profile.image}`}
                    alt="Profile"
                    className={`${avatarSize} rounded-full border-2 border-blue-500 object-cover shadow-md`}
                />
            );
        } else {
            const initials = `${profile?.firstName?.[0] || ''}${profile?.lastName?.[0] || ''}`.toUpperCase();
            return (
                <div className={`${avatarSize} rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl shadow-md border-2 border-white`}>
                    {initials}
                </div>
            );
        }
    };

    return (
        <div className="fixed top-3 right-3 sm:top-4 sm:right-6 md:top-5 md:right-8 z-50" ref={dropdownRef}>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
            />

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="focus:outline-none transition-transform duration-200 hover:scale-105"
                >
                    {renderAvatar()}
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 sm:w-64 md:w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl py-3 transition-all duration-200">
                        <div className="px-4 pb-3 border-b border-gray-100 dark:border-gray-700 mb-2">
                            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white truncate">
                                {profile?.firstName} {profile?.lastName}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{email}</p>
                        </div>

                        <button
                            onClick={handleUploadImageClick}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm sm:text-base text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                        >
                            📤 Upload / Change Image
                        </button>

                        {profile?.image && (
                            <button
                                onClick={handleDeleteImage}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm sm:text-base text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 transition"
                            >
                                ❌ Delete Image
                            </button>
                        )}

                        <button
                            onClick={handleChangePassword}
                            className="flex items-center gap-2 w-f ull text-left px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            🔒 Change Password
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm sm:text-base text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 transition"
                        >
                            🚪 Logout
                        </button>


                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
