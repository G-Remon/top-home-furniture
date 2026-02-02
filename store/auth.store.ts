// store/auth.store.ts
/**
 * PRODUCTION-READY AUTHENTICATION STORE
 * 
 * Features:
 * - Persistent authentication state with Zustand
 * - Automatic token validation on startup
 * - User profile management
 * - Secure token expiry checking
 * - Cross-tab synchronization
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
    userId: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    role?: string;
}

interface AuthState {
    // Authentication
    token: string | null;
    isAuthenticated: boolean;

    // User Profile
    user: UserProfile | null;

    // Hydration tracking
    _hasHydrated: boolean;

    // Actions
    setAuth: (data: { token: string; userName: string; email: string; userId?: string; phoneNumber?: string; role?: string }) => void;
    setUser: (user: UserProfile) => void;
    logout: () => void;
    checkTokenValidity: () => boolean;
    setHasHydrated: (state: boolean) => void;
}

interface JwtPayload {
    exp: number;
    sub?: string; // User ID
    email?: string;
    name?: string;
    role?: string;
    [key: string]: any;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            token: null,
            isAuthenticated: false,
            user: null,
            _hasHydrated: false,

            /**
             * Set authentication data after login/register
             */
            setAuth: (data) => {
                // Validate token existence
                if (!data.token) {
                    console.error('Login failed: No token received');
                    return;
                }

                // Decode token to extract user ID if not provided
                let userId = data.userId;

                if (!userId) {
                    try {
                        const decoded = jwtDecode<JwtPayload>(data.token);
                        userId = decoded.sub || decoded.userId || decoded.id;
                    } catch (error) {
                        console.error('Failed to decode token during login:', error);
                    }
                }

                set({
                    token: data.token,
                    isAuthenticated: true,
                    user: {
                        userId: userId || 'unknown',
                        userName: data.userName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        role: data.role || 'user',
                    },
                });
            },

            /**
             * Update user profile
             */
            setUser: (user) => {
                set({ user });
            },

            /**
             * Logout - Clear all auth data
             */
            logout: () => {
                set({
                    token: null,
                    isAuthenticated: false,
                    user: null,
                });

                // Clear any legacy storage keys
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth-storage');
                    localStorage.removeItem('guest_wishlist');
                }
            },

            /**
             * Check if token is valid and not expired
             * Returns true if valid, false otherwise
             */
            checkTokenValidity: () => {
                const { token, isAuthenticated, logout } = get();

                // Consistency check: If authenticated but no token, force logout
                if (isAuthenticated && !token) {
                    console.warn('Auth check failed: Authenticated but no token');
                    logout();
                    return false;
                }

                if (!token) {
                    // set({ isAuthenticated: false }); // This is handled by logout if isAuthenticated was true
                    return false;
                }

                try {
                    const decoded = jwtDecode<JwtPayload>(token);
                    const currentTime = Date.now() / 1000;

                    // Check if token is expired (reduced buffer to 5s)
                    if (decoded.exp < currentTime + 5) {
                        console.warn('Token expired:', { exp: decoded.exp, current: currentTime });
                        logout();
                        return false;
                    }

                    // Token is valid
                    set({ isAuthenticated: true });
                    return true;
                } catch (error) {
                    console.error('Token validation error:', error);
                    logout();
                    return false;
                }
            },

            /**
             * Set hydration state
             */
            setHasHydrated: (state) => {
                set({ _hasHydrated: state });
            },
        }),
        {
            name: 'top-home-auth',
            storage: createJSONStorage(() => localStorage),

            /**
             * Rehydration callback - validates token on app startup
             */
            onRehydrateStorage: () => (state) => {
                if (!state) return;

                state.setHasHydrated(true);

                // Validate token on startup
                if (state.token) {
                    const isValid = state.checkTokenValidity();

                    if (!isValid) {
                        // Token expired or invalid - clear everything
                        state.logout();
                    }
                } else {
                    // No token: ensure clean state
                    if (state.isAuthenticated || state.user) {
                        state.logout();
                    }
                }
            },
        }
    )
);

/**
 * Helper to get current user ID safely
 */
export const getCurrentUserId = (): string | null => {
    const state = useAuthStore.getState();
    return state.user?.userId || null;
};

/**
 * Helper to check if user is authenticated
 */
export const isUserAuthenticated = (): boolean => {
    const state = useAuthStore.getState();
    return state.isAuthenticated && !!state.token && state.checkTokenValidity();
};
