// components/home/WhyTopHome.tsx
'use client'

import { trustPoints } from '@/lib/constants'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Award, Palette, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Quality: Award,
  Design: Palette,
  Delivery: Truck,
  Warranty: ShieldCheck,
}

export default function WhyTopHome() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-off-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight"
          >
            لماذا تختار TOP HOME؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed"
          >
            مجموعة من الأسباب التي تجعل أثاثنا الاختيار الأفضل لمنزلك
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => {
            const Icon = iconMap[point.icon as string] || Award

            return (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="group relative"
              >
                <div className="relative rounded-2xl bg-white p-6 md:p-8 text-center 
                              border border-gray-100 hover:border-wood-brown/30
                              shadow-sm hover:shadow-xl
                              transition-all duration-300">
                  
                  {/* Icon Container */}
                  <div className="mb-5 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-xl 
                               bg-wood-brown/10 text-wood-brown
                               group-hover:bg-wood-brown group-hover:text-white
                               transition-all duration-300"
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-charcoal 
                               group-hover:text-wood-brown transition-colors duration-300">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.description}
                  </p>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                                group-hover:border-wood-brown/20 transition-all duration-300 
                                pointer-events-none" />
                </div>

                {/* Bottom Shadow */}
                <div className="absolute -bottom-1 left-4 right-4 h-2 bg-wood-brown/5 blur-sm 
                              rounded-b-2xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300" />
              </motion.article>
            )
          })}
        </div>

        {/* Optional: Bottom CTA or Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full 
                        border border-wood-brown/20 shadow-sm">
            <Award className="w-5 h-5 text-wood-brown" />
            <span className="text-sm font-semibold text-charcoal">
              أكثر من 5000 عميل راضٍ عن خدماتنا
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}