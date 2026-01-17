// components/products/FloatingWhatsApp.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'

interface FloatingWhatsAppProps {
  phoneNumber: string
  product: Product
}

export default function FloatingWhatsApp({ phoneNumber, product }: FloatingWhatsAppProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const href = typeof window !== 'undefined' ? window.location.href : 'https://tophome.com'

  const message = `أريد الاستفسار عن المنتج التالي:

المنتج: ${product.name}
السعر: ${product.price.toLocaleString()} ج.م
الرابط: ${href}

أرجو التواصل معي للتفاصيل.`
  
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-charcoal">استفسر عن المنتج</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '/images/geld.png'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-charcoal line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-wood-brown font-bold text-lg">
                    {product.price.toLocaleString()} ج.م
                  </p>
                </div>
              </div>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 rounded-lg text-center transition-colors"
              >
                إرسال رسالة عبر واتساب
              </a>
              
              <p className="text-xs text-soft-gray text-center">
                متوسط وقت الرد: 5 دقائق
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 90 : 0 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  )
}