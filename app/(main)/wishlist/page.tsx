// app/(main)/wishlist/page.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/products/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
    const { wishlist } = useWishlist();
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            setIsReady(true);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated || !isReady) {
        return null; // Or loading spinner could go here
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2 text-right">
                        <div className="flex items-center justify-end gap-3 text-red-500 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest">مجموعتك المفضلة</span>
                            <Heart className="fill-current" size={24} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-charcoal tracking-tight">
                            قائمة <span className="text-wood-brown">الأمنيات</span>
                        </h1>
                        <p className="text-soft-gray max-w-xl mr-auto">
                            قائمة منسقة لقطع الأثاث المفضلة لديك. هل أنت مستعد لتحويل منزلك؟
                        </p>
                    </div>
                </div>

                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
                    >
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <Heart size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-charcoal mb-2">قائمة الأمنيات فارغة</h2>
                        <p className="text-soft-gray mb-8 max-w-md">
                            تصفح مجموعتنا واضغط على أيقونة القلب على أي منتج لحفظه هنا لوقت لاحق.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white rounded-2xl font-bold hover:bg-wood-brown transition-all group"
                        >
                            استكشف المنتجات
                            <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform rotate-180" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Benefits / Footer info */}
                {wishlist.length > 0 && (
                    <div className="mt-20 p-12 bg-charcoal rounded-[3rem] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-wood-brown/10 rounded-full blur-[100px]" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-right">
                                <h3 className="text-2xl font-bold mb-2">جاهز للإتمام؟</h3>
                                <p className="text-white/60">اطلب مفضلاتك الآن عبر واتساب للحصول على مساعدة مخصصة.</p>
                            </div>
                            <Link
                                href="/products"
                                className="px-8 py-4 bg-wood-brown text-white rounded-2xl font-bold hover:bg-white hover:text-charcoal transition-all shadow-xl shadow-wood-brown/20"
                            >
                                متابعة التسوق
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
