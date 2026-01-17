// components/home/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollToSection = () => {
    const section = document.getElementById('featured')
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <Image
            src="/images/main-hero.png"
            alt="أثاث فاخر من TOP HOME"
            fill
            priority
            className="object-cover"
            quality={100}
            sizes="100vw"
            style={{
              objectPosition: 'center 40%',
            }}
          />
        </motion.div>

        {/* Multilayered Premium Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-wood-brown font-medium text-xs sm:text-sm uppercase mb-6"
            >
              Excellence in Craftsmanship
            </motion.div>

            {/* Main Title */}
            <div className="mb-8 relative inline-block">
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                style={{
                  lineHeight: 0.9,
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                }}
              >
                TOP <span className="text-wood-brown">HOME</span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wood-brown to-transparent"
              />
            </div>

            {/* Subtitle / Description */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 font-light leading-relaxed max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              فن صناعة الأثاث الفاخر<br className="hidden sm:block" />
              حيث يلتقي التصميم العصري بأعلى معايير الجودة
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <WhatsAppButton
                phoneNumber="+201234567890"
                message="مرحباً، أريد الاستفسار عن أثاث TOP HOME"
                size="lg"
                className="w-full sm:w-auto min-w-[200px] bg-wood-brown hover:bg-wood-brown/90 text-white shadow-2xl shadow-wood-brown/20 py-4 px-10 rounded-full"
              />

              <motion.button
                onClick={scrollToSection}
                className="w-full sm:w-auto group inline-flex items-center gap-3 text-white border border-white/30 hover:border-white/60 px-10 py-4 rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-base font-semibold">استعرض المجموعة</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16 flex items-center justify-center gap-6 opacity-60"
            >
              <div className="h-px w-8 bg-white/30" />
              <span className="text-xs uppercase tracking-widest font-light">Quality Guaranteed</span>
              <div className="h-px w-8 bg-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.button
        onClick={scrollToSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">Scroll</span>
        </div>
      </motion.button>
    </section>
  )
}