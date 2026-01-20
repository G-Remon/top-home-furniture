"use client";

import { useState, useMemo } from "react";
import { Mail, Phone, Lock, ArrowRight } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ isAdmin = false }: { isAdmin?: boolean }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const inputType = useMemo(() => {
        if (!identifier) return "email"; // Default
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(identifier)) return "email";
        const phoneRegex = /^[\d\s+()-]{7,}$/;
        if (phoneRegex.test(identifier)) return "phone";
        return "email";
    }, [identifier]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // UI Only - simulate loading
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
                <div className="relative">
                    <AuthInput
                        label={inputType === "phone" ? "Phone Number" : "Email Address"}
                        placeholder={
                            inputType === "phone"
                                ? "e.g. +1 234 567 890"
                                : "e.g. name@example.com"
                        }
                        icon={inputType === "phone" ? Phone : Mail}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />

                    <AnimatePresence>
                        {identifier && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute right-3 top-[42px] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-soft-gray"
                            >
                                {inputType}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-wood-brown focus:ring-wood-brown/20 transition-all cursor-pointer"
                    />
                    <span className="text-xs text-soft-gray group-hover:text-charcoal transition-colors">Remember me</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-wood-brown hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            <AuthButton isLoading={isLoading}>
                Sign In
                {!isLoading && <ArrowRight size={18} />}
            </AuthButton>

            {!isAdmin && (
                <p className="text-center text-sm text-soft-gray pt-2">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-bold text-charcoal hover:text-wood-brown transition-colors"
                    >
                        Register Now
                    </Link>
                </p>
            )}
        </form>
    );
};

export default LoginForm;
