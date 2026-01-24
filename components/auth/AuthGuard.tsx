'use client';

import { useEffect, useState } from 'react';
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
    const { isAuthenticated } = useAuthStore();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        } else {
            setIsReady(true);
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null;
    }

    if (!isReady) {
        return null;
    }

    return <>{children}</>;
};
