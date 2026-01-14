'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Filter } from 'lucide-react'

import ProductGrid from '@/components/products/ProductGrid'
import { products } from '@/lib/constants'

// فئات الأثاث
const furnitureCategories = [
  { id: 'all', name: 'الكل', icon: '🏠' },
  { id: 'غرف نوم', name: 'غرف نوم', icon: '🛏️' },
  { id: 'غرف معيشة', name: 'غرف معيشة', icon: '🛋️' },
  { id: 'غرف طعام', name: 'غرف طعام', icon: '🍽️' },
  { id: 'مكاتب', name: 'مكاتب', icon: '💼' },
  { id: 'مطابخ', name: 'مطابخ', icon: '🍳' },
  { id: 'حمامات', name: 'حمامات', icon: '🚿' },
  { id: 'غرف أطفال', name: 'غرف أطفال', icon: '👶' },
  { id: 'كراسي وطاولات', name: 'كراسي وطاولات', icon: '🪑' },
  { id: 'خزائن وأرفف', name: 'خزائن وأرفف', icon: '📚' },
  { id: 'أنتريهات', name: 'أنتريهات', icon: '🛋️' },
  { id: 'ديكورات', name: 'ديكورات', icon: '🎨' },
]

export default function ProductsPageClient() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products
    }
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-off-white pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            مجموعتنا الكاملة
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            اكتشف جميع تصاميمنا الفريدة من الأثاث الفاخر
          </p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          {/* Filter Header */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-wood-brown" />
            <h2 className="text-lg font-bold text-charcoal">تصفية حسب الفئة</h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {furnitureCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-300 
                  flex flex-col items-center gap-2 text-center
                  ${selectedCategory === category.id
                    ? 'bg-wood-brown text-white border-wood-brown shadow-lg'
                    : 'bg-white text-charcoal border-gray-200 hover:border-wood-brown/50 hover:shadow-md'
                  }
                `}
              >
                <span className="text-2xl md:text-3xl">{category.icon}</span>
                <span className="text-xs md:text-sm font-semibold leading-tight">
                  {category.name}
                </span>
                
                {/* Active Indicator */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-xl border-2 border-wood-brown"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <span className="inline-block px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600">
              {filteredProducts.length} منتج متاح
            </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 md:py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-charcoal mb-3">
                  لم نجد منتجات في هذه الفئة
                </h3>
                <p className="text-gray-600 mb-6">
                  جرب اختيار فئة أخرى لعرض المنتجات المتاحة
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-3 bg-wood-brown text-white rounded-xl font-semibold 
                           hover:bg-wood-brown/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
