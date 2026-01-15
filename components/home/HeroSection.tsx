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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* الصورة الخلفية مع تحسينات الأداء */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main-hero.png"
          alt="أثاث فاخر من TOP HOME - تصميم داخلي فاخر بأثاث عالي الجودة"
          fill
          priority
          className="object-cover"
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ 
            objectPosition: 'center 35%',
            filter: 'brightness(0.85)'
          }}
        />
        
        {/* تدرج لوني محسن للقراءة */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* تأثير Vignette محسن */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)'
        }} />
      </div>

      {/* المحتوى الرئيسي مع تحسينات التباين */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* العنوان الرئيسي بمقاسات متجاوبة أفضل */}
            <div className="mb-6 sm:mb-8">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  fontWeight: 700,
                  lineHeight: 1.1
                }}
              >
                TOP HOME
              </motion.h1>
              
              {/* خط تحت العنوان */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-24 h-0.5 bg-white/30 mx-auto mt-6"
              />
            </div>

            {/* الوصف مع تحسين التباين */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/95 mb-10 sm:mb-12 font-normal leading-relaxed max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                fontWeight: 400,
                letterSpacing: '0.02em'
              }}
            >
              فن صناعة الأثاث الفاخر<br className="sm:hidden" /> حيث تلتقي الأناقة بالراحة
            </motion.p>

            {/* الأزرار مع مسافات محسنة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-10"
            >
              <WhatsAppButton
                phoneNumber="+201234567890"
                message="مرحباً، أريد الاستفسار عن أثاث TOP HOME"
                size="lg"
                className="min-w-[200px] sm:min-w-[220px] text-base px-6 sm:px-8 py-3.5 sm:py-4 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                aria-label="تواصل معنا عبر واتساب للاستفسار عن الأثاث"
              />

              <motion.button
                onClick={scrollToSection}
                className="group inline-flex items-center gap-2.5 text-white hover:text-white transition-all duration-300 min-w-[200px] sm:min-w-[220px] justify-center px-6 sm:px-8 py-3.5 sm:py-4 border border-white/30 hover:border-white/60 rounded-md backdrop-blur-sm bg-white/5 hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="استعرض مجموعات الأثاث المميزة"
              >
                <span className="text-base font-medium">استعرض المجموعة</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* نص مساعد صغير */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-sm text-white/60 mt-8 sm:mt-10 font-light"
            >
              اكتشف مجموعتنا الحصرية من الأثاث المصمم بعناية
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* مؤشر التمرير محسن */}
      <motion.button
        onClick={scrollToSection}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full p-2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
        }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
        }}
        aria-label="التمرير لأسفل لعرض المنتجات"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            className="text-white/60 text-xs font-light"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            اكتشف المزيد
          </motion.div>
          
          <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center items-start pt-2 hover:border-white/60 transition-colors duration-300">
            <motion.div 
              className="w-1 h-2 bg-white/80 rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.8,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.button>
    </section>
  )
}