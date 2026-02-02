import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { WishlistProvider } from '@/context/WishlistContext';

import { Product } from '@/types/product';

import AuthSync from '@/components/auth/AuthSync';

export function AppProviders({ children, initialWishlist }: { children: ReactNode, initialWishlist?: Product[] }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
            <AuthSync />
            <WishlistProvider initialWishlist={initialWishlist}>
                {children}
            </WishlistProvider>
        </ThemeProvider>
    );
}
