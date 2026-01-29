'use client'

import { motion, easeOut, Variants } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, Star, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { useEffect, useState, useRef, useCallback, memo } from 'react'
import { productService } from '@/services/product.service'
import { Product } from '@/types/product'
import ProductSkeleton from '@/components/products/ProductSkeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Script from 'next/script'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/keyboard'

// --- Constants & Variants ---

const itemEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: itemEase,
    },
  },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
}

// --- Sub-components ---

const BackgroundDecorations = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Dot grid */}
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

    {/* Glowing blobs */}
    <div className="absolute top-20 -left-20 w-72 h-72 bg-wood-brown/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
    <div className="absolute top-40 -right-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-wood-brown/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

    {/* Decorative lines */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wood-brown/30 to-transparent opacity-30" />
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wood-brown/30 to-transparent opacity-30" />
  </div>
))
BackgroundDecorations.displayName = 'BackgroundDecorations'

const SectionBadge = memo(({ variants }: { variants: Variants }) => (
  <motion.div variants={variants} className="inline-flex items-center gap-2 mb-6">
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-wood-brown/5 to-wood-brown/10 border border-wood-brown/20 shadow-sm">
      <Star className="w-4 h-4 text-wood-brown fill-wood-brown" aria-hidden="true" />
      <span className="text-sm font-semibold bg-gradient-to-r from-wood-brown to-wood-brown/80 bg-clip-text text-transparent">
        مجموعة مميزة
      </span>
      <Star className="w-4 h-4 text-wood-brown fill-wood-brown" aria-hidden="true" />
    </div>
  </motion.div>
))
SectionBadge.displayName = 'SectionBadge'

// --- Main Component ---

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getProducts({ pageSize: 12 })
        setProducts(data.items || [])
      } catch (err) {
        console.error('Error fetching featured products:', err)
        setError('تعذر تحميل المنتجات حالياً. يرجى المحاولة مرة أخرى.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext()
  }, [])

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }, [])

  const onSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper
  }, [])

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || ''}/products/${product.id}`,
      "name": product.name,
      "image": product.images?.[0] || '',
      "description": product.description,
      "offers": {
        "@type": "Offer",
        "price": product.currentPrice,
        "priceCurrency": product.currency || "EGP",
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    }))
  }

  return (
    <section id="featured" className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50" aria-labelledby="featured-title">
      <BackgroundDecorations />

      {products.length > 0 && (
        <Script
          id="products-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16 relative"
        >
          <SectionBadge variants={itemVariants} />

          <motion.h2
            id="featured-title"
            variants={titleVariants}
            className="text-5xl md:text-6xl font-bold mb-4 relative inline-block"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              منتجاتنا المميزة
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wood-brown to-transparent"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              aria-hidden="true"
            />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            اكتشف مجموعة مختارة بعناية من تصاميمنا الفريدة التي تجمع بين الأناقة الدقيقة والوظائف المثالية
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {loading ? (
            <>
              {/* Skeleton for Slider (Mobile/Tablet) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-4">
                {[...Array(3)].map((_, i) => (
                  <ProductSkeleton key={`skeleton-mobile-${i}`} />
                ))}
              </div>
              {/* Skeleton for Grid (Desktop) */}
              <div className="hidden lg:grid grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <ProductSkeleton key={`skeleton-desktop-${i}`} />
                ))}
              </div>
            </>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-red-500 bg-red-50 rounded-3xl border border-red-100 p-8">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="text-lg font-bold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                aria-label="إعادة تحميل الصفحة"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <div className="relative group">
              {/* --- Desktop Grid View (1024px+) --- */}
              <div className="hidden lg:grid lg:grid-cols-5 gap-6">
                {products.slice(0, 10).map((product) => (
                  <ProductCard key={`grid-${product.id}`} product={product} />
                ))}
              </div>

              {/* --- Mobile/Tablet Slider View (<1024px) --- */}
              <div className="lg:hidden">
                {/* Navigation buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-charcoal hover:bg-wood-brown hover:text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:-translate-x-2 focus:ring-2 focus:ring-wood-brown outline-none"
                  aria-label="المنتج السابق"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-charcoal hover:bg-wood-brown hover:text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-2 focus:ring-2 focus:ring-wood-brown outline-none"
                  aria-label="المنتج التالي"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard]}
                  spaceBetween={10}
                  slidesPerView={2}
                  centeredSlides={true}
                  loop={products.length > 3}
                  keyboard={{ enabled: true }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  effect="coverflow"
                  coverflowEffect={{
                    rotate: 0,
                    stretch: -10,
                    depth: 50,
                    modifier: 1.5,
                    slideShadows: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    480: { slidesPerView: 2.2, spaceBetween: 12 },
                    768: { slidesPerView: 3.2, spaceBetween: 16 },
                  }}
                  onSwiper={onSwiper}
                  onSlideChange={onSlideChange}
                  className="!pb-20"
                >
                  {products.map((product) => (
                    <SwiperSlide key={`slide-${product.id}`}>
                      {({ isActive }: { isActive: boolean }) => (
                        <div
                          className={`transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
                            }`}
                        >
                          <ProductCard product={product} />
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Slider Progress Indicator */}
                <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-500" aria-live="polite">
                  <span className="font-bold text-wood-brown">{activeIndex + 1}</span>
                  <span>/</span>
                  <span>{products.length}</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Explore More Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 text-center"
        >
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-wood-brown to-[#D4AF37] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

            <motion.a
              href="/products"
              className="relative px-8 py-4 bg-gradient-to-r from-wood-brown to-[#D4AF37] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 group overflow-hidden focus:ring-4 focus:ring-wood-brown/30 outline-none"
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-wood-brown opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 flex items-center gap-3">
                استكشف جميع المنتجات
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </span>

              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-white"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-gray-500 flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-wood-brown animate-pulse" aria-hidden="true" />
            أكثر من 100+ تصميم فاخر ينتظرك في مجموعتنا الكاملة
            <span className="w-2 h-2 rounded-full bg-wood-brown animate-pulse" aria-hidden="true" />
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" aria-hidden="true" />

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #D4AF37, #A1821C);
          width: 30px;
          border-radius: 5px;
        }
        .swiper-pagination-bullet:hover {
          background: #D4AF37;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}