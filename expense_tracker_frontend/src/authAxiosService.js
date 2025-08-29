import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/mywallet",
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: add auth token from localStorage
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // Set your token key here
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
