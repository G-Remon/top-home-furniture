// components/home/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main-hero.png"
          alt="أثاث فاخر من TOP HOME"
          fill
          priority
          className="object-cover object-center"
          quality={95}
          sizes="100vw"
          style={{
            objectPosition: 'center 30%'
          }}
        />
        {/* تدرجات شفافة لتحسين قراءة النص */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        
        {/* طبقة إضافية لتحسين التباين */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            TOP HOME
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 font-medium leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            فن صناعة الأثاث الفاخر حيث تلتقي الأناقة بالراحة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <WhatsAppButton
              phoneNumber="+201234567890"
              message="مرحباً، أريد الاستفسار عن أثاث TOP HOME"
              size="lg"
              className="text-lg px-10 py-4 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            />

            <motion.a
              href="#featured"
              className="inline-flex items-center gap-3 text-white hover:text-primary transition-all duration-300 group"
              whileHover={{ y: -3 }}
            >
              <span className="text-lg font-medium">استعرض المجموعة</span>
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* مؤشر التمرير */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center hover:border-white transition-colors">
          <motion.div 
            className="w-1.5 h-4 bg-white rounded-full mt-3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  )
}