// app/main/page.tsx
import HeroSection from '@/components/home/HeroSection'
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import WhyTopHome from '@/components/home/WhyTopHome'
import WhatsAppCTA from '@/components/home/WhatsAppCTA'
import BrandShowcase from '@/components/home/BrandShowcase'
import { Suspense } from 'react'

export const revalidate = 3600 // ISR

export default function HomePage() {
  return (
    <main className="min-h-screen bg-off-white">
      <HeroSection />
      <BrandShowcase />
      <CategoriesSection />
      <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><div className="w-10 h-10 border-4 border-wood-brown border-t-transparent rounded-full animate-spin"></div></div>}>
        <FeaturedProductsSection />
      </Suspense>
      <WhyTopHome />
      <WhatsAppCTA />
    </main>
  )
}
