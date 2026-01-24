import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const API_BASE_URL = 'http://tophomedev.runasp.net/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
    (config) => {
        // We access the store directly for the latest state
        // Note: useAuthStore.getState() is safe to use outside of React components
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = error.response?.data?.message || 'حدث خطأ غير متوقع';

        // Translate common errors if needed
        if (message === 'An unexpected error occurred') message = 'حدث خطأ غير متوقع';
        if (message === 'Network Error') message = 'خطأ في الاتصال بالشبكة';

        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;
