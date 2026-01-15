// types/product.ts
export interface Category {
  id: string
  name: string
  count: number
  description?: string
  image?: string
}

export interface Product {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  material: string
  dimensions: string
  weight: string
  deliveryTime: string
  warranty?: string
  isNew?: boolean
  isFeatured?: boolean
  image?: string
  images: string[]
  features: string[]
  rating?: number
  reviews?: number
  stock?: number
  createdAt: string
}
