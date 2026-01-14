// app/(main)/products/page.tsx
import { Suspense } from 'react'
import ProductsPageClient from '@/components/products/ProductsPageClient'

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-white to-off-white pt-20 md:pt-24" />}>
      <ProductsPageClient />
    </Suspense>
  )
}
