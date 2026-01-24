import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { WishlistProvider } from '@/context/WishlistContext';

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
            <WishlistProvider>
                {children}
            </WishlistProvider>
        </ThemeProvider>
    );
}
