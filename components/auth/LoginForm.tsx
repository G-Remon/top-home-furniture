"use client";

import { useMemo } from "react";
import { Mail, Phone, Lock, ArrowRight, AlertCircle } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = ({ isAdmin = false }: { isAdmin?: boolean }) => {
    const { login, isLoading, error: authError } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const identifier = watch("email");

    const inputType = useMemo(() => {
        if (!identifier) return "email"; // Default
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(identifier)) return "email";
        const phoneRegex = /^[\d\s+()-]{7,}$/;
        if (phoneRegex.test(identifier)) return "phone";
        return "email";
    }, [identifier]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
        } catch (err) {
            // Error is handled in useAuth and displayed via authError
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AnimatePresence>
                {authError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-3 flex items-start gap-3 text-sm"
                    >
                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                        <span>{authError}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                <div className="relative">
                    <AuthInput
                        {...register("email")}
                        label={inputType === "phone" ? "رقم الهاتف" : "البريد الإلكتروني"}
                        placeholder={
                            inputType === "phone"
                                ? "مثال: +20 123 456 7890"
                                : "مثال: name@example.com"
                        }
                        icon={inputType === "phone" ? Phone : Mail}
                        error={errors.email?.message}
                    />

                    <AnimatePresence>
                        {identifier && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute right-3 top-[42px] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-soft-gray pointer-events-none"
                            >
                                {inputType === "phone" ? "هاتف" : "بريد"}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AuthInput
                    {...register("password")}
                    label="كلمة المرور"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    error={errors.password?.message}
                />
            </div>

            <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-wood-brown focus:ring-wood-brown/20 transition-all cursor-pointer"
                    />
                    <span className="text-xs text-soft-gray group-hover:text-charcoal transition-colors">تذكرني</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-wood-brown hover:underline"
                >
                    نسيت كلمة المرور؟
                </Link>
            </div>

            <AuthButton isLoading={isLoading} type="submit">
                تسجيل الدخول
                {!isLoading && <ArrowRight size={18} className="rotate-180" />}
            </AuthButton>

            {!isAdmin && (
                <p className="text-center text-sm text-soft-gray pt-2">
                    ليس لديك حساب؟{" "}
                    <Link
                        href="/register"
                        className="font-bold text-charcoal hover:text-wood-brown transition-colors"
                    >
                        سجل الآن
                    </Link>
                </p>
            )}
        </form>
    );
};

export default LoginForm;

