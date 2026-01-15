// components/shared/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    const isHomePage = pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                    isTransparent
                        ? "bg-transparent py-2 lg:py-3"
                        : "bg-white/98 backdrop-blur-xl shadow-lg py-2 border-b border-gray-100"
                )}
            >
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between h-12 lg:h-14">
                        {/* Logo - Enhanced with Image */}
                        <Link href="/" className="flex items-center group relative z-50">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="relative flex items-center gap-2 sm:gap-3"
                            >
                                <div className="relative">
                                    <motion.div
                                        className={cn(
                                            "absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                            isTransparent ? "bg-white/30" : "bg-wood-brown/30"
                                        )}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    <motion.div
                                        className="relative"
                                        whileHover={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src="/images/logo.png"
                                            alt="TOP HOME Logo"
                                            className={cn(
                                                "h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-300",
                                                isTransparent
                                                    ? "drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_6px_20px_rgba(255,255,255,0.5)]"
                                                    : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        className={cn(
                                            "absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            isTransparent ? "border-white/50" : "border-wood-brown/50"
                                        )}
                                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                        transition={{
                                            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                        }}
                                    />
                                </div>

                                <div className="relative">
                                    <div
                                        className={cn(
                                            "text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-all duration-300",
                                            logoColor,
                                            "font-[system-ui] leading-none"
                                        )}
                                    >
                                        TOP HOME
                                    </div>
                                    <motion.div
                                        className={cn(
                                            "h-0.5 rounded-full transition-all duration-300 mt-1",
                                            isTransparent ? "bg-white" : "bg-wood-brown"
                                        )}
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                    />
                                </div>
                            </motion.div>
                        </Link>


                        {/* Desktop Navigation - Enhanced */}
                        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {navigation.map((item, index) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="relative group px-4 py-2"
                                    >
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={cn(
                                                "text-sm xl:text-base font-medium transition-all duration-300 relative",
                                                navColor,
                                                isActive && !isTransparent && "text-wood-brown font-semibold",
                                                isActive && isTransparent && "text-white font-semibold"
                                            )}
                                        >
                                            {item.name}
                                        </motion.span>
                                        {/* Active indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className={cn(
                                                    "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                                                    isTransparent ? "bg-white" : "bg-wood-brown"
                                                )}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        {/* Hover effect */}
                                        <span className={cn(
                                            "absolute bottom-0 left-0 right-0 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center",
                                            isTransparent ? "bg-white/50" : "bg-wood-brown/50"
                                        )} />
                                    </Link>
                                )
                            })}
                        </div>

                        {/* CTA Buttons - Enhanced */}
                        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                            {/* Phone Button */}
                            <motion.a
                                href="tel:+201234567890"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full transition-all duration-300 group",
                                    isTransparent
                                        ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200",
                                    iconColor
                                )}
                            >
                                <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
                                <span className="text-xs xl:text-sm font-medium">اتصل بنا</span>
                            </motion.a>

                            {/* Shop Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/products"
                                    className={cn(
                                        "flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full font-medium text-xs xl:text-sm transition-all duration-300 shadow-md hover:shadow-xl group relative overflow-hidden",
                                        isTransparent
                                            ? "bg-white text-wood-brown hover:bg-white/95"
                                            : "bg-wood-brown text-white hover:bg-wood-brown/90"
                                    )}
                                >
                                    {/* Shine effect */}
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    <ShoppingCart className="w-4 h-4 relative z-10 transition-transform group-hover:scale-110" />
                                    <span className="relative z-10">تسوق الآن</span>
                                </Link>
                            </motion.div>

                            {/* Login Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/auth/login"
                                    className={cn(
                                        "px-4 xl:px-5 py-2 rounded-full font-medium text-xs xl:text-sm transition-all duration-300 border-2",
                                        isTransparent
                                            ? "border-white text-white hover:bg-white hover:text-wood-brown"
                                            : "border-wood-brown text-wood-brown hover:bg-wood-brown hover:text-white"
                                    )}
                                >
                                    دخول
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button - Enhanced */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-50",
                                menuButtonColor,
                                !isTransparent && "hover:bg-gray-100",
                                isTransparent && "hover:bg-white/10 backdrop-blur-sm"
                            )}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu - Premium Design */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-br from-wood-brown to-wood-brown/80 text-white">
                                    <div className="text-2xl font-bold">TOP HOME</div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <div className="flex-1 py-6 px-4 space-y-2">
                                    {navigation.map((item, index) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
                                                        isActive
                                                            ? "bg-wood-brown text-white shadow-lg"
                                                            : "hover:bg-gray-50 text-charcoal hover:text-wood-brown"
                                                    )}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <span className="text-lg font-medium">{item.name}</span>
                                                    <ChevronDown className={cn(
                                                        "w-5 h-5 -rotate-90 transition-transform group-hover:translate-x-1",
                                                        isActive && "text-white"
                                                    )} />
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {/* CTA Section */}
                                <div className="p-6 space-y-3 border-t border-gray-100 bg-gray-50">
                                    <motion.a
                                        href="tel:+201234567890"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center justify-center gap-3 w-full px-6 py-4 text-wood-brown bg-white border-2 border-wood-brown rounded-2xl hover:bg-wood-brown hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg font-medium text-base group"
                                    >
                                        <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                        <span>اتصل بنا الآن</span>
                                    </motion.a>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Link
                                            href="/products"
                                            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-wood-brown to-wood-brown/90 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-medium text-base group relative overflow-hidden"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            <ShoppingCart className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" />
                                            <span className="relative z-10">تسوق الآن</span>
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Link
                                            href="/auth/login"
                                            className="flex items-center justify-center w-full px-6 py-4 bg-white text-charcoal border border-gray-200 rounded-2xl hover:border-wood-brown hover:text-wood-brown transition-all duration-300 font-medium text-base"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            تسجيل الدخول
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}