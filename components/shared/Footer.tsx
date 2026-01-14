// components/shared/Footer.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const footerLinks = {
    company: [
        { name: 'من نحن', href: '/about' },
        { name: 'المنتجات', href: '/products' },
        { name: 'تواصل معنا', href: '/contact' },
    ],
    support: [
        { name: 'سياسة الخصوصية', href: '/privacy' },
        { name: 'الشروط والأحكام', href: '/terms' },
        { name: 'سياسة الإرجاع', href: '/returns' },
    ],
    social: [
        { name: 'Facebook', icon: Facebook, href: '#' },
        { name: 'Instagram', icon: Instagram, href: '#' },
        { name: 'Twitter', icon: Twitter, href: '#' },
    ],
}

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false)

    // Show scroll to top button when scrolled
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400)
        }

        window.addEventListener('scroll', handleScroll)
        // Initialize state based on current scroll position
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-charcoal text-white relative">
            {/* Decorative Top Border */}
            <div className="h-1 bg-gradient-to-r from-transparent via-wood-brown to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="sm:col-span-2 lg:col-span-1"
                    >
                        <Link href="/" className="inline-block mb-4 group">
                            <h3 className="text-2xl md:text-3xl font-bold text-wood-brown 
                                         group-hover:scale-105 transition-transform duration-300">
                                TOP HOME
                            </h3>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                            علامة رائدة في صناعة الأثاث الفاخر، نقدم تصميمات أنيقة وعصرية تجمع بين الجمال والراحة
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {footerLinks.social.map((item) => {
                                const Icon = item.icon
                                return (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-wood-brown 
                                                 flex items-center justify-center transition-all duration-300
                                                 border border-white/10 hover:border-wood-brown"
                                        aria-label={item.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-bold mb-4 text-white">الشركة</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-wood-brown transition-colors 
                                                 duration-300 text-sm md:text-base inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-wood-brown group-hover:w-4 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-bold mb-4 text-white">الدعم</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-wood-brown transition-colors 
                                                 duration-300 text-sm md:text-base inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-wood-brown group-hover:w-4 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-lg font-bold mb-4 text-white">تواصل معنا</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm md:text-base">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-wood-brown" />
                                <span>القاهرة، مصر</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                                <Phone className="w-5 h-5 flex-shrink-0 text-wood-brown" />
                                <a 
                                    href="tel:+201234567890" 
                                    className="hover:text-wood-brown transition-colors duration-300"
                                >
                                    +20 123 456 7890
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                                <Mail className="w-5 h-5 flex-shrink-0 text-wood-brown" />
                                <a 
                                    href="mailto:info@tophome.com" 
                                    className="hover:text-wood-brown transition-colors duration-300"
                                >
                                    info@tophome.com
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-right">
                            © {new Date().getFullYear()} TOP HOME. جميع الحقوق محفوظة
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>صنع في مصر</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-wood-brown hover:bg-wood-brown/90 
                             text-white rounded-full shadow-xl hover:shadow-2xl 
                             flex items-center justify-center transition-all duration-300
                             hover:scale-110 group"
                    aria-label="العودة للأعلى"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
            )}
        </footer>
    )
}