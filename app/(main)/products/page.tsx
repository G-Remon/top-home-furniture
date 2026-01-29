// app/(main)/products/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/product.service';
import ProductCard from '@/components/products/ProductCard';
import ProductSkeleton from '@/components/products/ProductSkeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/constants';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'مجموعة الأثاث الحديث | TOP HOME',
  description: 'استكشف مجموعتنا المتميزة من الأثاث الحديث ومنتجات المطابخ. تصميمات عالية الجودة لمنزل أحلامك.',
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentCategory = typeof params.category === 'string' ? params.category : '';
  const page = typeof params.page === 'string' ? Math.max(1, parseInt(params.page)) : 1;
  const pageSize = 12;

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col gap-8 mb-12">
          <div className="space-y-2 text-right">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
              <span className="text-[#D4AF37]">مجموعتنا</span> الكاملة
            </h1>
            <p className="text-gray-500 max-w-xl text-lg">
              قطع أثاث متميزة مٌصممة لتحويل مساحات منزلك إلى روائع فنية خالدة.
            </p>
          </div>

          {/* Categories Quick Filter */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
              href="/products"
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                !currentCategory
                  ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/50"
              )}
            >
              الكل
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                  currentCategory === cat.id
                    ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/50"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Filters & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 hover:bg-[#D4AF37] hover:text-white transition-all">
              <SlidersHorizontal size={16} />
              تصفية
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-medium mr-2">
              <span>السعر</span> • <span>اللون</span> • <span>الخامة</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:inline text-right">ترتيب حسب:</span>
            <select className="bg-transparent text-sm font-bold text-gray-900 border-none focus:ring-0 cursor-pointer text-right">
              <option>الأحدث</option>
              <option>الأكثر مبيعاً</option>
              <option>السعر: من الأقل للأعلى</option>
              <option>السعر: من الأعلى للأقل</option>
            </select>
            <ArrowUpDown size={16} className="text-[#D4AF37]" />
          </div>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsList page={page} pageSize={pageSize} category={currentCategory} />
        </Suspense>
      </div>
    </main>
  );
}

async function ProductsList({ page, pageSize, category }: { page: number; pageSize: number; category?: string }) {
  try {
    const data = await productService.getProducts({ pageIndex: page, pageSize, category });

    if (!data.items || data.items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">لم يتم العثور على منتجات</h2>
          <p className="text-gray-500">لم نتمكن من العثور على أي منتجات في هذه المجموعة بعد.</p>
        </div>
      );
    }

    const totalPages = Math.ceil(data.count / pageSize);

    return (
      <div className="space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8">
            {page > 1 && (
              <Link
                href={`/products?page=${page - 1}${category ? `&category=${category}` : ''}`}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                السابق
              </Link>
            )}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Link
                  key={i}
                  href={`/products?page=${i + 1}${category ? `&category=${category}` : ''}`}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all",
                    page === i + 1
                      ? "bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20"
                      : "bg-white border border-gray-200 text-gray-900 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  )}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
            {page < totalPages && (
              <Link
                href={`/products?page=${page + 1}${category ? `&category=${category}` : ''}`}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
      {[...Array(8)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
