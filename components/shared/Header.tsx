// components/shared/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isTransparent
                        ? "bg-transparent py-4 lg:py-6"
                        : "bg-white/90 backdrop-blur-md shadow-sm py-2 lg:py-3 border-b border-gray-100"
                )}
            >
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between">
                        {/* Logo - Enhanced */}
                        <Link href="/" className="flex items-center gap-2 group relative z-50">
                            <div className="relative h-8 sm:h-10 w-auto aspect-square">
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
                            </div>
                            <div className={cn(
                                "text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-500",
                                isTransparent ? "text-white" : "text-charcoal"
                            )}>
                                TOP <span className="text-wood-brown">HOME</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
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
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                href="/auth/login"
                                className={cn(
                                    "text-sm font-medium px-5 py-2 rounded-full border transition-all duration-300",
                                    isTransparent
                                        ? "text-white border-white/30 hover:bg-white/10"
                                        : "text-charcoal border-gray-200 hover:border-wood-brown hover:text-wood-brown"
                                )}
                            >
                                دخول
                            </Link>
                            <Link
                                href="/products"
                                className="text-sm font-semibold px-6 py-2 rounded-full bg-wood-brown text-white hover:bg-wood-brown/90 transition-all shadow-lg shadow-wood-brown/20"
                            >
                                تسوق الآن
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={cn(
                                "lg:hidden p-2 rounded-lg transition-colors z-50",
                                isTransparent ? "text-white hover:bg-white/10" : "text-charcoal hover:bg-gray-100"
                            )}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
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