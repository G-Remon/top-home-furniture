"use client";

import { Mail, ArrowLeft, Send, AlertCircle } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const ForgotPasswordForm = () => {
    const { forgotPassword, isLoading, error: authError } = useAuth();
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const email = watch("email");

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await forgotPassword(data);
            setIsSent(true);
        } catch (err) {
            // Error is handled in useAuth
        }
    };

    if (isSent) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="w-20 h-20 bg-olive/10 text-olive rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={40} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-charcoal">تحقق من بريدك الإلكتروني</h2>
                    <p className="text-sm text-soft-gray">
                        لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى <br />
                        <span className="font-semibold text-charcoal">{email}</span>
                    </p>
                </div>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-wood-brown hover:gap-3 transition-all"
                >
                    <ArrowLeft size={16} className="rotate-180" />
                    العودة لتسجيل الدخول
                </Link>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <AuthInput
                {...register("email")}
                label="البريد الإلكتروني"
                placeholder="أدخل بريدك الإلكتروني المسجل"
                icon={Mail}
                error={errors.email?.message}
            />

            <AuthButton isLoading={isLoading} type="submit">
                إرسال رابط التعيين
            </AuthButton>

            <div className="text-center">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-soft-gray hover:text-charcoal transition-colors underline underline-offset-4 decoration-gray-200"
                >
                    <ArrowLeft size={16} className="rotate-180" />
                    تذكرت كلمة المرور؟
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
