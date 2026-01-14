// app/(main)/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductDetailClient from '@/components/products/ProductDetailClient'
import { products } from '@/lib/constants'

interface ProductDetailPageProps {
  params: Promise<{ id: string }> // Params now a Promise
}

// generateMetadata now async and unwraps params
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params // unwrap the promise
  const product = products.find(p => p.id === id)

  if (!product) {
    return {
      title: 'المنتج غير موجود | TOP HOME',
    }
  }

  return {
    title: `${product.name} | TOP HOME`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  }
}

// Page component async to unwrap params
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params // unwrap the promise
  const product = products.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-off-white pt-24 pb-32">
      <div className="container-custom">
        <ProductDetailClient product={product} />
      </div>
    </div>
  )
}
