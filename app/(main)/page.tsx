// app/(main)/page.tsx
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoriesSection from '@/components/home/CategoriesSection'
import WhyTopHome from '@/components/home/WhyTopHome'
import WhatsAppCTA from '@/components/home/WhatsAppCTA'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-off-white">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyTopHome />
      <WhatsAppCTA />
    </main>
  )
}