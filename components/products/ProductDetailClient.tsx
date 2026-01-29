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
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0
    }).format(price);
  };

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

  const displayImages = getInitialImages().map(img => getFullImageUrl(img));
  const hasDiscount = product.discountPercentage > 0;

  const specs = [
    { label: translateCommon('material'), value: translateMaterial(product.material), icon: Package },
    { label: translateCommon('color'), value: translateColor(product.color), icon: Palette },
    { label: translateCommon('dimensions'), value: `${product.width || 0}×${product.height || 0}×${product.depth || 0} سم`, icon: Ruler },
    { label: 'وقت التوصيل', value: `${product.deliveryDays || 14} يوم`, icon: Truck },
  ];

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100">
            <Swiper
              modules={[Navigation, Pagination, Thumbs, EffectFade]}
              effect="fade"
              navigation
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              className="h-full w-full"
            >
              {displayImages.map((img, idx) => (
                <SwiperSlide key={idx} className="h-full w-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={img}
                      alt={`${translateProductName(product.name)} ${idx}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnails */}
          <div className="hidden sm:block">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={4}
              watchSlidesProgress
              className="thumbs-swiper"
            >
              {displayImages.map((img, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer rounded-xl overflow-hidden border-2 border-transparent swiper-slide-thumb-active:border-[#D4AF37]">
                  <div className="relative aspect-square">
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col text-right">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs font-bold">
              {translateCategory(product.category)}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-sm font-bold">{product.rating || 5.0}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {translateProductName(product.name)}
          </h1>

          <div className="flex flex-row-reverse items-center justify-start gap-4 mb-6">
            <span className="text-4xl font-black text-[#D4AF37]">
              {formatPrice(product.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                وفر {product.discountPercentage}%
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {specs.map((spec, i) => (
              <div key={i} className="flex flex-row-reverse items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <spec.icon className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{spec.label}</p>
                  <p className="text-sm font-bold text-gray-900">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">الوصف</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {translateDescription(product.description)}
            </p>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">المميزات</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {translateFeatures(product.features).map((f, i) => (
                <div key={i} className="flex flex-row-reverse items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA - Fixed on Mobile (handled outside) / Standard on Desktop */}
          <div className="hidden sm:block mt-auto">
            <WhatsAppButton
              phoneNumber={PHONE_NUMBER}
              message={`مرحباً، أود الاستفسار عن ${translateProductName(product.name)}`}
              productName={translateProductName(product.name)}
              size="lg"
              className="w-full py-5 rounded-2xl text-lg font-bold"
            >
              طلب عبر واتساب الآن
            </WhatsAppButton>
          </div>
        </div>
      </div>

      {/* Trust & Policy Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-gray-100">
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
            <Truck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">توصيل منزلي</h4>
          <p className="text-sm text-gray-500">نوفر خدمة التوصيل والتركيب لجميع المحافظات</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">ضمان حقيقي</h4>
          <p className="text-sm text-gray-500">ضمان لمدة سنتين على جميع العيوب المصنعية</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">سياسة الاسترجاع</h4>
          <p className="text-sm text-gray-500">يمكنك فحص المنتج عند الاستلام للتأكد من الجودة</p>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50">
        <WhatsAppButton
          phoneNumber={PHONE_NUMBER}
          message={`مرحباً، أود الاستفسار عن ${translateProductName(product.name)}`}
          productName={translateProductName(product.name)}
          className="w-full py-4 rounded-xl font-bold text-base"
        >
          اطلب الآن بالواتساب
        </WhatsAppButton>
      </div>
    </div>
  );
}
