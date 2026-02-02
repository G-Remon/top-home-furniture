// services/wishlist.service.ts
/**
 * WISHLIST SERVICE - PRODUCTION READY
 * 
 * Uses centralized API client for consistent auth token injection
 * Ensures user isolation - each user only sees their own wishlist
 */

import apiClient from '@/lib/api-client';
import { Product } from '@/types/product';

const coerceProductIdForApi = (productId: string | number) => {
    if (typeof productId === 'number') return productId;
    const trimmed = productId.trim();
    const asNumber = Number(trimmed);
    if (trimmed !== '' && Number.isFinite(asNumber)) return asNumber;
    return productId;
};

const normalizeFavoriteItemToProduct = (item: any): Product | null => {
    const candidate = item?.product ?? item?.productDto ?? item?.productDetails ?? item;
    if (!candidate) return null;

    const id = candidate?.id ?? candidate?.productId ?? candidate?.ProductId;
    if (id === undefined || id === null || String(id).trim() === '') return null;

    return {
        ...candidate,
        id,
    } as Product;
};

export const wishlistService = {
    /**
     * Add a product to the wishlist
     * Backend MUST associate this with the authenticated user's ID
     */
    async addToWishlist(productId: string | number) {
        const id = coerceProductIdForApi(productId);
        const response = await apiClient.post('WishList/create', { productId: id });
        return response.data;
    },

    /**
     * Get all wishlist items (favorites) for the authenticated user
     * Backend MUST filter by userId from the JWT token
     */
    async getFavorites(): Promise<Product[]> {
        const response = await apiClient.get('WishList/get-favorites');
        const data = response.data;

        // The API might return the list directly or wrapped
        const items = Array.isArray(data) ? data : (data?.items || []);
        if (!Array.isArray(items)) return [];

        return items
            .map(normalizeFavoriteItemToProduct)
            .filter((p): p is Product => Boolean(p));
    },

    /**
     * Remove a product from the wishlist
     * Backend MUST verify the item belongs to the authenticated user
     */
    async removeFromWishlist(productId: string | number) {
        const id = coerceProductIdForApi(productId);
        const response = await apiClient.delete(`WishList/Delete?productId=${id}`);
        return response.data;
    }
};
