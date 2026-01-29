'use client'

import React, { memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageCircle, Info, Heart } from 'lucide-react'
import { Product } from '@/types/product'
import { PHONE_NUMBER } from '@/lib/constants'
import { formatPrice, getFullImageUrl, cn } from '@/lib/utils'
import { translateProductName, translateCategory } from '@/lib/translate'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { useWishlist } from '@/context/WishlistContext'
import { useAuthStore } from '@/store/auth.store'

interface ProductCardProps {
  product: Product
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { isAuthenticated } = useAuthStore()

  const isFavorite = isInWishlist(product.id)

  const mainImage = getFullImageUrl(product.images?.[0])
  const hoverImage = getFullImageUrl(product.images?.[1] || product.images?.[0])
  const hasDiscount = product.originalPrice > product.currentPrice
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative h-full flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex flex-col gap-1.5 sm:gap-2">
        {hasDiscount && (
          <motion.span
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-red-500 text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg"
          >
            خصم {discountPercentage}%
          </motion.span>
        )}
        {product.inStock && (
          <motion.span
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-green-500 text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg"
          >
            متوفر
          </motion.span>
        )}
      </div>

      {/* Wishlist Heart - Top Left */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={cn(
            "w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all bg-white/80 backdrop-blur-md shadow-sm border border-gray-100",
            isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"
          )}
          aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
          <Heart
            size={18}
            className={cn("transition-all", isFavorite ? "fill-current" : "")}
          />
        </motion.button>
      </div>

      {/* Image Container */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square overflow-hidden bg-gray-50 block focus:ring-2 focus:ring-wood-brown outline-none"
        aria-label={`عرض تفاصيل ${translateProductName(product.name)}`}
      >
        <Image
          src={mainImage}
          alt={translateProductName(product.name)}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          loading="lazy"
        />
        <Image
          src={hoverImage}
          alt={`${translateProductName(product.name)} - منظر بديل`}
          fill
          className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />

        {/* Quick View Overlay on Hover (Desktop) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/10 backdrop-blur-[2px] hidden sm:flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-white text-wood-brown flex items-center justify-center shadow-xl">
                <Info size={20} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Content */}
      <div className="p-2 sm:p-3 pb-3 sm:pb-4 flex flex-col flex-grow text-right">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
          <span className="text-[6px] sm:text-[8px] font-bold text-wood-brown uppercase tracking-widest">
            {translateCategory(product.category)}
          </span>
          <div className="flex items-center gap-0.5" aria-label={`تقييم: ${product.rating || 5.0} من 5`}>
            <Star size={7} className="text-[#D4AF37] fill-[#D4AF37]" aria-hidden="true" />
            <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">{product.rating || 5.0}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[10px] sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1 line-clamp-1 group-hover:text-wood-brown transition-colors leading-tight">
          <Link
            href={`/products/${product.id}`}
            className="focus:underline outline-none"
          >
            {translateProductName(product.name)}
          </Link>
        </h3>

        {/* Price Section */}
        <div className="mb-1.5 sm:mb-2.5">
          <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-start gap-0 sm:gap-1.5">
            <span className="text-xs sm:text-base font-black text-wood-brown">
              {formatPrice(product.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[7px] sm:text-[10px] text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-1 sm:space-y-2">
          <WhatsAppButton
            phoneNumber={PHONE_NUMBER}
            message={`مرحباً، أود الاستفسار عن ${translateProductName(product.name)}`}
            productName={translateProductName(product.name)}
            className="w-full py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[8px] sm:text-xs shadow-sm"
          >
            <span>طلب عبر واتساب</span>
          </WhatsAppButton>

          <Link
            href={`/products/${product.id}`}
            className="block text-center text-[7px] sm:text-[9px] text-gray-400 hover:text-wood-brown transition-colors font-medium focus:ring-1 focus:ring-wood-brown/30 rounded"
            aria-label={`مشاهدة تفاصيل ${translateProductName(product.name)}`}
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard