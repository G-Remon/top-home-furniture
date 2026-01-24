// components/shared/Toast.tsx
'use client'

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    type?: 'success' | 'error';
}

export const Toast = ({ message, isVisible, onClose, type = 'success' }: ToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -100, x: '-50%', scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                    exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.9 }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-white/80 backdrop-blur-xl px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white min-w-[320px] max-w-[90vw]"
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                        }`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-charcoal font-black text-base leading-tight">{message}</p>
                        <p className="text-soft-gray text-[11px] font-bold uppercase tracking-wider mt-0.5">Top Home Notification</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-soft-gray"
                    >
                        <X size={18} />
                    </button>

                    {/* Progress Bar Animation */}
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 3, ease: "linear" }}
                        className={`absolute bottom-0 left-6 right-6 h-1 rounded-full origin-left ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
