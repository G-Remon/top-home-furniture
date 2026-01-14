'use client'

// components/products/ProductFilter.tsx
import type { Category } from '@/types/product'
import { ChangeEvent } from 'react'

interface ProductFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceChange,
}: ProductFilterProps) {
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value)
  }

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value)
  }

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const min = Number(event.target.value) || 0
    onPriceChange([min, priceRange[1]])
  }

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const max = Number(event.target.value) || 0
    onPriceChange([priceRange[0], max])
  }

  return (
    <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-charcoal">الفئة</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="rounded-lg border border-gray-200 bg-off-white px-3 py-2 text-sm outline-none focus:border-wood-brown focus:ring-1 focus:ring-wood-brown"
          >
            <option value="all">كل الفئات</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-charcoal">ترتيب حسب</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="rounded-lg border border-gray-200 bg-off-white px-3 py-2 text-sm outline-none focus:border-wood-brown focus:ring-1 focus:ring-wood-brown"
          >
            <option value="default">الافتراضي</option>
            <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
            <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
            <option value="newest">الأحدث</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-charcoal">أدنى سعر (ج.م)</label>
          <input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="rounded-lg border border-gray-200 bg-off-white px-3 py-2 text-sm outline-none focus:border-wood-brown focus:ring-1 focus:ring-wood-brown"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-charcoal">أعلى سعر (ج.م)</label>
          <input
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="rounded-lg border border-gray-200 bg-off-white px-3 py-2 text-sm outline-none focus:border-wood-brown focus:ring-1 focus:ring-wood-brown"
          />
        </div>
      </div>
    </section>
  )
}
