'use server'

import { serverApi } from '@/lib/server-api'
import { revalidateTag } from 'next/cache'
import { Product } from '@/types/product'

const TAG_WISHLIST = 'wishlist'

// Get wishlist from server
export async function getWishlistAction(): Promise<Product[]> {
    try {
        const response = await serverApi.get('WishList/get-favorites')
        const data = response.data

        // Normalize data
        const items = Array.isArray(data) ? data : data?.items || []

        return items
            .map((item: any) => {
                const p = item.product || item.productDto || item
                return {
                    ...p,
                    id: p.id || p.productId || p.ProductId
                }
            })
            .filter((p: any) => p.id)
    } catch (error: unknown) {
        // If 401 or other error, return empty array
        return []
    }
}

// Add product to wishlist
export async function addToWishlistAction(productId: string | number) {
    try {
        await serverApi.post('WishList/create', { productId }, {})
        revalidateTag(TAG_WISHLIST, {}) // <-- Corrected
        return { success: true }
    } catch (error: unknown) {
        const err = error as any
        const msg = err?.response?.data?.message || err?.message || 'Failed to add'
        return { error: msg }
    }
}

// Remove product from wishlist
export async function removeFromWishlistAction(productId: string | number) {
    try {
        await serverApi.delete(`WishList/Delete?productId=${productId}`, {})
        revalidateTag(TAG_WISHLIST, {}) // <-- Corrected
        return { success: true }
    } catch (error: unknown) {
        const err = error as any
        const msg = err?.response?.data?.message || err?.message || 'Failed to remove'
        return { error: msg }
    }
}

// Optional toggle helper (logic should mostly remain client-side for optimistic UI)
export async function toggleWishlistAction(productId: string | number, isInWishlist: boolean) {
    if (isInWishlist) {
        return await removeFromWishlistAction(productId)
    } else {
        return await addToWishlistAction(productId)
    }
}
