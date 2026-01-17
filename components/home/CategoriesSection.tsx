'use client'

import { categories } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function CategoriesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="categories" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-y">
              {categories.slice(0, 6).map((category, index) => (
                <div
                  key={category.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <CategoryCard
                    category={category}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="السابق"
          >
            <ChevronRight className="w-6 h-6 text-charcoal" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="التالي"
          >
            <ChevronLeft className="w-6 h-6 text-charcoal" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-brown text-white rounded-lg font-semibold text-base hover:bg-wood-brown/90 transition-colors duration-300 group"
          >
            <span>عرض جميع المنتجات</span>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }}
      className="group relative h-full"
    >
      <Link
        href={`/products?category=${category.id}`}
        className="block relative overflow-hidden rounded-xl md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3]"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />

          {category.image && (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {category.name}
            </h3>

            <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {category.description || 'اكتشف مجموعة واسعة من المنتجات عالية الجودة'}
            </p>

            <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-gray-900">
              <span>تصفح المنتجات</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 px-3 py-1 bg-wood-brown text-white text-xs font-semibold rounded-full">
          جديد
        </div>
      </Link>
    </motion.div>
  )
}