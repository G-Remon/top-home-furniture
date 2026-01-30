'use client'

import { categories } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useRef } from 'react'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

export default function CategoriesSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="categories" className="relative py-28 bg-white overflow-hidden">
      {/* Background elements for harmony */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-wood-brown/5 blur-[120px] rounded-full -z-0" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-charcoal/[0.02] blur-[100px] rounded-full -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-right">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-wood-brown/10 text-wood-brown rounded-full text-xs font-bold mb-6 border border-wood-brown/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>فئات مختارة بعناية</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-5xl md:text-7xl font-black text-charcoal leading-tight tracking-tight"
            >
              تسوق حسب <span className="text-wood-brown">الغرفة</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-soft-gray text-lg md:text-xl leading-relaxed font-medium"
            >
              اختر الفئة التي تناسب احتياجات منزلك من مجموعتنا المتنوعة والمصممة لتغطي كافة أركان حياتك اليومية
            </motion.p>
          </div>

          {/* Navigation Arrows - Improved styling */}
          <div className="flex gap-4 mb-2">
            <button
              ref={prevRef}
              aria-label="الفئة التالية"
              className="w-14 h-14 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-center justify-center text-charcoal hover:bg-wood-brown hover:text-white transition-all duration-500 hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] focus:ring-4 focus:ring-wood-brown/20 outline-none"
            >
              <ChevronRight size={24} />
            </button>
            <button
              ref={nextRef}
              aria-label="الفئة السابقة"
              className="w-14 h-14 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-center justify-center text-charcoal hover:bg-wood-brown hover:text-white transition-all duration-500 hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] focus:ring-4 focus:ring-wood-brown/20 outline-none"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4 }
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            freeMode={true}
            loop={true}
            dir="rtl"
            className="!pb-16"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <CategoryCard category={category} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: any }) {
  return (
    <Link
      href={`/products?category=${category.id}`}
      className="group relative block aspect-[3/4.5] overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg focus:ring-4 focus:ring-[#D4AF37]/30 outline-none"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end text-right">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
          {category.name}
        </h3>
        <p className="text-white/70 text-sm mb-6 line-clamp-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {category.description || 'اكتشف مجموعتنا الكاملة'}
        </p>

        <div className="inline-flex items-center gap-2 text-[#D4AF37] font-bold text-sm transform translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
          تصفح القسم <ArrowLeft size={16} />
        </div>
      </div>

      {/* Border Highlight */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-500 rounded-[2rem] pointer-events-none" />
    </Link>
  )
}