// components/products/WishlistButton.tsx
'use client'

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Toast } from '@/components/shared/Toast';

interface WishlistButtonProps {
    product: Product;
    className?: string;
}

export const WishlistButton = ({ product, className }: WishlistButtonProps) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const active = isInWishlist(product.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        toggleWishlist(product);

        if (!active) {
            setToastMessage('تم إضافة المنتج إلى المفضلة');
        } else {
            setToastMessage('تم إزالة المنتج من المفضلة');
        }
        setShowToast(true);
    };

    return (
        <>
            <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={handleToggle}
                className={cn(
                    "p-2.5 rounded-full backdrop-blur-md transition-all duration-300",
                    active
                        ? "bg-red-50 text-red-500 shadow-md ring-1 ring-red-100"
                        : "bg-white/80 text-charcoal hover:bg-white shadow-sm ring-1 ring-gray-100",
                    className
                )}
                aria-label={active ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
                <Heart
                    size={20}
                    className={cn(
                        "transition-transform duration-300",
                        active && "fill-current scale-110"
                    )}
                />
            </motion.button>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
};
