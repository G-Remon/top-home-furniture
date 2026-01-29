// components/shared/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, Phone, ChevronDown, Home, Grid, User, MessageCircle, Heart, Search, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import LogoutButton from '@/components/auth/LogoutButton'
import WhatsAppButton from './WhatsAppButton'
import { useWishlist } from '@/context/WishlistContext'

const navigation = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'المنتجات', href: '/products', icon: Grid },
    { name: 'من نحن', href: '/about', icon: Info },
    { name: 'تواصل معنا', href: '/contact', icon: MessageCircle },
]

const popularSearches = [
    'كنبة', 'سرير', 'طاولة طعام', 'مكاتب', 'خزانة'
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const pathname = usePathname()
    const router = useRouter()
    const { isAuthenticated, userName } = useAuthStore()
    const { wishlist } = useWishlist()
    const isHomePage = pathname === '/'

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
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

    const isTransparent = isHomePage && !scrolled

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <>
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isTransparent
                    ? "bg-gradient-to-b from-black/20 to-transparent py-5"
                    : "bg-white/95 backdrop-blur-lg shadow-lg py-3"
            )}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo - Enhanced with better sizing */}
                        <Link href="/" className="flex items-center gap-3 group relative z-50">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative h-16 w-16 sm:h-20 sm:w-20"
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="TOP HOME Logo"
                                    fill
                                    className={cn(
                                        "object-contain drop-shadow-lg transition-all duration-300",
                                        isTransparent ? "brightness-100" : ""
                                    )}
                                    priority
                                    sizes="(max-width: 768px) 64px, 80px"
                                />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300",
                                    isTransparent ? "text-white" : "text-gray-900"
                                )}>
                                    TOP <span className="text-wood-brown">HOME</span>
                                </span>
                                <span className={cn(
                                    "text-xs font-medium tracking-wide transition-colors duration-300",
                                    isTransparent ? "text-white/80" : "text-gray-600"
                                )}>
                                    أثاث منزلي فاخر
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Enhanced with icons */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "group relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300",
                                            isTransparent
                                                ? isActive
                                                    ? "bg-white/20 text-white"
                                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                                                : isActive
                                                    ? "bg-wood-brown/10 text-wood-brown"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-wood-brown"
                                        )}
                                    >
                                        <Icon size={18} className={cn(
                                            "transition-transform duration-300 group-hover:scale-110",
                                            isActive && "text-wood-brown"
                                        )} />
                                        <span className="font-medium text-sm">{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="desktop-nav-indicator"
                                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-wood-brown rounded-full"
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Search Button - Styled as pill */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 group",
                                    isTransparent
                                        ? "text-white/90 bg-white/10 hover:bg-white/20 border border-white/10"
                                        : "text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-100"
                                )}
                            >
                                <Search size={18} className="group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold">بحث</span>
                            </button>
 
                            {/* Wishlist - Styled as pill */}
                            <Link
                                href="/wishlist"
                                className={cn(
                                    "relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 group",
                                    isTransparent
                                        ? "text-white/90 bg-white/10 hover:bg-white/20 border border-white/10"
                                        : "text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-100"
                                )}
                            >
                                <Heart
                                    size={18}
                                    className={cn(
                                        "transition-all group-hover:scale-110",
                                        wishlist.length > 0 ? "fill-red-500 text-red-500" : ""
                                    )}
                                />
                                <span className="text-sm font-semibold">المفضلة</span>
                                {wishlist.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white"
                                    >
                                        {wishlist.length}
                                    </motion.span>
                                )}
                            </Link>

                            {/* User/Auth */}
                            {!isAuthenticated ? (
                                <Link
                                    href="/login"
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2",
                                        isTransparent
                                            ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                                            : "bg-wood-brown text-white hover:bg-wood-brown/90 shadow-md"
                                    )}
                                >
                                    <User size={16} />
                                    دخول
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300",
                                        isTransparent
                                            ? "bg-white/10 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    )}>
                                        <div className="w-8 h-8 rounded-full bg-wood-brown/20 flex items-center justify-center text-wood-brown font-bold">
                                            {userName?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-sm">{userName}</span>
                                    </div>
                                    <LogoutButton
                                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium text-sm hover:bg-red-100 transition-all duration-300 border border-red-100"
                                    >
                                        خروج
                                    </LogoutButton>
                                </div>
                            )}

                            {/* WhatsApp Button - Enhanced Premium Design */}
                            <WhatsAppButton
                                phoneNumber="201234567890"
                                message="مرحباً، أود الاستفسار عن منتجات توب هوم."
                                className={cn(
                                    "px-6 py-2.5 rounded-[14px] font-bold text-sm transition-all duration-500 flex items-center gap-2 group",
                                    isTransparent
                                        ? "bg-white text-emerald-600 hover:bg-white/90 shadow-[0_8px_20px_rgba(255,255,255,0.2)]"
                                        : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
                                )}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                                </span>
                                {/* <MessageCircle size={18} className="transition-transform group-hover:rotate-12" /> */}
                                <span>تواصل واتساب</span>
                            </WhatsAppButton>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden items-center gap-2">
                            <Link
                                href="/wishlist"
                                className={cn(
                                    "relative p-2.5 rounded-xl transition-all",
                                    isTransparent
                                        ? "text-white/90"
                                        : "text-gray-600"
                                )}
                            >
                                <Heart
                                    size={20}
                                    className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""}
                                />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

            {/* Search Overlay - Ready 100% */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-start justify-center pt-24"
                    >
                        <motion.div
                            initial={{ y: -50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: -50, scale: 0.95 }}
                            className="w-full max-w-3xl px-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                <form onSubmit={handleSearch} className="relative p-2">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4">
                                        <Search className="text-gray-400" size={24} />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="ما الذي تبحث عنه اليوم؟"
                                            className="flex-1 py-5 text-xl lg:text-2xl border-0 bg-transparent focus:outline-none focus:ring-0 text-right"
                                            autoFocus
                                            dir="rtl"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setSearchOpen(false)}
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 text-right">عمليات بحث شائعة</h3>
                                        <div className="flex flex-wrap gap-2 justify-end">
                                            {popularSearches.map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => {
                                                        setSearchQuery(term);
                                                        router.push(`/products?search=${encodeURIComponent(term)}`);
                                                        setSearchOpen(false);
                                                    }}
                                                    className="px-4 py-2 bg-gray-100 hover:bg-wood-brown hover:text-white rounded-full text-sm font-medium transition-all"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 flex justify-center">
                                        <button
                                            onClick={handleSearch}
                                            disabled={!searchQuery.trim()}
                                            className="w-full max-w-sm py-4 bg-wood-brown text-white rounded-2xl font-bold shadow-lg hover:bg-wood-brown/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            ابدأ البحث
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Tap outside to close */}
                        <div className="absolute inset-0 -z-10" onClick={() => setSearchOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Mobile Bottom Navigation (Floating Premium Dock) --- */}
            {isMounted && (
                <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
                    <motion.nav 
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="h-18 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-[24px] px-2 flex items-center justify-between"
                    >
                        <Link
                            href="/"
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 flex-1 h-full rounded-2xl transition-all duration-300",
                                pathname === '/' ? "text-wood-brown" : "text-gray-400"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-500",
                                pathname === '/' ? "bg-wood-brown/10 scale-110" : ""
                            )}>
                                <Home size={20} className={pathname === '/' ? "fill-current/10" : ""} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">الرئيسية</span>
                        </Link>
 
                        <Link
                            href="/products"
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 flex-1 h-full rounded-2xl transition-all duration-300",
                                pathname === '/products' ? "text-wood-brown" : "text-gray-400"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-500",
                                pathname === '/products' ? "bg-wood-brown/10 scale-110" : ""
                            )}>
                                <Grid size={20} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">المنتجات</span>
                        </Link>
                        
                        {/* WhatsApp Hero Floating Button */}
                        <div className="relative flex-1 flex justify-center h-full group">
                            <WhatsAppButton
                                phoneNumber="201234567890"
                                message="مرحباً، أود الاستفسار عن منتجات توب هوم."
                                className="w-16 h-16 -mt-10 rounded-full shadow-[0_12px_28px_rgba(16,185,129,0.35)] bg-gradient-to-br from-emerald-400 to-emerald-600 border-[5px] border-white flex items-center justify-center active:scale-95 transition-all duration-500 z-50"
                                hideText
                            >
                                <MessageCircle size={28} className="text-white fill-white/10" />
                            </WhatsAppButton>
                            {/* Animated Glow */}
                            <div className="absolute -top-10 w-14 h-14 bg-emerald-500/30 rounded-full blur-2xl -z-10 animate-pulse group-hover:bg-emerald-500/50" />
                        </div>
 
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex flex-col items-center justify-center gap-1.5 flex-1 h-full rounded-2xl text-gray-400 hover:text-wood-brown transition-all"
                        >
                            <div className="p-2 rounded-xl">
                                <Search size={20} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">بحث</span>
                        </button>
 
                        <Link
                            href="/wishlist"
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 flex-1 h-full rounded-2xl transition-all duration-300",
                                pathname === '/wishlist' ? "text-wood-brown" : "text-gray-400"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all relative duration-500",
                                pathname === '/wishlist' ? "bg-wood-brown/10 scale-110" : ""
                            )}>
                                <Heart size={20} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        {wishlist.length}
                                    </span>
                                )}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">المفضلة</span>
                        </Link>
                    </motion.nav>
                </div>
            )}

            {/* Mobile Menu - Premium Design */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-gradient-to-b from-white to-gray-50 z-50 lg:hidden shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header with user info */}
                                <div className="p-6 border-b border-gray-200/50">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-12 w-12">
                                                <Image
                                                    src="/images/logo.png"
                                                    alt="Logo"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-gray-900">TOP HOME</div>
                                                <div className="text-xs text-gray-500">أثاث منزلي فاخر</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* User info */}
                                    {isAuthenticated ? (
                                        <div className="flex items-center gap-3 p-4 bg-wood-brown/5 rounded-2xl">
                                            <div className="w-12 h-12 rounded-full bg-wood-brown/20 flex items-center justify-center text-wood-brown font-bold text-lg">
                                                {userName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900">{userName}</p>
                                                <p className="text-xs text-gray-500">عضو مسجل</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="flex items-center justify-center gap-2 p-4 bg-wood-brown text-white rounded-2xl font-bold hover:bg-wood-brown/90 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <User size={18} />
                                            تسجيل الدخول
                                        </Link>
                                    )}
                                </div>

                                {/* Navigation Links */}
                                <div className="flex-1 p-4 overflow-y-auto">
                                    <div className="space-y-2">
                                        {navigation.map((item, index) => {
                                            const isActive = pathname === item.href
                                            const Icon = item.icon
                                            return (
                                                <motion.div
                                                    key={item.name}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "flex items-center gap-3 p-4 rounded-xl transition-all duration-300 group",
                                                            isActive
                                                                ? "bg-wood-brown text-white shadow-lg"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                        )}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        <Icon size={20} className={cn(
                                                            isActive ? "text-white" : "text-gray-500",
                                                            "group-hover:scale-110 transition-transform"
                                                        )} />
                                                        <span className="flex-1 font-medium">{item.name}</span>
                                                        <ChevronDown className={cn(
                                                            "w-5 h-5 -rotate-90 transition-transform",
                                                            isActive ? "text-white/80" : "text-gray-400"
                                                        )} />
                                                    </Link>
                                                </motion.div>
                                            )
                                        })}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
                                        <h3 className="text-sm font-bold text-gray-700 mb-4">روابط سريعة</h3>
                                        <div className="space-y-3">
                                            <a
                                                href="tel:+201234567890"
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                    <Phone size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">اتصل بنا</p>
                                                    <p className="text-xs text-gray-500">+20 123 456 7890</p>
                                                </div>
                                            </a>
                                            <Link
                                                href="/wishlist"
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="relative w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                                                    <Heart size={18} className={wishlist.length > 0 ? "fill-red-600" : ""} />
                                                    {wishlist.length > 0 && (
                                                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                                            {wishlist.length}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">قائمة الأمنيات</p>
                                                    <p className="text-xs text-gray-500">{wishlist.length} منتج</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Options */}
                                <div className="p-6 border-t border-gray-200/50 space-y-3">
                                    {isAuthenticated ? (
                                        <LogoutButton className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100 shadow-sm">
                                            <span>تسجيل الخروج</span>
                                        </LogoutButton>
                                    ) : (
                                        <div className="text-center py-2">
                                            <p className="text-xs text-gray-500">تمتع بكافة المميزات عند تسجيل الدخول</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}