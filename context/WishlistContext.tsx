// context/WishlistContext.tsx

'use client'

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Product } from '@/types/product';
import { wishlistService } from '@/services/wishlist.service';
import { useAuthStore } from '@/store/auth.store';
import { addToWishlistAction, removeFromWishlistAction } from '@/actions/wishlist';
import { useRouter } from 'next/navigation';

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => Promise<void>;
    removeFromWishlist: (productId: string | number) => Promise<void>;
    toggleWishlist: (product: Product) => Promise<void>;
    isInWishlist: (productId: string | number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children, initialWishlist = [] }: { children: ReactNode, initialWishlist?: Product[] }) => {
    const [wishlist, setWishlist] = useState<Product[]>(initialWishlist);
    const { isAuthenticated } = useAuthStore();
    const router = useRouter(); // Import useRouter from next/navigation

    // Sync usage: Update when initialWishlist changes (server re-render)
    useEffect(() => {
        if (initialWishlist) setWishlist(initialWishlist);
    }, [initialWishlist]);

    const getWishlistKey = (p: Product) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (p as any)?.productId ?? (p as any)?.ProductId ?? p.id;
        return String(key).trim();
    };

    const getWishlistKeyFromProductId = (productId: string | number) => {
        return String(productId).trim();
    };

    const addToWishlist = async (product: Product) => {
        // Optimistic Update
        const wishlistKey = getWishlistKey(product);
        if (isInWishlist(wishlistKey)) return;

        // If not authenticated, redirect to login
        if (!isAuthenticated) return router.push('/login');

        const previousWishlist = [...wishlist];
        setWishlist(prev => [...prev, product]);

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const apiId = (product as any)?.productId ?? (product as any)?.ProductId ?? product.id;
            const result = await addToWishlistAction(apiId);
            if (result.error) throw new Error(result.error);
        } catch (error) {
            setWishlist(previousWishlist);
            console.error('Failed to add to wishlist', error);
            // toast error
        }
    };

    const removeFromWishlist = async (productId: string | number) => {
        const key = getWishlistKeyFromProductId(productId);
        if (!isInWishlist(key)) return;

        if (!isAuthenticated) return router.push('/login');

        const previousWishlist = [...wishlist];
        setWishlist(prev => prev.filter(p => getWishlistKey(p) !== key));

        try {
            const result = await removeFromWishlistAction(productId);
            if (result.error) throw new Error(result.error);
        } catch (error) {
            setWishlist(previousWishlist);
            console.error('Failed to remove from wishlist', error);
        }
    };

    const toggleWishlist = async (product: Product) => {
        const wishlistKey = getWishlistKey(product);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
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
