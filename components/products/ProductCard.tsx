// components/products/ProductCard.tsx
'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Info, TrendingDown, Package, CheckCircle2, XCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { getFullImageUrl } from '@/lib/utils';
import { translateCategory, translateProductName, translateCommon, translateDescription } from '@/lib/translate';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const hasDiscount = product.discountPercentage > 0;
  const isLowStock = typeof product.stockQuantity === 'number' && product.stockQuantity > 0 && product.stockQuantity < 5;

  const getImagePath = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      const first = product.images[0];
      if (typeof first === 'string') return first;
      if (first && typeof first === 'object' && 'url' in first) return first.url;
    }
    return (product as any).image || (product as any).pictureUrl || (product as any).thumbnailUrl || '';
  };

  const validImage = getFullImageUrl(getImagePath());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-gray-50">
        <Image
          src={validImage}
          alt={translateProductName(product.name)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex flex-col gap-2">
            {hasDiscount && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <TrendingDown size={14} />
                -{product.discountPercentage}%
              </div>
            )}
            {product.inStock ? (
              <div className="bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <CheckCircle2 size={12} />
                {translateCommon('inStock')}
              </div>
            ) : (
              <div className="bg-gray-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <XCircle size={12} />
                {translateCommon('outOfStock')}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/products/${product.id}`}
            className="p-3 bg-white text-charcoal rounded-full hover:bg-wood-brown hover:text-white transition-colors shadow-xl"
            title={translateCommon('viewDetails')}
          >
            <Info size={20} />
          </Link>
          <button
            className="p-3 bg-white text-charcoal rounded-full hover:bg-wood-brown hover:text-white transition-colors shadow-xl"
            title={translateCommon('addToCart')}
            disabled={!product.inStock}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-medium text-wood-brown bg-wood-brown/5 px-1.5 sm:px-2 py-0.5 rounded">
            {translateCategory(product.category)}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={10} className="sm:size-[14px] fill-current" />
            <span className="text-[10px] sm:text-xs font-bold text-charcoal">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-lg font-bold text-charcoal mb-1 sm:mb-2 line-clamp-1 group-hover:text-wood-brown transition-colors text-right">
          <Link href={`/products/${product.id}`}>{translateProductName(product.name)}</Link>
        </h3>

        <p className="text-[11px] sm:text-sm text-soft-gray line-clamp-2 mb-2 sm:mb-4 flex-grow text-right">
          {translateDescription(product.description)}
        </p>

        {/* Price and Stock */}
        <div className="mt-auto space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[10px] sm:text-xs text-soft-gray line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-base sm:text-xl font-black text-wood-brown leading-tight">
                {formatPrice(product.currentPrice)}
              </span>
            </div>

            {isLowStock && (
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                <Package size={10} className="sm:size-[14px]" />
                <span className="text-[8px] sm:text-[10px] font-bold uppercase truncate">
                  {translateCommon('only', { count: product.stockQuantity })}
                </span>
              </div>
            )}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="w-full py-2 sm:py-3 bg-charcoal text-white rounded-lg sm:rounded-xl text-center text-[11px] sm:text-sm font-bold hover:bg-wood-brown transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 group/btn"
          >
            <span className="truncate">{translateCommon('viewDetails')}</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="hidden sm:inline"
            >
              ←
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}