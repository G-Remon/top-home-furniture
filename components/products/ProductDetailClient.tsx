// components/products/ProductDetailClient.tsx
'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Star, Truck, ShieldCheck, Package, Palette, Ruler, Weight, CheckCircle2, ShoppingCart } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { PHONE_NUMBER } from '@/lib/constants';
import { getFullImageUrl, cn } from '@/lib/utils';
import {
  translateCategory,
  translateProductName,
  translateCommon,
  translateFeatures,
  translateMaterial,
  translateColor,
  translateDescription,
  translateUnit
} from '@/lib/translate';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Filter out empty or invalid image URLs and format them
  const getInitialImages = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.map(img => {
        if (typeof img === 'string') return img;
        return (img as any).url;
      }).filter(url => url && url.trim() !== '');
    }
    const singleImage = (product as any).image || (product as any).pictureUrl || (product as any).thumbnailUrl;
    if (singleImage) return [singleImage];
    return [];
  };

  const validImages = getInitialImages().map(img => getFullImageUrl(img));
  const displayImages = validImages.length > 0 ? validImages : ['/images/geld.png'];

  const hasDiscount = product.discountPercentage > 0;

  const productDimensions = product.width && product.height && product.depth
    ? `${product.width} × ${product.height} × ${product.depth} ${translateUnit(product.dimensionUnit || 'سم')}`
    : (product as any).dimensions || translateCommon('outOfStock'); // using as generic fallback

  const specs = [
    { label: translateCommon('material'), value: translateMaterial(product.material), icon: Package },
    { label: translateCommon('color'), value: translateColor(product.color), icon: Palette },
    { label: translateCommon('dimensions'), value: productDimensions, icon: Ruler },
    { label: translateCommon('weight'), value: `${product.weight} ${translateUnit(product.weightUnit || 'كجم')}`, icon: Weight },
  ];

  const translatedFeatures = translateFeatures(product.features);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
      {/* Gallery Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={displayImages[selectedImage] || '/images/geld.png'}
                alt={translateProductName(product.name)}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0",
                  selectedImage === idx ? "border-wood-brown ring-2 sm:ring-4 ring-wood-brown/10" : "border-transparent hover:border-gray-200"
                )}
              >
                <Image
                  src={img}
                  alt={`${translateProductName(product.name)} ${idx}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-wood-brown/10 text-wood-brown rounded-full text-[10px] sm:text-sm font-bold tracking-wide">
            {translateCategory(product.category)}
          </span>
          <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 bg-amber-50 rounded-lg">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
            <span className="text-xs sm:text-sm font-bold text-charcoal">
              {translateCommon('rating', { count: product.rating })}
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-charcoal mb-4 sm:mb-6 leading-tight text-right">
          {translateProductName(product.name)}
        </h1>

        <p className="text-sm sm:text-lg text-soft-gray mb-6 sm:mb-8 leading-relaxed text-right">
          {translateDescription(product.description)}
        </p>

        {/* Pricing */}
        <div className="p-5 sm:p-8 bg-gray-50 rounded-2xl sm:rounded-[2rem] mb-6 sm:mb-8 border border-gray-100">
          <div className="flex items-baseline gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="text-3xl sm:text-5xl font-black text-wood-brown leading-none">
              {formatPrice(product.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-base sm:text-xl text-soft-gray line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {hasDiscount && (
            <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] sm:text-sm font-bold mb-4 sm:mb-6">
              وفر {formatPrice(product.discountAmount)} (خصم {product.discountPercentage}%)
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={16} className="sm:size-[20px]" />
              </div>
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-soft-gray">{translateCommon('availability')}</p>
                <p className="text-xs sm:text-sm font-bold text-charcoal">{product.inStock ? `${translateCommon('inStock')} (${product.stockQuantity})` : translateCommon('outOfStock')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center text-blue-600">
                <Truck size={16} className="sm:size-[20px]" />
              </div>
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-soft-gray">{translateCommon('delivery')}</p>
                <p className="text-xs sm:text-sm font-bold text-charcoal">{product.deliveryDays} {translateUnit(product.deliveryUnit || '')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-sm">
              <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-wood-brown shrink-0" />
              <div className="min-w-0 text-right">
                <p className="text-[8px] sm:text-[10px] uppercase font-bold text-soft-gray tracking-wider truncate">{spec.label}</p>
                <p className="text-xs sm:text-sm font-bold text-charcoal truncate">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-base sm:text-lg font-bold text-charcoal mb-3 sm:mb-4 flex items-center gap-2 justify-end">
            {translateCommon('features')} <ShieldCheck className="text-wood-brown size-5" />
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {translatedFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-soft-gray justify-end">
                <span className="text-xs sm:text-sm font-medium text-right">{feature}</span>
                <div className="w-1.5 h-1.5 bg-wood-brown rounded-full mt-1.5 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <WhatsAppButton
            phoneNumber={PHONE_NUMBER}
            message={`أنا مهتم بمنتج ${translateProductName(product.name)} (كود: ${product.id}). السعر: ${formatPrice(product.currentPrice)}`}
            productName={translateProductName(product.name)}
            className="flex-1 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-wood-brown text-white font-bold text-base sm:text-lg hover:bg-wood-brown/90 shadow-xl shadow-wood-brown/20 transition-all flex items-center justify-center gap-3"
          >
            <ShoppingCart size={20} className="sm:size-[24px]" /> {translateCommon('addToCart')}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
