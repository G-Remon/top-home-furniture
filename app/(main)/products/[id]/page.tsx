// app/(main)/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductDetailClient from '@/components/products/ProductDetailClient'
import { products } from '@/lib/constants'

// Revalidate the page every 1 hour
// This ensures that the page is regenerated at most once per hour
// but can be invalidated earlier if needed
export const revalidate = 3600 // 1 hour in seconds

interface ProductDetailPageProps {
  params: { id: string }
}

// Generate static params at build time
export async function generateStaticParams() {
  // Pre-render these paths at build time
  return products.map((product) => ({
    id: product.id,
  }))
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = params
  
  // In a real app, you might want to fetch the product from an API
  const product = products.find(p => p.id === id)

  if (!product) {
    return {
      title: 'المنتج غير موجود | TOP HOME',
      description: 'عذراً، لا يمكن العثور على المنتج المطلوب.',
    }
  }

  return {
    title: `${product.name} | TOP HOME`,
    description: product.shortDescription || `اكتشف ${product.name} من توب هوم. ${product.fullDescription || ''}`.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDescription || `اكتشف ${product.name} من توب هوم`,
      images: Array.isArray(product.images) && product.images.length > 0 
        ? product.images 
        : [{ url: '/images/placeholder.jpg' }],
      type: 'website',
      locale: 'ar_SA',
      siteName: 'TOP HOME',
    },
    alternates: {
      canonical: `/products/${product.id}`,
    },
  }
}

// Add this function to handle 404s for non-existent products
async function getProduct(id: string) {
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return null
  }
  
  return product
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params
  const product = await getProduct(id)

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
