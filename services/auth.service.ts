import apiClient from '@/lib/api-client';
import {
    LoginFormData,
    RegisterFormData,
    AuthResponse,
    ForgotPasswordFormData,
    ResetPasswordFormData
} from '@/schemas/auth.schema';

// Helper to normalize response keys
// Helper to normalize response keys
const normalizeAuthResponse = (data: any): AuthResponse => { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.log('full_api_response_body:', JSON.stringify(data, null, 2));

    // Case 1: Token is directly in the root object (common)
    let token = data.token || data.Token || data.accessToken || data.AccessToken || data.jwt || data.Jwt;

    // Case 2: Response is wrapped in a 'result' or 'data' object
    if (!token && data.result) {
        token = data.result.token || data.result.Token || data.result.accessToken;
    }
    if (!token && data.data) { // common wrapper
        token = data.data.token || data.data.Token || data.data.accessToken;
    }

    // Case 3: Sometimes APIs return just the token string directly
    if (!token && typeof data === 'string' && data.length > 20) {
        token = data;
    }

    if (!token) {
        throw new Error(' Authentication failed: Server response did not contain a valid token.');
    }

    // Extract user info with same fallback logic
    const extract = (key: string, capKey: string) => {
        return data[key] || data[capKey] ||
            (data.result && (data.result[key] || data.result[capKey])) ||
            (data.data && (data.data[key] || data.data[capKey]));
    };

    return {
        token,
        userName: extract('userName', 'UserName') || extract('username', 'Username') || 'User',
        email: extract('email', 'Email'),
        userId: extract('userId', 'UserId') || extract('id', 'Id'),
        phoneNumber: extract('phoneNumber', 'PhoneNumber'),
        role: extract('role', 'Role') || 'user',
    };
};

export const authService = {
    login: async (data: LoginFormData): Promise<AuthResponse> => {
        const response = await apiClient.post('Account/Login', {
            email: data.email,
            password: data.password,
        });
        return normalizeAuthResponse(response.data);
    },

    register: async (data: RegisterFormData): Promise<AuthResponse> => {
        const response = await apiClient.post('Account/Register', {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phoneNumber: data.phoneNumber,
        });
        return normalizeAuthResponse(response.data);
    },

    forgotPassword: async (data: ForgotPasswordFormData): Promise<void> => {
        await apiClient.post('Account/ForgotPassword', {
            email: data.email,
        });
    },

    resetPassword: async (data: ResetPasswordFormData): Promise<void> => {
        await apiClient.post('Account/ResetPassword', {
            email: data.email,
            token: data.token,
            password: data.password,
            confirmPassword: data.confirmPassword,
        });
    },
};
