"use client";

import { User, Mail, Phone, Lock, ArrowRight, AlertCircle } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const RegisterForm = () => {
    const { register: registerUser, isLoading, error: authError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data);
        } catch (err) {
            // Error is handled in useAuth
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("fullName")}
                label="الاسم بالكامل"
                placeholder="جرجس ريمون"
                icon={User}
                error={errors.fullName?.message}
            />

            <AuthInput
                {...register("email")}
                label="البريد الإلكتروني"
                type="email"
                placeholder="name@example.com"
                icon={Mail}
                error={errors.email?.message}
            />

            <AuthInput
                {...register("phoneNumber")}
                label="رقم الهاتف"
                type="tel"
                placeholder="01001016695"
                icon={Phone}
                error={errors.phoneNumber?.message}
            />

            <AuthInput
                {...register("password")}
                label="كلمة المرور"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.password?.message}
            />

            <AuthInput
                {...register("confirmPassword")}
                label="تأكيد كلمة المرور"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.confirmPassword?.message}
            />

            <div className="px-1 text-[11px] text-soft-gray leading-relaxed italic text-right">
                بالتسجيل، أنت توافق على{" "}
                <Link href="/terms" className="underline hover:text-wood-brown">شروط الخدمة</Link> و{" "}
                <Link href="/privacy" className="underline hover:text-wood-brown">سياسة الخصوصية</Link> الخاصة بنا.
            </div>

            <AuthButton isLoading={isLoading} type="submit" className="mt-4">
                إنشاء حساب
                {!isLoading && <ArrowRight size={18} className="rotate-180" />}
            </AuthButton>

            <p className="text-center text-sm text-soft-gray pt-2">
                لديك حساب بالفعل؟{" "}
                <Link
                    href="/login"
                    className="font-bold text-charcoal hover:text-wood-brown transition-colors"
                >
                    تسجيل الدخول
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;

