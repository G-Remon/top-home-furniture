'use client'

import { motion, easeOut } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { productService } from '@/services/product.service'
import { Product } from '@/types/product'
import ProductSkeleton from '@/components/products/ProductSkeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getProducts({ pageSize: 12 })
        setProducts(data.items)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const itemVariants = {
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

  const titleVariants = {
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

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* عناصر زخرفية خلفية محسنة */}
      <div className="absolute inset-0 pointer-events-none">
        {/* شبكة نقطية */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

        {/* دوائر متوهجة متناسقة مع ألوان الموقع */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-wood-brown/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 -right-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-wood-brown/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* خطوط زخرفية */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wood-brown/30 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wood-brown/30 to-transparent opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان المحسن */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16 relative"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-wood-brown/5 to-wood-brown/10 border border-wood-brown/20 shadow-sm">
              <Star className="w-4 h-4 text-wood-brown fill-wood-brown" />
              <span className="text-sm font-semibold bg-gradient-to-r from-wood-brown to-wood-brown/80 bg-clip-text text-transparent">
                مجموعة مميزة
              </span>
              <Star className="w-4 h-4 text-wood-brown fill-wood-brown" />
            </div>
          </motion.div>

          {/* العنوان الرئيسي */}
          <motion.h2
            variants={titleVariants}
            className="text-5xl md:text-6xl font-bold mb-4 relative inline-block"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              منتجاتنا المميزة
            </span>
            {/* تأثير تحتي متحرك */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wood-brown to-transparent"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h2>

          {/* الوصف */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            اكتشف مجموعة مختارة بعناية من تصاميمنا الفريدة التي تجمع بين الأناقة الدقيقة والوظائف المثالية
          </motion.p>
        </motion.div>

        {/* Slider المحسن */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="relative group">
              {/* أزرار التنقل المخصصة */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-charcoal hover:bg-wood-brown hover:text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:-translate-x-2"
                aria-label="السابق"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-charcoal hover:bg-wood-brown hover:text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-2"
                aria-label="التالي"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                spaceBetween={10}
                slidesPerView={2}
                centeredSlides={true}
                loop={true}
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
                  480: {
                    slidesPerView: 2.2,
                    spaceBetween: 12,
                  },
                  768: {
                    slidesPerView: 3.2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="!pb-20"
              >
                {products.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    {({ isActive }) => (
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

              {/* مؤشر العدد */}
              <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-500">
                <span className="font-bold text-wood-brown">{activeIndex + 1}</span>
                <span>/</span>
                <span>{products.length}</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* زر عرض المزيد المحسن */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 text-center"
        >
          <div className="relative inline-block group">
            {/* تأثير الوهج */}
            <div className="absolute inset-0 bg-gradient-to-r from-wood-brown to-[#D4AF37] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

            <button className="relative px-8 py-4 bg-gradient-to-r from-wood-brown to-[#D4AF37] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 group overflow-hidden">
              {/* خلفية متحركة */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-wood-brown opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 flex items-center gap-3">
                استكشف جميع المنتجات
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </span>

              {/* خط متحرك */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-white"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>

          {/* نص توضيحي */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-gray-500 flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-wood-brown animate-pulse" />
            أكثر من 100+ تصميم فاخر ينتظرك في مجموعتنا الكاملة
            <span className="w-2 h-2 rounded-full bg-wood-brown animate-pulse" />
          </motion.p>
        </motion.div>
      </div>

      {/* حدود زخرفية */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* تخصيص Swiper Pagination */
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