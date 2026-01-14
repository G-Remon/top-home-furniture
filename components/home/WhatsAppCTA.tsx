// components/home/WhatsAppCTA.tsx
'use client'

import { PHONE_NUMBER } from '@/lib/constants'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { motion } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'

export default function WhatsAppCTA() {
  return (
    <section className="py-16 md:py-20 bg-wood-brown relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-right md:gap-12">
          
          {/* Content */}
          <motion.div 
            className="space-y-4 flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm 
                          rounded-full text-sm font-medium text-white border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>تواصل معنا الآن</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              جاهز لتجديد بيتك؟
            </h2>

            {/* Description */}
            <p className="max-w-2xl text-white/90 text-base md:text-lg leading-relaxed">
              تواصل معنا مباشرة عبر واتساب وسيقوم فريق خدمة العملاء بمساعدتك في اختيار أفضل القطع لمنزلك
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>استشارة مجانية</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>رد سريع</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>خدمة 24/7</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <WhatsAppButton
              phoneNumber={PHONE_NUMBER}
              message="مرحباً، أريد الاستفسار عن أثاث TOP HOME"
              size="lg"
              className="bg-white text-wood-brown hover:bg-white/95 shadow-xl 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300
                       px-8 py-4 text-lg font-bold rounded-2xl border-2 border-white/20"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span>تواصل عبر واتساب</span>
              </div>
            </WhatsAppButton>

            {/* Trust Badge */}
            <p className="text-white/70 text-xs mt-3 text-center">
              ✓ آلاف العملاء الراضين
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>
    </section>
  )
}