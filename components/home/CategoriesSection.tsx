'use client'

import { categories } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function CategoriesSection() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

  return (
    <section id="categories" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wood-brown/10 text-wood-brown rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>تصفح فئاتنا</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight"
          >
            تسوق حسب الفئة
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed"
          >
            اختر الفئة التي تناسب احتياجات منزلك من مجموعتنا المتنوعة والمصممة بعناية
          </motion.p>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center md:justify-end gap-4 mb-6 md:mb-8">
            <button
              ref={(node) => setPrevEl(node)}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-wood-brown hover:text-white hover:border-wood-brown transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="الشريحة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              ref={(node) => setNextEl(node)}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-wood-brown hover:text-white hover:border-wood-brown transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="الشريحة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            navigation={{
              prevEl,
              nextEl,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            keyboard={{
              enabled: true,
            }}
            loop={true}
            grabCursor={true}
            className="!pb-12"
            dir="rtl"
          >
            {categories.slice(0, 8).map((category, index) => (
              <SwiperSlide key={category.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="h-full"
                >
                  <CategoryCard category={category} index={index} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-brown text-white rounded-lg font-semibold text-base hover:bg-wood-brown/90 transition-colors duration-300 group shadow-lg hover:shadow-xl"
          >
            <span>استعرض جميع الفئات</span>
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description?: string
    image?: string
  }
  index: number
}

function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <div className="group relative h-full">
      <Link
        href={`/products?category=${category.id}`}
        className="block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[3/4] h-full"
      >
        {/* Image Container */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />

          {/* Image */}
          {category.image && (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={index < 4}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="transform transition-all duration-500 group-hover:-translate-y-2">
            {/* Category Name */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
              {category.name}
            </h3>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg mb-6 line-clamp-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              {category.description || 'اكتشف مجموعة واسعة من المنتجات عالية الجودة'}
            </p>

            {/* CTA Button */}
            <div className="inline-flex items-center gap-3 text-base font-medium px-6 py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 transition-all duration-500 group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transform translate-y-4 group-hover:translate-y-0">
              <span>تصفح المنتجات</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-2" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-wood-brown to-amber-700 text-white text-sm font-semibold rounded-full shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
          جديد
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-1 bg-white/50 rounded-full" />
        </div>
      </Link>
    </div>
  )
}