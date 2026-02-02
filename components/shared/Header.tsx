// components/shared/Header.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Phone, ChevronDown, 
  Home, Grid, User, MessageCircle, Heart, 
  Search, Info
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import LogoutButton from '@/components/auth/LogoutButton'
import WhatsAppButton from './WhatsAppButton'
import { useWishlist } from '@/context/WishlistContext'

const navigation = [
  { name: 'الرئيسية', href: '/', icon: Home, description: 'الصفحة الرئيسية' },
  { name: 'المنتجات', href: '/products', icon: Grid, description: 'تصفح جميع المنتجات' },
  { name: 'من نحن', href: '/about', icon: Info, description: 'تعرف علينا' },
  { name: 'تواصل معنا', href: '/contact', icon: MessageCircle, description: 'اتصل بنا' },
]

const popularSearches = [
  { term: 'كنبة', category: 'أرائك' },
  { term: 'سرير', category: 'غرف نوم' },
  { term: 'طاولة طعام', category: 'صالات طعام' },
  { term: 'مكاتب', category: 'مكاتب' },
  { term: 'خزانة', category: 'تخزين' }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const { wishlist } = useWishlist()
  const isHomePage = pathname === '/'
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [searchOpen])

  const isTransparent = isHomePage && !scrolled

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleQuickSearch = (term: string) => {
    router.push(`/products?search=${encodeURIComponent(term)}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // حساب عدد العناصر الفريدة في المفضلة
  const uniqueWishlistCount = [...new Set(wishlist.map(item => item.id))].length

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-gradient-to-b from-black/30 via-black/20 to-transparent py-4"
          : "bg-white/98 backdrop-blur-xl shadow-lg py-3 border-b border-gray-100/50"
      )}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative z-50"
              aria-label="الصفحة الرئيسية لـ توب هوم"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-14 w-14 sm:h-16 sm:w-16"
              >
                <Image
                  src="/images/logo.png"
                  alt="شعار توب هوم"
                  fill
                  className={cn(
                    "object-contain transition-all duration-300",
                    isTransparent ? "brightness-125 drop-shadow-lg" : ""
                  )}
                  priority
                  sizes="(max-width: 768px) 56px, 64px"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300",
                  isTransparent ? "text-white drop-shadow-md" : "text-gray-900"
                )}>
                  TOP <span className="text-wood-brown">HOME</span>
                </span>
                <span className={cn(
                  "text-[10px] sm:text-xs font-medium tracking-wide transition-colors duration-300",
                  isTransparent ? "text-white/90 drop-shadow-sm" : "text-gray-600"
                )}>
                  أثاث منزلي فاخر
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300",
                      isTransparent
                        ? isActive
                          ? "bg-white/25 text-white shadow-lg"
                          : "text-white/95 hover:bg-white/15 hover:text-white"
                        : isActive
                          ? "bg-wood-brown/10 text-wood-brown shadow-sm"
                          : "text-gray-700 hover:bg-gray-100/80 hover:text-wood-brown"
                    )}
                    aria-label={item.description}
                  >
                    <Icon size={18} className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      isActive && (isTransparent ? "text-white" : "text-wood-brown")
                    )} />
                    <span className="font-semibold text-sm">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="desktop-nav-indicator"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-current rounded-full"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <div className="relative group">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="فتح البحث"
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300",
                    isTransparent
                      ? "text-white/95 bg-white/15 hover:bg-white/25 border border-white/20"
                      : "text-gray-600 bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200"
                  )}
                >
                  <Search size={18} className="transition-transform group-hover:scale-110" />
                  <span className="text-sm font-semibold">بحث</span>
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  ابحث عن المنتجات
                </div>
              </div>

              {/* Wishlist */}
              <div className="relative group">
                <Link
                  href="/wishlist"
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300",
                    isTransparent
                      ? "text-white/95 bg-white/15 hover:bg-white/25 border border-white/20"
                      : "text-gray-600 bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200"
                  )}
                  aria-label="قائمة المفضلة"
                >
                  <Heart
                    size={18}
                    className={cn(
                      "transition-all",
                      uniqueWishlistCount > 0 ? "fill-red-500 text-red-500" : ""
                    )}
                  />
                  <span className="text-sm font-semibold">المفضلة</span>
                  {uniqueWishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {uniqueWishlistCount}
                    </motion.span>
                  )}
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {uniqueWishlistCount} منتج في المفضلة
                </div>
              </div>

              {/* User/Auth */}
              {isMounted && (
                !isAuthenticated || !user ? (
                  <Link
                    href="/login"
                    className={cn(
                      "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 group",
                      isTransparent
                        ? "bg-white/25 text-white hover:bg-white/35 backdrop-blur-sm shadow-lg"
                        : "bg-wood-brown text-white hover:bg-wood-brown/90 shadow-md"
                    )}
                  >
                    <User size={16} className="group-hover:scale-110 transition-transform" />
                    دخول
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 group cursor-pointer relative",
                      isTransparent
                        ? "bg-white/20 backdrop-blur-md border border-white/25 text-white hover:bg-white/30"
                        : "bg-gray-100/80 border border-gray-200 text-gray-700 hover:bg-gray-200/80 shadow-sm"
                    )}
                    onClick={() => setMobileMenuOpen(true)}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wood-brown/20 to-amber-900/20 flex items-center justify-center text-wood-brown font-bold border border-wood-brown/20 uppercase">
                        {user?.userName?.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] opacity-80 font-bold leading-none mb-0.5">مرحباً بك</span>
                        <span className="font-bold text-sm leading-none">{user?.userName}</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        إدارة الحساب
                      </div>
                    </div>
                    <LogoutButton
                      className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all duration-300 border border-red-100 shadow-sm"
                    >
                      خروج
                    </LogoutButton>
                  </div>
                )
              )}

              {/* WhatsApp Button */}
              <WhatsAppButton
                phoneNumber="201234567890"
                message="مرحباً، أود الاستفسار عن منتجات توب هوم."
                className={cn(
                  "px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-500 flex items-center gap-2 group",
                  isTransparent
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.4)]"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>واتساب</span>
              </WhatsAppButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="فتح البحث"
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  isTransparent
                    ? "text-white/90 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Search size={20} />
              </button>
              
              <Link
                href="/wishlist"
                aria-label="قائمة الأمنيات"
                className={cn(
                  "relative p-2.5 rounded-xl transition-all",
                  isTransparent
                    ? "text-white/90 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Heart
                  size={20}
                  className={uniqueWishlistCount > 0 ? "fill-red-500 text-red-500" : ""}
                />
                {uniqueWishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                    {uniqueWishlistCount}
                  </span>
                )}
              </Link>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-300",
                  isTransparent
                    ? "text-white/90 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] pt-20"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-3xl mx-auto px-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                      aria-label="إغلاق البحث"
                    >
                      <X size={20} />
                    </button>
                    <form onSubmit={handleSearch} className="flex-1">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="ابحث عن المنتجات..."
                          className="flex-1 py-4 text-lg border-0 bg-transparent focus:outline-none focus:ring-0 text-right"
                          dir="rtl"
                        />
                        <Search className="text-gray-400" size={20} />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="p-6">
                  {searchQuery ? (
                    <div className="text-center py-8">
                      <Search size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4">اضغط Enter للبحث عن "{searchQuery}"</p>
                      <button
                        onClick={() => handleSearch()}
                        disabled={!searchQuery.trim()}
                        className="px-6 py-3 bg-wood-brown text-white rounded-xl font-semibold shadow-lg hover:bg-wood-brown/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        ابحث الآن
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-right">
                        عمليات بحث شائعة
                      </h3>
                      <div className="space-y-3">
                        {popularSearches.map((item) => (
                          <button
                            key={item.term}
                            onClick={() => handleQuickSearch(item.term)}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all group text-right"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-wood-brown/10 flex items-center justify-center text-wood-brown">
                                <Search size={14} />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 group-hover:text-wood-brown">
                                  {item.term}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.category}
                                </div>
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            <button
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 -z-10"
              aria-label="إغلاق البحث"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      {isMounted && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-16 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl px-2 flex items-center justify-between"
          >
            {navigation.slice(0, 3).map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-xl transition-all duration-300",
                    isActive ? "text-wood-brown" : "text-gray-500"
                  )}
                  aria-label={item.name}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300 relative",
                    isActive ? "bg-wood-brown/10" : ""
                  )}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-semibold">{item.name}</span>
                </Link>
              )
            })}

            {/* WhatsApp Button with Real Official Logo */}
            <div className="relative flex-1 flex justify-center group">
              <a
                href={`https://wa.me/201234567890?text=${encodeURIComponent('مرحباً، أود الاستفسار عن منتجات توب هوم.')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل عبر واتساب"
                className="w-14 h-14 -mt-8 rounded-full shadow-[0_8px_24px_rgba(16,185,129,0.4)] bg-gradient-to-br from-emerald-500 to-emerald-600 border-4 border-white flex items-center justify-center active:scale-95 hover:scale-105 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(16,185,129,0.6)]"
              >
                {/* Official WhatsApp Logo - White Version */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 48 48" 
                  className="w-7 h-7"
                  fill="white"
                >
                  <path d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/>
                  <path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"/>
                  <path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"/>
                  <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/>
                  <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"/>
                </svg>
              </a>
              
              {/* Tooltip on Hover */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                تواصل عبر واتساب
              </div>
            </div>

            {/* More Menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-xl transition-all duration-300",
                mobileMenuOpen ? "text-wood-brown" : "text-gray-500"
              )}
              aria-label="المزيد من الخيارات"
            >
              <div className={cn(
                "p-2 rounded-lg transition-all duration-300 relative",
                mobileMenuOpen ? "bg-wood-brown/10" : ""
              )}>
                <Menu size={20} />
              </div>
              <span className="text-[10px] font-semibold">المزيد</span>
            </button>
          </motion.nav>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <Image
                        src="/images/logo.png"
                        alt="شعار توب هوم"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">TOP HOME</div>
                      <div className="text-xs text-gray-500">أثاث منزلي فاخر</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="إغلاق القائمة"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* User Info */}
                {isAuthenticated && user && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-wood-brown/20 to-amber-900/20 flex items-center justify-center text-wood-brown font-bold border border-wood-brown/20 uppercase text-lg">
                      {user?.userName?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{user.userName}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    التنقل
                  </h3>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl transition-all",
                          isActive
                            ? "bg-wood-brown text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon size={20} />
                        <span className="flex-1 font-medium">{item.name}</span>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </Link>
                    )
                  })}
                </div>

                {/* Wishlist Link */}
                <div className="mt-6">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart
                      size={20}
                      className={uniqueWishlistCount > 0 ? "fill-red-500 text-red-500" : ""}
                    />
                    <span className="font-medium">المفضلة</span>
                    {uniqueWishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {uniqueWishlistCount}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Contact Link */}
                <div className="mt-6">
                  <a
                    href="tel:+201234567890"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <Phone size={20} />
                    <span className="font-medium">اتصل بنا</span>
                    <span className="text-sm text-gray-500">+20 123 456 7890</span>
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <LogoutButton
                      className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                    >
                      تسجيل الخروج
                    </LogoutButton>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="w-full py-3 bg-wood-brown text-white rounded-xl font-semibold text-center hover:bg-wood-brown/90 transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 z-40 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors lg:hidden"
            aria-label="الرجوع للأعلى"
          >
            <ChevronDown className="w-6 h-6 text-gray-700 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}