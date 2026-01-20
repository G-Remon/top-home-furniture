"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: LucideIcon;
    success?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, icon: Icon, success, className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const inputType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div className="w-full space-y-2">
                <label className="text-sm font-medium text-charcoal/80 ml-1">
                    {label}
                </label>
                <div className="relative group">
                    {Icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-gray group-focus-within:text-wood-brown transition-colors">
                            <Icon size={18} />
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            "w-full bg-white border border-gray-200 text-charcoal rounded-xl py-3 px-10 outline-none transition-all",
                            "focus:border-wood-brown focus:ring-2 focus:ring-wood-brown/10",
                            "placeholder:text-gray-400 text-sm",
                            error && "border-destructive focus:border-destructive focus:ring-destructive/10",
                            success && "border-olive focus:border-olive focus:ring-olive/10",
                            !Icon && "px-4",
                            isPassword && "pr-12",
                            className
                        )}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-soft-gray hover:text-wood-brown transition-colors p-1"
                            tabIndex={-1}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={showPassword ? "eye-off" : "eye"}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    )}
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-destructive ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
