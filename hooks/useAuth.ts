'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { LoginFormData, RegisterFormData, ForgotPasswordFormData, ResetPasswordFormData } from '@/schemas/auth.schema';
import { useState, useEffect } from 'react';


export const useAuth = () => {
    const router = useRouter();
    const { setAuth, logout, isAuthenticated, checkTokenValidity, user } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Periodically check token validity & consistency
    useEffect(() => {
        if (isAuthenticated && user) {
            // Initial check
            checkTokenValidity();

            // Check every minute
            const interval = setInterval(() => {
                const isValid = checkTokenValidity();
                if (!isValid) {
                    // Token expired - redirect to login
                    router.push('/login');
                }
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [isAuthenticated, user, checkTokenValidity, router]);

    const login = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);

            // Immediately update auth state
            setAuth({
                token: response.token,
                userName: response.userName,
                email: response.email || data.email,
                userId: response.userId,
                phoneNumber: response.phoneNumber,
                role: response.role,
            });

            // Force a small delay to ensure state is updated
            await new Promise(resolve => setTimeout(resolve, 100));

            console.log('Login successful, redirecting to home...');

            // Navigate to home
            router.push('/');
        } catch (err: any) {
            console.error('Login error:', err);
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

            // Immediately update auth state
            setAuth({
                token: response.token,
                userName: response.userName,
                email: response.email || data.email,
                userId: response.userId,
                phoneNumber: data.phoneNumber,
                role: response.role,
            });

            // Force a small delay to ensure state is updated
            await new Promise(resolve => setTimeout(resolve, 100));

            // Navigate to home
            router.push('/');
            router.refresh(); // Force refresh to update UI
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
        router.refresh(); // Force refresh to clear UI state
    };

    return {
        login,
        register,
        forgotPassword,
        resetPassword,
        logout: handleLogout,
        isAuthenticated,
        user,
        isLoading,
        error,
    };
};
