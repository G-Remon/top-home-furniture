// components/products/ProductCard.tsx
'use client'

import { motion, easeOut } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingBag, Star, Shield } from 'lucide-react'
import { Product } from '@/types/product'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { useState, useMemo, useCallback } from 'react'
import { PHONE_NUMBER } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index: number
}

// دالة مساعدة خارج المكون لتجنب إعادة الإنشاء
const formatPrice = (price: number) => {
  return price.toLocaleString('en-US')
}

const calculateDiscountPercentage = (originalPrice: number, currentPrice: number) => {
  return ((originalPrice - currentPrice) / originalPrice * 100).toFixed(0)
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // استخدام useMemo لحساب القيم المشتقة
  const productImage = useMemo(() => {
    if (imageError) return '/images/geld.png'
    
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0]
      if (firstImage && typeof firstImage === 'string' && firstImage.trim() !== '') {
        return firstImage
      }
    }
    if (product.image && typeof product.image === 'string' && product.image.trim() !== '') {
      return product.image
    }
    return '/images/geld.png'
  }, [product.images, product.image, imageError])

  const discountPercentage = useMemo(() => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return calculateDiscountPercentage(product.originalPrice, product.price)
    }
    return null
  }, [product.originalPrice, product.price])

  // استخدام useCallback للدوال المعالجة للأحداث
  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(prev => !prev)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // حساب تأخير الأنيميشن بناءً على المؤشر
  const animationDelay = useMemo(() => index * 0.05, [index])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: animationDelay,
        duration: 0.4,
        ease: easeOut,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full focus-within:ring-2 focus-within:ring-wood-brown focus-within:ring-offset-2 focus-within:outline-none rounded-2xl"
      role="article"
      aria-label={`منتج: ${product.name}`}
    >
      <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-wood-brown/20 focus:border-wood-brown">

        {/* الصورة */}
        <Link
          href={`/products/${product.id}`}
          className="block relative aspect-[3/4] overflow-hidden bg-gray-50 focus:outline-none focus:ring-2 focus:ring-wood-brown focus:ring-offset-2"
          aria-label={`عرض تفاصيل ${product.name}`}
          tabIndex={0}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="relative h-full w-full bg-gradient-to-br from-gray-50 to-gray-100"
          >
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
              onError={handleImageError}
              loading={index < 4 ? 'eager' : 'lazy'}
              quality={85}
              unoptimized={productImage.startsWith('http')} // لأمان الصور الخارجية
            />
          </motion.div>

          {/* Overlay عند hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.discount && (
              <motion.div
                initial={{ scale: 0.8, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ 
                  delay: animationDelay + 0.2, 
                  type: "spring", 
                  stiffness: 200 
                }}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg"
                aria-label={`خصم ${product.discount} بالمئة`}
              >
                {product.discount}% خصم
              </motion.div>
            )}

            {product.isNew && (
              <motion.div
                initial={{ scale: 0.8, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ 
                  delay: animationDelay + 0.3, 
                  type: "spring", 
                  stiffness: 200 
                }}
                className="bg-wood-brown text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1"
              >
                <Star className="w-3 h-3 fill-white" />
                جديد
              </motion.div>
            )}
          </div>

          {/* ضمان */}
          {product.warranty && (
            <div className="absolute top-3 right-3 z-10">
              <div 
                className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-md"
                aria-label={`ضمان ${product.warranty}`}
              >
                <Shield className="w-3 h-3 text-wood-brown" />
                <span className="text-xs text-charcoal font-semibold">
                  ضمان {product.warranty}
                </span>
              </div>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2 z-10"
          >
            <motion.button
              onClick={handleFavoriteClick}
              className="flex-1 p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-wood-brown"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
              type="button"
            >
              <Heart
                className={cn(
                  "w-5 h-5 mx-auto transition-all duration-200",
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                )}
              />
            </motion.button>

            <Link
              href={`/products/${product.id}`}
              className="flex-1 flex items-center justify-center p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-200 h-full focus:outline-none focus:ring-2 focus:ring-wood-brown"
              aria-label="عرض تفاصيل المنتج"
            >
              <Eye className="w-5 h-5 text-gray-600" />
            </Link>
          </motion.div>
        </Link>

        {/* محتوى البطاقة */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <span 
              className="inline-block px-2.5 py-1 bg-off-white text-wood-brown text-xs font-semibold rounded-md"
              aria-label={`فئة: ${product.category}`}
            >
              {product.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-charcoal mb-2 line-clamp-2 leading-tight min-h-[3.5rem]">
            <Link
              href={`/products/${product.id}`}
              className="hover:text-wood-brown transition-colors duration-200 focus:outline-none focus:text-wood-brown"
              aria-label={`${product.name} - انقر للتفاصيل`}
            >
              {product.name}
            </Link>
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow min-h-[2.5rem]">
            {product.shortDescription}
          </p>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-wood-brown" aria-label={`السعر: ${product.price}`}>
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-charcoal font-medium">ج.م</span>
              </div>

              {product.originalPrice && product.originalPrice > product.price && discountPercentage && (
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs text-green-600 font-semibold">
                    وفر {discountPercentage}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Link
                href={`/products/${product.id}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-wood-brown/20 text-wood-brown rounded-xl hover:bg-wood-brown hover:text-white hover:border-wood-brown transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-wood-brown focus:ring-offset-1"
                aria-label="عرض تفاصيل المنتج"
              >
                <Eye className="w-4 h-4" />
                التفاصيل
              </Link>

              <WhatsAppButton
                phoneNumber={PHONE_NUMBER}
                message={`استفسار عن: ${product.name}`}
                productName={product.name}
                className="flex-1 text-sm py-2.5 bg-wood-brown hover:bg-wood-brown/90 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-wood-brown focus:ring-offset-1"
                showIcon={false}
                size="sm"
                aria-label={`طلب المنتج ${product.name} عبر واتساب`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>اطلب</span>
                </div>
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>

      {/* ظل البطاقة */}
      <div 
        className="absolute -bottom-1 left-4 right-4 h-2 bg-wood-brown/5 blur-sm rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </motion.article>
  )
}