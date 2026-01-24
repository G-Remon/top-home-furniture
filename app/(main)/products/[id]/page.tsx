// app/(main)/products/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productService } from '@/services/product.service';
import ProductDetailClient from '@/components/products/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await productService.getProductById(id);
    return {
      title: `${product.name} | Top Home`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images.length > 0 ? [product.images[0]] : [],
      }
    };
  } catch {
    return {
      title: 'Product Not Found | Top Home',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  try {
    const product = await productService.getProductById(id);

    return (
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ProductDetailClient product={product} />
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
