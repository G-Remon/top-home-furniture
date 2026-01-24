'use client'

import { motion, easeOut } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { productService } from '@/services/product.service'
import { Product } from '@/types/product'
import ProductSkeleton from '@/components/products/ProductSkeleton'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getProducts({ pageSize: 3 });
        setProducts(data.items);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: itemEase,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  }

  return (
    <section id="featured" className="relative py-24 bg-gradient-to-b from-off-white via-white to-off-white/50 overflow-hidden">
      {/* عناصر زخرفية خلفية */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-wood-brown/5 to-transparent rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-wood-brown/3 to-transparent rounded-full translate-x-48 translate-y-48" />

      {/* خطوط زخرفية */}
      <div className="absolute top-1/4 left-10 w-0.5 h-32 bg-gradient-to-b from-wood-brown/20 to-transparent" />
      <div className="absolute bottom-1/4 right-10 w-0.5 h-32 bg-gradient-to-t from-wood-brown/20 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* العنوان مع تحسينات */}
          <motion.div
            className="text-center mb-20 relative"
            variants={titleVariants}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-wood-brown fill-wood-brown" />
              <span className="text-wood-brown font-semibold tracking-wider uppercase text-sm">مجموعة مميزة</span>
              <Star className="w-6 h-6 text-wood-brown fill-wood-brown" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
              <span className="relative inline-block">
                منتجاتنا المميزة
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-wood-brown/0 via-wood-brown to-wood-brown/0 rounded-full" />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-soft-gray/80 max-w-2xl mx-auto leading-relaxed">
              اكتشف مجموعة مختارة بعناية من تصاميمنا الفريدة التي تجمع بين الأناقة الدقيقة والوظائف المثالية
            </p>

            <div className="mt-10 flex justify-center">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-wood-brown/30 to-transparent" />
            </div>
          </motion.div>

          {/* شبكة المنتجات مع تحسينات */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[...Array(3)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              variants={containerVariants}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group relative h-full"
                  whileHover={{
                    y: -12,
                    transition: { type: "spring", stiffness: 200, damping: 20 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* زر عرض المزيد مع تحسينات */}
          <motion.div
            className="text-center mt-20"
            variants={itemVariants}
          >
            <motion.a
              href="/products"
              className="relative inline-flex items-center gap-4 group overflow-hidden px-10 py-4 rounded-full 
                       bg-gradient-to-r from-wood-brown/95 to-wood-brown text-white font-semibold text-lg shadow-lg 
                       hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* تأثير خلفية عند hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-wood-brown to-charcoal/80 opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500" />

              {/* خط متحرك */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50 transform -translate-x-full 
                             group-hover:translate-x-0 transition-transform duration-700" />

              <span className="relative">استكشف جميع المنتجات</span>

              <ArrowLeft className="w-5 h-5 relative group-hover:translate-x-1 group-hover:-translate-x-1 
                                  transition-transform duration-300" />

              {/* نقاط زخرفية */}
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full group-hover:scale-150 
                             transition-transform duration-300" />
              <span className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/20 rounded-full group-hover:scale-150 
                             transition-transform duration-300 delay-150" />
            </motion.a>

            {/* نص توضيحي */}
            <p className="mt-6 text-soft-gray/70 text-sm">
              أكثر من 100+ تصميم فاخر ينتظرك في مجموعتنا الكاملة
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* حدود زخرفية للقسم */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-wood-brown/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-wood-brown/10 to-transparent" />
    </section>
  )
}
