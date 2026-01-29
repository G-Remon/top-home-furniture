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
    <section id="categories" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-right">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs font-bold mb-4"
            >
              <Sparkles className="w-3 h-3" />
              <span>فئات مميزة</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            >
              تسوق حسب <span className="text-[#D4AF37]">الغرفة</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-500 text-lg leading-relaxed"
            >
              اختر الفئة التي تناسب احتياجات منزلك من مجموعتنا المتنوعة والمصممة بعناية لتغطي كافة أركان منزلك
            </motion.p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-12 h-12 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
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
      className="group relative block aspect-[3/4.5] overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg"
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