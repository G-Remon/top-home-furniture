"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthContainerProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    showLogo?: boolean;
}

const AuthContainer = ({
    children,
    title,
    subtitle,
    showLogo = true,
}: AuthContainerProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-wood-brown/5 border border-gray-100/50 overflow-hidden">
                    {/* Header */}
                    <div className="pt-10 pb-6 px-8 text-center">
                        {showLogo && (
                            <Link href="/" className="inline-block mb-6 group">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-10 h-10 bg-wood-brown rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                                        T
                                    </div>
                                    <span className="text-2xl font-bold text-charcoal tracking-tight">
                                        Top<span className="text-wood-brown">Home</span>
                                    </span>
                                </div>
                            </Link>
                        )}
                        <h1 className="text-2xl font-bold text-charcoal mb-2">{title}</h1>
                        {subtitle && (
                            <p className="text-soft-gray text-sm leading-relaxed">{subtitle}</p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="px-8 pb-10">{children}</div>
                </div>

                {/* Footer Links (Optional context based) */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-soft-gray">
                        &copy; {new Date().getFullYear()} Top Home Furniture. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthContainer;
