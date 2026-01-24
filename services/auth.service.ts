import axiosInstance from '@/lib/axios';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/schemas/auth.schema';

export const authService = {
    login: async (data: LoginFormData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/Account/Login', {
            email: data.email,
            password: data.password,
        });
        return response.data;
    },

    register: async (data: RegisterFormData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/Account/register', {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phoneNumber: data.phoneNumber,
        });
        return response.data;
    },
};
