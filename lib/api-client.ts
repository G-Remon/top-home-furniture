// lib/api-client.ts
/**
 * PRODUCTION-READY CENTRALIZED API CLIENT
 * 
 * Features:
 * - Automatic token injection
 * - 401 error handling with auto-logout
 * - Request/response interceptors
 * - Prevents infinite retry loops
 * - Type-safe error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { API_BASE_URL as BASE_URL } from '@/lib/constants';

const API_BASE_URL = BASE_URL ? `${BASE_URL}/api/` : '/api/';

// Create singleton axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 second timeout
});

// Track if we're currently refreshing to prevent loops
let isRefreshing = false;

/**
 * REQUEST INTERCEPTOR
 * Automatically injects the Bearer token from Zustand store
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get the latest token from Zustand store (works outside React components)
        const token = useAuthStore.getState().token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * RESPONSE INTERCEPTOR
 * Handles errors and 401 unauthorized responses
 */
apiClient.interceptors.response.use(
    (response) => {
        // Reset refresh flag on successful response
        isRefreshing = false;
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
            isRefreshing = true;
            originalRequest._retry = true;

            // Force logout - token is invalid
            const { logout } = useAuthStore.getState();
            logout();

            // Redirect to login (only in browser)
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }

            return Promise.reject(new Error('جلستك انتهت. يرجى تسجيل الدخول مرة أخرى.'));
        }

        // Handle network errors
        if (error.message === 'Network Error') {
            return Promise.reject(new Error('خطأ في الاتصال بالشبكة. تحقق من اتصالك بالإنترنت.'));
        }

        // Handle timeout errors
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('انتهت مهلة الطلب. حاول مرة أخرى.'));
        }

        // Extract error message from response
        const errorData = error.response?.data as { message?: string; error?: string } | string | undefined;

        let message: string;
        if (typeof errorData === 'string') {
            message = errorData;
        } else if (errorData && typeof errorData === 'object') {
            message = errorData.message || errorData.error || 'حدث خطأ غير متوقع';
        } else {
            message = error.message || 'حدث خطأ غير متوقع';
        }

        // Log error for debugging (remove in production or use proper logging service)
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', {
                url: originalRequest?.url,
                method: originalRequest?.method,
                status: error.response?.status,
                message,
                data: error.response?.data,
            });
        }

        return Promise.reject(new Error(message));
    }
);

export default apiClient;
