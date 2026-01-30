'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * Redirects authenticated users away from auth pages (login/register)
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
    const router = useRouter();
    const { isAuthenticated, _hasHydrated } = useAuthStore();

    useEffect(() => {
        if (_hasHydrated && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, _hasHydrated, router]);

    if (!_hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-wood-brown border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};
