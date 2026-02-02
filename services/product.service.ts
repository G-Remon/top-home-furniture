// services/product.service.ts
import { PaginatedProducts, ProductFilters, Product } from '@/types/product';
import { translateDescription } from '@/lib/translate';
import { API_BASE_URL as BASE_URL, productsList } from '@/lib/constants';

const API_BASE_URL = typeof window === 'undefined' ? `${BASE_URL}/api` : '/api';

const normalizeProduct = (p: any): Product => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const normalized: Product = {
        ...p,
        id: p?.id ?? p?.productId ?? p?.ProductId,
        description: translateDescription(p?.description || '') || 'وصف المنتج',
    };
    return normalized;
};

export const productService = {
    /**
     * Fetch products with pagination and filters
     */
    getProducts: async (filters: ProductFilters = {}): Promise<PaginatedProducts> => {
        const { pageIndex = 1, pageSize = 10, category, search } = filters;

        try {
            const queryParams = new URLSearchParams({
                pageIndex: pageIndex.toString(),
                pageSize: pageSize.toString(),
            });

            if (category) queryParams.append('category', category);
            if (search) queryParams.append('search', search);

            const response = await fetch(`${API_BASE_URL}/Product?${queryParams.toString()}`, {
                next: {
                    revalidate: 3600, // Revalidate every hour
                    tags: ['products'],
                },
                // Set a timeout to avoid infinitely waiting for a dead API
                signal: AbortSignal.timeout(15000),
            });

            if (!response.ok) {
                throw new Error('API Response Error');
            }

            const data: PaginatedProducts = await response.json();

            // Post-process data
            if (Array.isArray(data.items)) {
                data.items = data.items.map(normalizeProduct);
            }
            return data;

        } catch (error) {
            console.error('API Error, falling back to local data:', error);

            // FALLBACK TO LOCAL DATA
            let filtered = [...productsList];

            if (category) {
                filtered = filtered.filter(p => p.category === category);
            }

            if (search) {
                const s = search.toLowerCase();
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(s) ||
                    p.description.toLowerCase().includes(s)
                );
            }

            const start = (pageIndex - 1) * pageSize;
            const items = filtered.slice(start, start + pageSize);

            return {
                pageIndex,
                pageSize,
                count: filtered.length,
                items
            };
        }
    },

    /**
     * Get a single product by ID
     */
    getProductById: async (id: string): Promise<Product> => {
        try {
            const tryFetch = async (url: string) => {
                const response = await fetch(url, {
                    next: { revalidate: 3600 },
                    signal: AbortSignal.timeout(15000),
                });

                if (!response.ok) throw new Error('Product not found in API');
                return response.json();
            };

            const url1 = `${API_BASE_URL}/Product/${encodeURIComponent(id)}`;
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const product1: any = await tryFetch(url1);
                return normalizeProduct(product1);
            } catch {
                const url2 = `${API_BASE_URL}/Product?id=${encodeURIComponent(id)}`;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const product2: any = await tryFetch(url2);
                return normalizeProduct(product2);
            }
        } catch (error) {
            console.warn(`Product ${id} not found in API, checking local data...`);

            const localProduct = productsList.find(p => p.id.toString() === id.toString());
            if (localProduct) return localProduct;

            throw new Error('Product not found anywhere');
        }
    }
};
