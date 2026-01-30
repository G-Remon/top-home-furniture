import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

import { API_BASE_URL as BASE_URL } from '@/lib/constants';

const API_BASE_URL = BASE_URL ? `${BASE_URL}/api/` : '/api/';

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
        console.error('Axios Error Response:', error.response?.data);
        let message = error.response?.data?.message || error.response?.data || 'حدث خطأ غير متوقع';

        // Translate common errors if needed
        if (message === 'An unexpected error occurred') message = 'حدث خطأ غير متوقع';
        if (message === 'Network Error') message = 'خطأ في الاتصال بالشبكة';
        if (typeof message === 'object') message = JSON.stringify(message);

        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;
