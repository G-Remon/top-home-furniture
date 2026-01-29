// components/products/ProductCard.tsx
'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { getFullImageUrl } from '@/lib/utils';
import { translateCategory, translateProductName, translateCommon } from '@/lib/translate';
import { useRouter } from 'next/navigation';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const hasDiscount = product.discountPercentage > 0;

  const getImages = () => {
    const imgs: string[] = [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach(img => {
        if (typeof img === 'string') imgs.push(img);
        else if (img && typeof img === 'object' && 'url' in img) imgs.push(img.url);
      });
    }
    const fallback = (product as any).image || (product as any).pictureUrl || (product as any).thumbnailUrl;
    if (fallback && imgs.length === 0) imgs.push(fallback);
    return imgs.map(url => getFullImageUrl(url));
  };

  const images = getImages();
  const mainImage = images[0] || '';
  const hoverImage = images[1] || mainImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-gray-50 block">
        <Image
          src={mainImage}
          alt={translateProductName(product.name)}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
        />
        {hoverImage !== mainImage && (
          <Image
            src={hoverImage}
            alt={translateProductName(product.name)}
            fill
            className="object-cover transition-all duration-700 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {hasDiscount && (
            <div className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-bold shadow-lg">
              -{product.discountPercentage}%
            </div>
          )}
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/20 transition-colors duration-500 pointer-events-none" />
      </Link>

      {/* Content */}
      <div className="p-2 sm:p-3 flex flex-col flex-grow text-right">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[6px] sm:text-[8px] font-bold text-[#D4AF37] uppercase tracking-widest">
            {translateCategory(product.category)}
          </span>
          <div className="flex items-center gap-0.5">
            <Star size={7} className="text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">{product.rating || 5.0}</span>
          </div>
        </div>

        <h3 className="text-[10px] sm:text-sm font-bold text-gray-900 mb-0.5 line-clamp-1 group-hover:text-[#D4AF37] transition-colors leading-tight">
          <Link href={`/products/${product.id}`}>{translateProductName(product.name)}</Link>
        </h3>

        {/* Price Section */}
        <div className="mb-1.5 sm:mb-2">
          <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-start gap-0 sm:gap-1">
            <span className="text-xs sm:text-base font-black text-[#D4AF37]">
              {formatPrice(product.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[7px] sm:text-[10px] text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-auto pt-0.5">
          <WhatsAppButton
            phoneNumber="201234567890"
            message={`مرحباً، أود الاستفسار عن ${translateProductName(product.name)}`}
            productName={translateProductName(product.name)}
            className="w-full py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[8px] sm:text-xs shadow-sm"
          >
            واتساب
          </WhatsAppButton>

          <Link
            href={`/products/${product.id}`}
            className="block text-center text-[7px] sm:text-[9px] text-gray-400 mt-1 hover:text-[#D4AF37] transition-colors font-medium"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </motion.div>
  );
}