'use client';

import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export const LogoutButton = ({ className, children }: LogoutButtonProps) => {
    const { logout } = useAuth();

    return (
        <button
            onClick={logout}
            className={cn(
                "flex items-center gap-2 text-sm font-medium text-soft-gray hover:text-destructive transition-colors px-3 py-2 rounded-lg hover:bg-destructive/5",
                className
            )}
        >
            {children || (
                <>
                    <LogOut size={18} />
                    <span>Logout</span>
                </>
            )}
        </button>
    );
};

export default LogoutButton;
