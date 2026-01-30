'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { LoginFormData, RegisterFormData, ForgotPasswordFormData, ResetPasswordFormData } from '@/schemas/auth.schema';
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const router = useRouter();
    const { setAuth, logout, isAuthenticated, token, checkTokenValidity } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Periodically check token validity
    useEffect(() => {
        if (isAuthenticated && token) {
            checkTokenValidity();
            const interval = setInterval(checkTokenValidity, 60000); // Check every minute
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, token, checkTokenValidity]);

    const login = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            setAuth(response);
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'فشل تسجيل الدخول');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.register(data);
            setAuth(response);
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'فشل إنشاء الحساب');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPassword = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.forgotPassword(data);
        } catch (err: any) {
            setError(err.message || 'فشل إرسال طلب إعادة تعيين كلمة المرور');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (data: ResetPasswordFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.resetPassword(data);
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'فشل إعادة تعيين كلمة المرور');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return {
        login,
        register,
        forgotPassword,
        resetPassword,
        logout: handleLogout,
        isAuthenticated,
        isLoading,
        error,
    };
};
