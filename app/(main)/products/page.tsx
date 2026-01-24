// app/(main)/products/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/product.service';
import ProductCard from '@/components/products/ProductCard';
import ProductSkeleton from '@/components/products/ProductSkeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'مجموعة الأثاث الحديث | TOP HOME',
  description: 'استكشف مجموعتنا المتميزة من الأثاث الحديث ومنتجات المطابخ. تصميمات عالية الجودة لمنزل أحلامك.',
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? Math.max(1, parseInt(params.page)) : 1;
  const pageSize = 12;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-right">
            <h1 className="text-4xl md:text-5xl font-black text-charcoal tracking-tight">
              <span className="text-wood-brown">مجموعتنا</span> الكاملة
            </h1>
            <p className="text-soft-gray max-w-xl">
              اكتشف قطع الأثاث المتميزة التي تم صنعها بتميز والمصممة لتحويل مساحات معيشتك إلى روائع فنية.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsList page={page} pageSize={pageSize} />
        </Suspense>
      </div>
    </main>
  );
}

async function ProductsList({ page, pageSize }: { page: number; pageSize: number }) {
  try {
    const data = await productService.getProducts({ pageIndex: page, pageSize });

    if (!data.items || data.items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-2">لم يتم العثور على منتجات</h2>
          <p className="text-soft-gray">لم نتمكن من العثور على أي منتجات في هذه المجموعة بعد.</p>
        </div>
      );
    }

    const totalPages = Math.ceil(data.count / pageSize);

    return (
      <div className="space-y-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8">
            {page > 1 && (
              <Link
                href={`/products?page=${page - 1}`}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-wood-brown hover:text-wood-brown transition-all"
              >
                السابق
              </Link>
            )}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Link
                  key={i}
                  href={`/products?page=${i + 1}`}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all",
                    page === i + 1
                      ? "bg-wood-brown text-white shadow-lg shadow-wood-brown/20"
                      : "bg-white border border-gray-200 text-charcoal hover:border-wood-brown hover:text-wood-brown"
                  )}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
            {page < totalPages && (
              <Link
                href={`/products?page=${page + 1}`}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-wood-brown hover:text-wood-brown transition-all"
              >
                التالي
              </Link>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
        <h2 className="text-red-800 font-bold text-xl mb-2">عذراً! حدث خطأ ما</h2>
        <p className="text-red-600 mb-6">نحن نواجه مشكلة في تحميل المنتجات الآن. يرجى المحاولة مرة أخرى لاحقاً.</p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
        >
          إعادة المحاولة
        </Link>
      </div>
    );
  }
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
      {[...Array(8)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
