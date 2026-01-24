'use client'

// components/products/ProductGrid.tsx
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import ProductCard from '@/components/products/ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-10 text-center text-soft-gray">
        لا توجد منتجات متاحة حالياً.
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
