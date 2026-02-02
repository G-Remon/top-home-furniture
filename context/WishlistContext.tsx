// context/WishlistContext.tsx

'use client'

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
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
    const { isAuthenticated, user, _hasHydrated } = useAuthStore();
    const canUseApi = Boolean(isAuthenticated && user);
    const prevCanUseApiRef = useRef<boolean>(false);

    const getWishlistKey = (p: Product) => {
        const key = (p as any)?.productId ?? (p as any)?.ProductId ?? p.id;
        return String(key).trim();
    };

    const getWishlistKeyFromProductId = (productId: string | number) => {
        return String(productId).trim();
    };

    const mergeUniqueById = (items: Product[]) => {
        const map = new Map<string, Product>();
        for (const p of items) {
            if (!p) continue;
            const key = getWishlistKey(p);
            if (!key) continue;
            if (!map.has(key)) map.set(key, p);
        }
        return Array.from(map.values());
    };

    // Fetch favorites from API if authenticated
    const refreshWishlist = async () => {
        if (!canUseApi) return;

        setLoading(true);
        try {
            const favorites = await wishlistService.getFavorites();
            setWishlist(Array.isArray(favorites) ? mergeUniqueById(favorites) : []);
        } catch (error) {
            console.error('Failed to fetch wishlist', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const run = async () => {
            if (!_hasHydrated) return;

            const prevCanUseApi = prevCanUseApiRef.current;
            prevCanUseApiRef.current = canUseApi;

            // If we just logged out (or switched accounts), clear any in-memory state
            // and clear guest wishlist to avoid cross-account carry-over.
            if (prevCanUseApi && !canUseApi) {
                setWishlist([]);
                localStorage.removeItem('guest_wishlist');
                return;
            }

            if (canUseApi) {
                await refreshWishlist();
                return;
            }

            setWishlist([]);
            localStorage.removeItem('guest_wishlist');
        };

        run();
    }, [canUseApi, _hasHydrated]);

    const addToWishlist = async (product: Product) => {
        const wishlistKey = getWishlistKey(product);
        if (isInWishlist(wishlistKey)) return;

        if (!canUseApi) {
            throw new Error('AUTH_REQUIRED');
        }

        try {
            setWishlist(prev => [...prev, product]);
            await wishlistService.addToWishlist((product as any)?.productId ?? (product as any)?.ProductId ?? product.id);
        } catch (error) {
            setWishlist(prev => prev.filter(p => getWishlistKey(p) !== wishlistKey));
            console.error('Failed to add to wishlist', error);
            throw error;
        }
    };

    const removeFromWishlist = async (productId: string | number) => {
        const key = getWishlistKeyFromProductId(productId);
        if (!isInWishlist(key)) return;

        if (!canUseApi) {
            throw new Error('AUTH_REQUIRED');
        }

        const productToRestore = wishlist.find(p => getWishlistKey(p) === key);
        try {
            setWishlist(prev => prev.filter(p => getWishlistKey(p) !== key));
            await wishlistService.removeFromWishlist(productId);
        } catch (error) {
            if (productToRestore) {
                setWishlist(prev => [...prev, productToRestore]);
            }
            console.error('Failed to remove from wishlist', error);
            throw error;
        }
    };

    const toggleWishlist = async (product: Product) => {
        const wishlistKey = getWishlistKey(product);
        const apiId = (product as any)?.productId ?? (product as any)?.ProductId ?? product.id;

        if (isInWishlist(wishlistKey)) {
            await removeFromWishlist(apiId);
        } else {
            await addToWishlist(product);
        }
    };

    const isInWishlist = (productId: string | number) => {
        const key = getWishlistKeyFromProductId(productId);
        return wishlist.some((p) => getWishlistKey(p) === key);
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
