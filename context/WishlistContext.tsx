// context/WishlistContext.tsx
'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/types/product';

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string | number) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string | number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedWishlist = localStorage.getItem('top-home-wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (error) {
                console.error('Failed to parse wishlist from localStorage', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Sync to localStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('top-home-wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToWishlist = (product: Product) => {
        setWishlist((prev) => {
            if (prev.some((p) => p.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string | number) => {
        setWishlist((prev) => prev.filter((p) => p.id !== productId));
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId: string | number) => {
        return wishlist.some((p) => p.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
