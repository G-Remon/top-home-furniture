import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, ShoppingBag } from 'lucide-react'

import { Product } from '@/types/product'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { useState } from 'react'
import { PHONE_NUMBER } from '@/lib/constants'
import { getFullImageUrl } from '@/lib/utils'
import {
  translateCategory,
  translateProductName,
  translateDescription
} from '@/lib/translate'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // image fix
  const productImage = (() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      const first = product.images[0];
      const url = typeof first === 'string' ? first : first.url;
      return getFullImageUrl(url);
    }
    return '/images/geld.png';
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
      whileHover={{
        y: -15,
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      }}
    >
      <div className="relative z-10 bg-gradient-to-b from-white/95 to-white/80 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
        {/* image */}
        <Link
          href={`/products/${product.id}`}
          className="block relative aspect-[3/4] overflow-hidden"
        >
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-full w-full"
          >
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
            />
          </motion.div>
        </Link>

        {/* content */}
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-xs text-amber-700 mb-2">
            {translateCategory(product.category)}
          </span>

          <h3 className="text-xl font-bold mb-3 line-clamp-2">
            {translateProductName(product.name)}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {translateDescription(product.description || product.shortDescription || '')}
          </p>

          <div className="mt-auto pt-4 border-t border-amber-100/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-amber-700">
                {(product.currentPrice || 0).toLocaleString()} ج.م
              </span>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/products/${product.id}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-amber-300 rounded-xl text-sm font-bold text-amber-700"
              >
                <Eye className="w-4 h-4" />
                التفاصيل
              </Link>

              <WhatsAppButton
                phoneNumber={PHONE_NUMBER}
                message={`استفسار عن المنتج: ${translateProductName(product.name)}`}
                productName={translateProductName(product.name)}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold"
                showIcon={false}
                size="sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  اطلب الآن
                </div>
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
