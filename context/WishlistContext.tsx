// context/WishlistContext.tsx
'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/types/product';
import { wishlistService } from '@/services/wishlist.service';
import { useAuthStore } from '@/store/auth.store';

interface WishlistContextType {
    wishlist: Product[];
    loading: boolean;
    addToWishlist: (product: Product) => Promise<void>;
    removeFromWishlist: (productId: string | number) => Promise<void>;
    toggleWishlist: (product: Product) => Promise<void>;
    isInWishlist: (productId: string | number) => boolean;
    refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuthStore();

    // Fetch favorites from API if authenticated
    const refreshWishlist = async () => {
        if (!isAuthenticated) {
            setWishlist([]);
            return;
        }

        setLoading(true);
        try {
            const favorites = await wishlistService.getFavorites();
            // Handle case where API might return products differently
            setWishlist(Array.isArray(favorites) ? favorites : []);
        } catch (error) {
            console.error('Failed to fetch wishlist', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshWishlist();
        } else {
            setWishlist([]);
        }
    }, [isAuthenticated]);

    const addToWishlist = async (product: Product) => {
        if (!isAuthenticated) {
            // We could show a login prompt here
            return;
        }

        try {
            // Optimistic update
            setWishlist(prev => [...prev, product]);
            await wishlistService.addToWishlist(product.id);
        } catch (error) {
            // Rollback on error
            setWishlist(prev => prev.filter(p => p.id !== product.id));
            console.error('Failed to add to wishlist', error);
        }
    };

    const removeFromWishlist = async (productId: string | number) => {
        if (!isAuthenticated) return;

        const productToRestore = wishlist.find(p => p.id === productId);
        try {
            // Optimistic update
            setWishlist(prev => prev.filter(p => p.id !== productId));
            await wishlistService.removeFromWishlist(productId);
        } catch (error) {
            // Rollback
            if (productToRestore) {
                setWishlist(prev => [...prev, productToRestore]);
            }
            console.error('Failed to remove from wishlist', error);
        }
    };

    const toggleWishlist = async (product: Product) => {
        if (isInWishlist(product.id)) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product);
        }
    };

    const isInWishlist = (productId: string | number) => {
        return wishlist.some((p) => String(p.id) === String(productId));
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            loading,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            refreshWishlist
        }}>
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
