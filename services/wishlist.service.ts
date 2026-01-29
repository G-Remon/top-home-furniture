// services/wishlist.service.ts
import axios from 'axios';
import { Product } from '@/types/product';
import { API_BASE_URL as BASE_URL } from '@/lib/constants';

// We point to the root API and include the full path in methods to be safe with Axios joining
const authApi = axios.create({
    baseURL: `${BASE_URL}/api`,
});

// Debug function to check storage and token
const getStoredToken = () => {
    if (typeof window === 'undefined') return null;

    const keys = ['top-home-auth', 'auth-storage'];
    for (const key of keys) {
        const stored = localStorage.getItem(key);
        if (!stored) continue;

        try {
            const parsed = JSON.parse(stored);
            // Zustant format: { state: { token: '...' } }
            const token = parsed.state?.token || parsed.token;
            if (token) return token;
        } catch (e) {
            // Raw string
            if (stored.length > 50 && !stored.startsWith('{')) return stored;
        }
    }
    return null;
};

// Add interceptor to include the auth token
authApi.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const wishlistService = {
    /**
     * Add a product to the wishlist
     */
    async addToWishlist(productId: string | number) {
        const id = typeof productId === 'string' ? parseInt(productId, 10) : productId;
        // URL: http://tophomedev.runasp.net/api/WishList/create
        const response = await authApi.post('/WishList/create', { productId: id });
        return response.data;
    },

    /**
     * Get all wishlist items (favorites)
     */
    async getFavorites(): Promise<Product[]> {
        // URL: http://tophomedev.runasp.net/api/WishList/get-favorites
        const response = await authApi.get('/WishList/get-favorites');
        const data = response.data;
        // The API might return the list directly or wrapped
        return Array.isArray(data) ? data : (data?.items || []);
    },

    /**
     * Remove a product from the wishlist
     */
    async removeFromWishlist(productId: string | number) {
        const id = typeof productId === 'string' ? parseInt(productId, 10) : productId;
        // URL: http://tophomedev.runasp.net/api/WishList/Delete?productId=...
        const response = await authApi.delete(`/WishList/Delete?productId=${id}`);
        return response.data;
    }
};
