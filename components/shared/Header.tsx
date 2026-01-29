// components/shared/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import LogoutButton from '@/components/auth/LogoutButton'
import WhatsAppButton from './WhatsAppButton'

const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const { isAuthenticated, userName } = useAuthStore()
    const isHomePage = pathname === '/'

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // React 19 strict rules discourage calling setState in effects unless
    // it's in response to an external subscription. To avoid cascading
    // renders, we skip automatically closing the mobile menu on route
    // changes and instead rely on user interaction.

    // Prevent body scroll when mobile menu is open
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

    // Enhanced color system
    const logoColor = isTransparent ? "text-white drop-shadow-lg" : "text-wood-brown"
    const navColor = isTransparent
        ? "text-white/90 hover:text-white"
        : "text-charcoal/80 hover:text-wood-brown"
    const iconColor = isTransparent ? "text-white" : "text-wood-brown"
    const menuButtonColor = isTransparent ? "text-white" : "text-charcoal"

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isTransparent
                        ? "bg-transparent py-2 lg:py-4"
                        : "bg-white/95 backdrop-blur-md shadow-sm py-1 lg:py-2 border-b border-gray-100"
                )}
            >
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between">
                        {/* Logo - Enhanced & Smaller */}
                        <Link href="/" className="flex items-center gap-2 group relative z-50">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative h-10 sm:h-12 w-auto aspect-square transition-transform"
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="TOP HOME Logo"
                                    fill
                                    className={cn(
                                        "object-contain transition-all duration-500",
                                        isTransparent ? "brightness-0 invert" : ""
                                    )}
                                    priority
                                />
                            </motion.div>
                            <div className={cn(
                                "text-lg sm:text-xl lg:text-2xl font-black tracking-tight transition-colors duration-500",
                                isTransparent ? "text-white" : "text-gray-900"
                            )}>
                                TOP <span className="text-[#D4AF37]">HOME</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative text-sm font-medium transition-colors duration-300",
                                            isTransparent ? "text-white/80 hover:text-white" : "text-charcoal/70 hover:text-wood-brown",
                                            isActive && (isTransparent ? "text-white" : "text-wood-brown")
                                        )}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navUnderline"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-wood-brown rounded-full"
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3">

                            {!isAuthenticated ? (
                                <Link
                                    href="/login"
                                    className={cn(
                                        "text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-300",
                                        isTransparent
                                            ? "text-white border-white/30 hover:bg-white/10"
                                            : "text-charcoal border-gray-200 hover:border-wood-brown hover:text-wood-brown"
                                    )}
                                >
                                    دخول
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "text-xs font-medium flex items-center gap-2",
                                        isTransparent ? "text-white" : "text-charcoal"
                                    )}>
                                        <div className="w-7 h-7 rounded-full bg-wood-brown/10 flex items-center justify-center text-wood-brown text-[10px] font-bold">
                                            {userName?.charAt(0).toUpperCase()}
                                        </div>
                                        <span>{userName}</span>
                                    </div>
                                    <LogoutButton className={cn(
                                        "px-3 py-1.5 rounded-full border text-xs transition-all duration-300",
                                        isTransparent
                                            ? "text-white border-white/30 hover:bg-white/10"
                                            : "text-destructive border-destructive/20 hover:bg-destructive hover:text-white"
                                    )}>
                                        خروج
                                    </LogoutButton>
                                </div>
                            )}
                            <WhatsAppButton
                                phoneNumber="201234567890" // Replace with actual number
                                message="مرحباً، أود الاستفسار عن منتجات توب هوم."
                                className="shadow-md shadow-wood-brown/10 scale-90 origin-right"
                            >
                                تواصل معنا
                            </WhatsAppButton>
                        </div>


                        {/* Mobile Menu Button - Compact */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {/* Shopping cart icon for quick access on mobile if needed */}
                            {!isTransparent && (
                                <Link href="/products" className="p-2 text-charcoal hover:text-wood-brown transition-colors">
                                    <ShoppingCart size={20} />
                                </Link>
                            )}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={cn(
                                    "p-1.5 rounded-full transition-all duration-300 z-50",
                                    isTransparent
                                        ? "text-white bg-white/10 hover:bg-white/20"
                                        : "text-charcoal bg-gray-100/50 hover:bg-gray-200"
                                )}
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu - Professional Vertical Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel - Right Side Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className="relative h-6 w-6">
                                        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                                    </div>
                                    <span className="font-black text-xl tracking-tight">TOP <span className="text-[#D4AF37]">HOME</span></span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-charcoal transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* User Profile Summary (If logged in) */}
                            {isAuthenticated && (
                                <div className="p-5 bg-gray-50/50 border-b border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-wood-brown text-white flex items-center justify-center font-bold">
                                            {userName?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal">{userName}</p>
                                            <p className="text-xs text-soft-gray font-normal">أهلاً بك مرة أخرى</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <div className="flex-1 overflow-y-auto py-4 px-3">
                                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-soft-gray/60">القائمة الرئيسية</p>
                                <div className="space-y-1">
                                    {navigation.map((item, index) => {
                                        const isActive = pathname === item.href
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
                                                        "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                                                        isActive
                                                            ? "bg-wood-brown/5 text-wood-brown font-semibold"
                                                            : "text-charcoal/80 hover:bg-gray-50 hover:text-wood-brown"
                                                    )}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <span className="text-base">{item.name}</span>
                                                    <ChevronDown className={cn(
                                                        "w-4 h-4 -rotate-90 transition-transform",
                                                        isActive ? "text-wood-brown" : "text-gray-300 group-hover:translate-x-1"
                                                    )} />
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Actions & CTA */}
                            <div className="p-5 space-y-3 bg-white border-t border-gray-50">
                                {!isAuthenticated ? (
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors shadow-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        تسجيل الدخول
                                    </Link>
                                ) : (
                                    <LogoutButton className="w-full py-3.5 bg-destructive/10 text-destructive rounded-xl font-semibold text-sm hover:bg-destructive hover:text-white transition-all" />
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href="tel:+201234567890"
                                        className="flex flex-col items-center justify-center py-3 px-2 bg-gray-50 rounded-xl border border-gray-100 hover:border-wood-brown/30 transition-all font-medium text-xs text-charcoal/70 group"
                                    >
                                        <Phone size={18} className="mb-1 text-wood-brown group-hover:scale-110 transition-transform" />
                                        <span>اتصل بنا</span>
                                    </a>
                                    <Link
                                        href="/products"
                                        className="flex flex-col items-center justify-center py-3 px-2 bg-wood-brown text-white rounded-xl hover:bg-wood-brown/90 transition-all font-medium text-xs shadow-sm hover:shadow-md group"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <ShoppingCart size={18} className="mb-1 group-hover:scale-110 transition-transform" />
                                        <span>التسوق</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}