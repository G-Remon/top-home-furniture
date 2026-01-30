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

    // Load initial wishlist from localStorage for guests
    useEffect(() => {
        const localWishlist = localStorage.getItem('guest_wishlist');
        if (localWishlist && !isAuthenticated) {
            try {
                setWishlist(JSON.parse(localWishlist));
            } catch (e) {
                console.error('Failed to parse local wishlist', e);
            }
        }
    }, []);

    // Fetch favorites from API if authenticated
    const refreshWishlist = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            const favorites = await wishlistService.getFavorites();
            setWishlist(Array.isArray(favorites) ? favorites : []);
            // Clear local wishlist once synced
            localStorage.removeItem('guest_wishlist');
        } catch (error) {
            console.error('Failed to fetch wishlist', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshWishlist();
        }
    }, [isAuthenticated]);

    const addToWishlist = async (product: Product) => {
        if (!isAuthenticated) {
            const newWishlist = [...wishlist, product];
            setWishlist(newWishlist);
            localStorage.setItem('guest_wishlist', JSON.stringify(newWishlist));
            return;
        }

        try {
            setWishlist(prev => [...prev, product]);
            await wishlistService.addToWishlist(product.id);
        } catch (error) {
            setWishlist(prev => prev.filter(p => p.id !== product.id));
            console.error('Failed to add to wishlist', error);
        }
    };

    const removeFromWishlist = async (productId: string | number) => {
        if (!isAuthenticated) {
            const newWishlist = wishlist.filter(p => String(p.id) !== String(productId));
            setWishlist(newWishlist);
            localStorage.setItem('guest_wishlist', JSON.stringify(newWishlist));
            return;
        }

        const productToRestore = wishlist.find(p => String(p.id) === String(productId));
        try {
            setWishlist(prev => prev.filter(p => String(p.id) !== String(productId)));
            await wishlistService.removeFromWishlist(productId);
        } catch (error) {
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
