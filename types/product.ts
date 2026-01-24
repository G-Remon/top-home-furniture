// types/product.ts

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  rating: number;
  originalPrice: number;
  currentPrice: number;
  discountAmount: number;
  discountPercentage: number;
  currency: string;
  stockQuantity: number;
  inStock: boolean;
  deliveryDays: string | number;
  deliveryUnit: string;
  material: string;
  color: string;
  weight: number;
  weightUnit?: string;
  width?: number;
  depth?: number;
  height?: number;
  dimensionUnit?: string;
  images: ProductImage[] | string[];
  features: string[];
}

export interface PaginatedProducts {
  pageIndex: number;
  pageSize: number;
  count: number;
  items: Product[];
}

export interface ProductFilters {
  pageIndex?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  description: string;
  image: string;
}
