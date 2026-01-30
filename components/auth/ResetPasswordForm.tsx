"use client";

import { useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, AlertCircle } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const ResetPasswordForm = () => {
    const { resetPassword, isLoading, error: authError } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: email,
            token: token,
            password: "",
            confirmPassword: "",
        },
    });

    // Update form values if search params change
    useEffect(() => {
        if (email) setValue("email", email);
        if (token) setValue("token", token);
    }, [email, token, setValue]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await resetPassword(data);
            setIsSuccess(true);
            setTimeout(() => router.push("/login"), 3000);
        } catch (err) {
            // Error is handled in useAuth
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="w-20 h-20 bg-olive text-white rounded-3xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-xl">
                    <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-charcoal">تم إعادة تعيين كلمة المرور!</h2>
                    <p className="text-sm text-soft-gray">
                        تم تحديث كلمة المرور الخاصة بك بنجاح. <br />
                        جاري توجيهك إلى تسجيل الدخول...
                    </p>
                </div>
            </motion.div>
        );
    }

    if (!email || !token) {
        return (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex items-start gap-3 text-sm">
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <div>
                    <h3 className="font-bold mb-1">رابط غير صالح</h3>
                    <p>عذراً، يبدو أن رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية. يرجى طلب رابط جديد.</p>
                </div>
            </div>
        );
    }

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

            <AuthInput
                {...register("password")}
                label="كلمة المرور الجديدة"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.password?.message}
            />
            <AuthInput
                {...register("confirmPassword")}
                label="تأكيد كلمة المرور الجديدة"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.confirmPassword?.message}
            />

            <AuthButton isLoading={isLoading} className="mt-4" type="submit">
                إعادة تعيين كلمة المرور
            </AuthButton>
        </form>
    );
};

export default ResetPasswordForm;
