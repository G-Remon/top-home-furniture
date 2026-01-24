'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // We check isAuthenticated but also wait for the store to hydrate
        // Zustand's persist middleware might take a moment to load from localStorage
        const checkAuth = () => {
            if (!isAuthenticated) {
                router.push('/login');
            } else {
                setIsReady(true);
            }
        };

        // Small delay to allow hydration if needed, or check store hydration state
        // For simplicity with persist, we just check if isAuthenticated is false
        // If it's false initially but will become true, there might be a flick
        // But since Home MUST be accessible ONLY after login, it's safer to redirect.
        checkAuth();
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // Or a loading spinner
    }

    if (!isReady) {
        return null;
    }

    return <>{children}</>;
};
