// components/home/HeroSection.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const slides = [
  {
    image: '/images/main-hero.png',
    title: 'TOP HOME',
    accent: 'HOME',
    tagline: 'التميز في الحرفية',
    description: 'فن صناعة الأثاث الفاخر حيث يلتقي التصميم العصري بأعلى معايير الجودة'
  },
  {
    image: '/images/living.png',
    title: 'أناقة التصميم',
    accent: 'العصري',
    tagline: 'مجموعتنا الجديدة',
    description: 'حوّل غرفة معيشتك إلى مساحة مريحة وجميلة مع أحدث تصاميمنا'
  },
  {
    image: '/images/Sleeping.png',
    title: 'راحة غرف',
    accent: 'النوم',
    tagline: 'جودة تدوم',
    description: 'نقدم لك الحلول المثالية لنوم عميق وتصميم متفرد يناسب ذوقك الرفع'
  }
]

export default function HeroSection() {
  const scrollToSection = () => {
    const section = document.getElementById('featured')
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Parallax]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        parallax={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full overflow-hidden">
            {/* Background Image with Zoom Animation */}
            <div className="absolute inset-0">
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
                className="relative h-full w-full"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                  quality={90}
                />
                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="relative z-20 h-full flex items-center justify-center pt-20">
              <div className="container mx-auto px-6 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {/* Tagline */}
                  <span className="inline-block text-[#D4AF37] font-bold text-xs sm:text-sm uppercase tracking-[0.4em] mb-6">
                    {slide.tagline}
                  </span>

                  {/* Main Heading */}
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
                    {slide.title.split(' ')[0]} <span className="text-[#D4AF37]">{slide.accent}</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <WhatsAppButton
                      phoneNumber="+201234567890"
                      message={`مرحباً، أود الاستفسار عن ${slide.title}`}
                      size="lg"
                      className="w-full sm:w-auto min-w-[220px] bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white shadow-2xl shadow-[#D4AF37]/30 py-4 sm:py-5 rounded-full text-lg"
                    />
                    <button
                      onClick={scrollToSection}
                      className="w-full sm:w-auto px-10 py-4 sm:py-5 rounded-full border border-white/30 backdrop-blur-md bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 font-bold group flex items-center justify-center gap-2"
                    >
                      عرض المجموعة
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rotate-180" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 cursor-pointer hidden sm:block"
        onClick={scrollToSection}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">تصفح</span>
        </motion.div>
      </div>

      {/* Style for CustomPagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #D4AF37 !important;
          width: 30px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </section>
  )
}