// components/shared/WhatsAppButton.tsx
'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface WhatsAppButtonProps {
  phoneNumber: string
  message: string
  productName?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fixed?: boolean
  showIcon?: boolean
  children?: ReactNode
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
}: WhatsAppButtonProps) {
  
  const encodedMessage = encodeURIComponent(
    productName ? `${message}\n\nالمنتج: ${productName}` : message
  )
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'whatsapp-button',
        sizeClasses[size],
        fixed && 'fixed bottom-6 right-6 z-50 shadow-2xl',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showIcon && <MessageCircle className="w-5 h-5" />}
      {children || 'تواصل عبر واتساب'}
    </motion.a>
  )
}