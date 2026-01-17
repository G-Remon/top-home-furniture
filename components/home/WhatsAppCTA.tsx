// components/home/WhatsAppCTA.tsx
'use client'

import { PHONE_NUMBER } from '@/lib/constants'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { motion } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'

export default function WhatsAppCTA() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8b7355 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-wood-brown/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-wood-brown/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            <div className="text-center lg:text-right flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-wood-brown/10 text-wood-brown rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-wood-brown/20"
              >
                <Sparkles size={14} />
                <span>خدمة متميزة</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
              >
                صمم بيت أحلامك <br /> <span className="text-wood-brown">بلمسة واحدة</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg md:text-xl max-w-2xl lg:ml-0 lg:mr-auto leading-relaxed mb-8"
              >
                فريقنا الجاهز لمساعدتك في اختيار قطع الأثاث المثالية التي تعبر عن ذوقك الرفيع وتناسب مساحة منزلك.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-shrink-0"
            >
              <WhatsAppButton
                phoneNumber={PHONE_NUMBER}
                message="مرحباً، أريد الاستفسار عن أثاث TOP HOME"
                size="lg"
                className="bg-wood-brown hover:bg-wood-brown/90 text-white shadow-2xl shadow-wood-brown/20 px-12 py-6 text-xl font-bold rounded-2xl group"
              >
                <div className="flex items-center gap-4">
                  <span>تواصل معنا الآن</span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <MessageCircle size={24} />
                  </div>
                </div>
              </WhatsAppButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}