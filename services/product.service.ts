// services/product.service.ts
import { PaginatedProducts, ProductFilters, Product } from '@/types/product';
import { translateDescription } from '@/lib/translate';

const API_BASE_URL = 'http://tophomedev.runasp.net/api';

export const productService = {
    /**
     * Fetch products with pagination and filters
     */
    getProducts: async (filters: ProductFilters = {}): Promise<PaginatedProducts> => {
        const { pageIndex = 1, pageSize = 10, category, search } = filters;

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
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data: PaginatedProducts = await response.json();
        // Translate each product description to Arabic
        if (Array.isArray(data.items)) {
            data.items = data.items.map(p => {
                const translated = translateDescription(p.description || '');
                return {
                    ...p,
                    description: translated !== (p.description || '') ? translated : 'وصف المنتج',
                };
            });
        }
        return data;
    },

    /**
     * Get a single product by ID
     */
    getProductById: async (id: string): Promise<Product> => {
        const response = await fetch(`${API_BASE_URL}/Product/${id}`, {
            next: {
                revalidate: 3600,
            },
        });

        if (!response.ok) {
            throw new Error('Product not found');
        }

        const product: Product = await response.json();
        // Translate description to Arabic
        product.description = translateDescription(product.description || '');
        return product;
    }
};
