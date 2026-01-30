import axiosInstance from '@/lib/axios';
import {
    LoginFormData,
    RegisterFormData,
    AuthResponse,
    ForgotPasswordFormData,
    ResetPasswordFormData
} from '@/schemas/auth.schema';

export const authService = {
    login: async (data: LoginFormData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/Account/Login', {
            email: data.email,
            password: data.password,
        });
        return response.data;
    },

    register: async (data: RegisterFormData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/Account/Register', {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phoneNumber: data.phoneNumber,
        });
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordFormData): Promise<void> => {
        await axiosInstance.post('/Account/ForgotPassword', {
            email: data.email,
        });
    },

    resetPassword: async (data: ResetPasswordFormData): Promise<void> => {
        await axiosInstance.post('/Account/ResetPassword', {
            email: data.email,
            token: data.token,
            newPassword: data.password,
            confirmPassword: data.confirmPassword,
        });
    },
};
