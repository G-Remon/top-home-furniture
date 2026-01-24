import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    token: string | null;
    userName: string | null;
    email: string | null;
    isAuthenticated: boolean;
    setAuth: (data: { token: string; userName: string; email: string }) => void;
    logout: () => void;
    checkTokenValidity: () => void;
}

interface JwtPayload {
    exp: number;
    email?: string;
    [key: string]: any;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            userName: null,
            email: null,
            isAuthenticated: false,

            setAuth: (data) => {
                set({
                    token: data.token,
                    userName: data.userName,
                    email: data.email,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                set({
                    token: null,
                    userName: null,
                    email: null,
                    isAuthenticated: false,
                });
            },

            checkTokenValidity: () => {
                const { token, logout } = get();
                if (!token) return;

                try {
                    const decoded = jwtDecode<JwtPayload>(token);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp < currentTime) {
                        logout();
                    }
                } catch (error) {
                    logout();
                }
            },
        }),
        {
            name: 'top-home-auth',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
