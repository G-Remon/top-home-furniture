'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'

interface WhatsAppButtonProps {
    phoneNumber: string
    message: string
    productName?: string
    className?: string
    size?: 'sm' | 'md' | 'lg'
    fixed?: boolean
    showIcon?: boolean
    children?: ReactNode
    variant?: 'default' | 'minimal' | 'floating'
    showPulse?: boolean
    onClick?: (e: React.MouseEvent) => void
}

export default function WhatsAppButton({
    phoneNumber,
    message,
    productName,
    className,
    size = 'md',
    fixed = false,
    showIcon = true,
    children,
    variant = 'default',
    showPulse = true,
    onClick,
}: WhatsAppButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    const encodedMessage = encodeURIComponent(
        productName ? `${message}\n\nالمنتج: ${productName}` : message
    )

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-base gap-2.5',
        lg: 'px-8 py-4 text-lg gap-3',
    }

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    }

    // Floating button (fixed position with advanced features)
    if (variant === 'floating' || fixed) {
        return (
            <div className="fixed bottom-6 left-6 z-50">
                {/* Tooltip */}
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-xl shadow-xl whitespace-nowrap pointer-events-none"
                        >
                            <div className="font-medium">تواصل معنا الآن!</div>
                            <div className="text-xs text-gray-300 mt-0.5">متاحون للرد فوراً</div>
                            {/* Arrow */}
                            <div className="absolute top-full left-6 -mt-1 w-2 h-2 bg-gray-900 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Button */}
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClick}
                    className="relative group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] rounded-full shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setShowTooltip(true)}
                    onHoverEnd={() => setShowTooltip(false)}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.5
                    }}
                >
                    {/* Animated Background Gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Pulse Animation */}
                    {showPulse && (
                        <>
                            <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-30" />
                            <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-pulse opacity-40" />
                        </>
                    )}

                    {/* Icon */}
                    <motion.div
                        className="relative z-10"
                        animate={{
                            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <MessageCircle className="w-8 h-8 text-white fill-white" strokeWidth={1.5} />
                    </motion.div>

                    {/* Shine Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Notification Badge */}
                    <motion.span
                        className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring", stiffness: 500, damping: 15 }}
                    >
                        !
                    </motion.span>
                </motion.a>

                {/* Decorative Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        )
    }

    // Minimal variant
    if (variant === 'minimal') {
        return (
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className={cn(
                    'inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#AA8C2C] transition-colors duration-300 font-medium group',
                    className
                )}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                {showIcon && (
                    <motion.div
                        animate={{ rotate: isHovered ? [0, -15, 15, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <MessageCircle className={cn(iconSizes[size], "transition-transform")} />
                    </motion.div>
                )}
                <span className="relative">
                    {children || 'تواصل عبر واتساب'}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                </span>
            </motion.a>
        )
    }

    // Default variant (Enhanced button)
    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={cn(
                'relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 overflow-hidden group',
                'bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-white',
                'hover:shadow-2xl hover:shadow-[#D4AF37]/40',
                'active:scale-95',
                sizeClasses[size],
                fixed && 'fixed bottom-6 left-6 z-50',
                className
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#AA8C2C] to-[#D4AF37]"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '0%' : '-100%' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Shine Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                    x: ['-100%', '200%'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2.5">
                {showIcon && (
                    <motion.div
                        animate={{
                            rotate: isHovered ? [0, -15, 15, -15, 0] : 0,
                            scale: isHovered ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        <MessageCircle className={cn(iconSizes[size], "fill-white/20")} strokeWidth={2} />
                    </motion.div>
                )}
                <span className="font-bold tracking-wide">
                    {children || 'تواصل عبر واتساب'}
                </span>
                <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Send className={cn(iconSizes[size])} strokeWidth={2} />
                </motion.div>
            </span>

            {/* Ripple Effect on Click */}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        className="absolute inset-0 bg-white/10 rounded-full"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                )}
            </AnimatePresence>
        </motion.a>
    )
}