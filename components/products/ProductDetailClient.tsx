'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types/product'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { PHONE_NUMBER } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Shield, Truck, Award, CheckCircle, Star, Package, AlertCircle } from 'lucide-react'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // Handle images safely with proper type checking
  const images = useMemo(() => {
    if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
      return ['/images/geld.png']
    }
    
    // Filter out any invalid image paths
    return product.images.filter((img): img is string => {
      return typeof img === 'string' && img.trim() !== ''
    })
  }, [product.images])

  // Handle image errors
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }, [])

  // Get current image with error handling
  const currentImage = useMemo(() => {
    if (!images.length) return '/images/geld.png'
    if (imageErrors[selectedImage]) return '/images/geld.png'
    return images[selectedImage] || '/images/geld.png'
  }, [images, selectedImage, imageErrors])

  // قيمة افتراضية للميزات
  const features = useMemo(() => {
    return product.features && Array.isArray(product.features) && product.features.length > 0
      ? product.features
      : ['جودة عالية', 'تصميم عصري', 'سهولة التركيب', 'ضمان شامل']
  }, [product.features])

  // قيمة افتراضية للوقت التوصيل
  const deliveryTime = useMemo(() => {
    return product.deliveryTime || '2-5 أيام عمل'
  }, [product.deliveryTime])

  // حساب التوفير
  const savings = useMemo(() => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return (product.originalPrice - product.price).toLocaleString()
    }
    return null
  }, [product.originalPrice, product.price])

  // تحسين سعر العرض
  const formattedPrice = useMemo(() => {
    return product.price.toLocaleString('en-US')
  }, [product.price])

  const formattedOriginalPrice = useMemo(() => {
    return product.originalPrice?.toLocaleString('en-US')
  }, [product.originalPrice])

  return (
    <>
      <section className="grid gap-8 lg:gap-12 lg:grid-cols-2">
        {/* معرض الصور */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
          role="region"
          aria-label="معرض صور المنتج"
        >
          {/* الصورة الرئيسية */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <Image
                  src={currentImage}
                  alt={`${product.name} - الصورة ${selectedImage + 1} من ${images.length}`}
                  fill
                  priority
                  className="object-cover p-6"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => handleImageError(selectedImage)}
                  quality={90}
                  unoptimized={currentImage.startsWith('http')}
                  draggable={false}
                />
                
                {/* مؤشر تحميل الصورة */}
                {imageErrors[selectedImage] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center p-4">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">تعذر تحميل الصورة</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex items-center gap-1.5 bg-wood-brown text-white px-3 py-1.5 
                            rounded-lg text-sm font-bold shadow-md"
                  aria-label="منتج جديد"
                >
                  <Star className="w-3.5 h-3.5 fill-white" />
                  جديد
                </motion.div>
              )}

              {product.discount && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md"
                  aria-label={`خصم ${product.discount} بالمئة`}
                >
                  خصم {product.discount}%
                </motion.div>
              )}
            </div>

            {/* ضمان */}
            <div className="absolute top-4 right-4 z-10">
              <div 
                className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 
                          rounded-lg shadow-md border border-gray-200"
                aria-label={`ضمان ${product.warranty || '3 سنوات'}`}
              >
                <Shield className="w-4 h-4 text-wood-brown" />
                <span className="text-charcoal font-semibold text-sm">
                  ضمان {product.warranty || '3 سنوات'}
                </span>
              </div>
            </div>
          </div>

          {/* الصور المصغرة */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedImage(index)
                    }
                  }}
                  className={cn(
                    "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-wood-brown focus:ring-offset-2",
                    selectedImage === index 
                      ? "border-wood-brown shadow-md" 
                      : "border-gray-200 opacity-60 hover:opacity-100 hover:border-wood-brown/50"
                  )}
                  aria-label={`عرض الصورة ${index + 1}`}
                  aria-current={selectedImage === index ? 'true' : 'false'}
                  type="button"
                >
                  <div className="relative w-full h-full">
                    {imageErrors[index] ? (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-gray-400" />
                      </div>
                    ) : (
                      <Image
                        src={image}
                        alt={`${product.name} مصغرة ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        onError={() => handleImageError(index)}
                        loading="lazy"
                        quality={50}
                        unoptimized={image.startsWith('http')}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* مميزات سريعة */}
          <div className="grid grid-cols-2 gap-3">
            <div 
              className="bg-off-white rounded-xl p-4 text-center border border-gray-100 hover:border-wood-brown/30 transition-colors"
              aria-label="توصيل مجاني"
            >
              <Truck className="w-6 h-6 text-wood-brown mx-auto mb-2" />
              <p className="text-sm font-semibold text-charcoal">توصيل مجاني</p>
            </div>
            <div 
              className="bg-off-white rounded-xl p-4 text-center border border-gray-100 hover:border-wood-brown/30 transition-colors"
              aria-label="جودة عالية"
            >
              <Award className="w-6 h-6 text-wood-brown mx-auto mb-2" />
              <p className="text-sm font-semibold text-charcoal">جودة عالية</p>
            </div>
          </div>
        </motion.div>

        {/* تفاصيل المنتج */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          role="region"
          aria-label="تفاصيل المنتج"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span 
              className="px-3 py-1.5 bg-off-white text-wood-brown text-sm font-bold 
                         rounded-lg border border-wood-brown/20"
              aria-label={`فئة المنتج: ${product.category}`}
            >
              {product.category}
            </span>
            
            {product.rating && (
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-off-white rounded-lg border border-gray-200"
                aria-label={`تقييم المنتج: ${product.rating} من 5`}
              >
                <Star className="w-4 h-4 text-wood-brown fill-wood-brown" />
                <span className="text-sm font-bold text-charcoal">{product.rating}</span>
              </div>
            )}
          </div>

          {/* العنوان */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            {product.name}
          </h1>

          {/* الوصف */}
          <div className="bg-off-white/50 rounded-xl p-5 border border-gray-100">
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {product.fullDescription || 'لا يوجد وصف مفصل لهذا المنتج.'}
            </p>
          </div>

          {/* السعر */}
          <div className="p-6 bg-white rounded-2xl border-2 border-wood-brown/20 space-y-4">
            <div className="flex items-end flex-wrap gap-4">
              <div className="flex items-baseline gap-2">
                <span 
                  className="text-4xl md:text-5xl font-bold text-wood-brown"
                  aria-label={`السعر: ${formattedPrice} جنيه`}
                >
                  {formattedPrice}
                </span>
                <span className="text-xl text-charcoal font-medium">ج.م</span>
              </div>
              
              {product.originalPrice && product.originalPrice > product.price && savings && (
                <>
                  <span 
                    className="text-xl text-gray-400 line-through mb-1"
                    aria-label={`السعر الأصلي: ${formattedOriginalPrice} جنيه`}
                  >
                    {formattedOriginalPrice}
                  </span>
                  <span 
                    className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-bold mb-1"
                    aria-label={`توفير: ${savings} جنيه`}
                  >
                    وفر {savings} ج.م
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-gray-200" />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-wood-brown flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">التوصيل خلال</p>
                  <p className="font-semibold text-charcoal text-sm">{deliveryTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">متوفر</p>
                  <p className="font-semibold text-charcoal text-sm">
                    {product.stock || 15} قطعة
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* المواصفات والمميزات */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* المواصفات */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-charcoal flex items-center gap-2">
                <Package className="w-5 h-5 text-wood-brown flex-shrink-0" />
                المواصفات
              </h3>
              <div className="bg-off-white rounded-xl p-4 space-y-3 border border-gray-100">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">الخامة</span>
                  <span className="font-semibold text-charcoal text-sm">
                    {product.material || 'خشب عالي الجودة'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">الأبعاد</span>
                  <span className="font-semibold text-charcoal text-sm">
                    {product.dimensions || 'غير محدد'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الوزن</span>
                  <span className="font-semibold text-charcoal text-sm">
                    {product.weight || 'غير محدد'}
                  </span>
                </div>
              </div>
            </div>

            {/* المميزات */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-charcoal flex items-center gap-2">
                <Star className="w-5 h-5 text-wood-brown flex-shrink-0" />
                المميزات
              </h3>
              <div className="bg-off-white rounded-xl p-4 space-y-2.5 border border-gray-100">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2 text-charcoal"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-wood-brown flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* زر الطلب */}
          <div className="pt-4">
            <WhatsAppButton
              phoneNumber={PHONE_NUMBER}
              message={`استفسار عن: ${product.name} - السعر: ${product.price.toLocaleString()} ج.م`}
              productName={product.name}
              size="lg"
              className="w-full justify-center text-lg font-bold py-4 rounded-xl 
                       bg-wood-brown hover:bg-wood-brown/90 text-white
                       shadow-lg hover:shadow-xl transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-wood-brown focus:ring-offset-2"
              aria-label={`اطلب ${product.name} عبر واتساب`}
            >
              اطلب الآن عبر واتساب
            </WhatsAppButton>
            
            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                ضمان رسمي
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                توصيل مجاني
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                إرجاع 14 يوم
              </span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* زر واتساب عائم */}
      <WhatsAppButton
        phoneNumber={PHONE_NUMBER}
        message={`استفسار عن: ${product.name}`}
        productName={product.name}
        variant="floating"
        className="md:hidden"
      />
    </>
  )
}