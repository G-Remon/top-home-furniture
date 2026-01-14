// components/home/CategoriesSection.tsx
'use client'

import { categories } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wood-brown/10 text-wood-brown rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>تصفح فئاتنا</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight"
          >
            تسوق حسب الفئة
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed"
          >
            اختر الفئة التي تناسب احتياجات منزلك من مجموعتنا المتنوعة والمصممة بعناية
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-brown text-white rounded-full font-semibold text-base hover:bg-wood-brown/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
          >
            <span>عرض جميع المنتجات</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
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
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <Link
        href={`/products?category=${category.id}`}
        className="block relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Image Container */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Placeholder Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
          
          {/* Image */}
          {category.image && (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          )}

          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          animate={{
            opacity: isHovered ? 0.95 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-white/0"
          animate={{
            borderColor: isHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%", skewX: -20 }}
          animate={{
            x: isHovered ? "200%" : "-100%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
          <motion.div
            animate={{
              y: isHovered ? 0 : 8,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Name */}
            <motion.h3
              className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {category.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-white/90 text-sm md:text-base mb-4 line-clamp-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
            >
              {category.description || 'اكتشف مجموعة واسعة من المنتجات عالية الجودة'}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="inline-flex items-center gap-2 text-sm md:text-base font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300 backdrop-blur-md"
              animate={{
                backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.15)",
                color: isHovered ? "#4A4A4A" : "#FFFFFF",
              }}
              transition={{ duration: 0.3 }}
            >
              <span>تصفح المنتجات</span>
              <motion.div
                animate={{
                  x: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Corner Decoration */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : -180,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white -rotate-45" />
          </div>
        </motion.div>

        {/* Product Count Badge (Optional) */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1.5 bg-wood-brown text-white text-xs md:text-sm font-bold rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          جديد
        </motion.div>
      </Link>
    </motion.div>
  )
}