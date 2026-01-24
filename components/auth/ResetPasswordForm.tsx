"use client";

import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ResetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => router.push("/login"), 3000);
        }, 2000);
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

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
                label="كلمة المرور الجديدة"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                required
            />
            <AuthInput
                label="تأكيد كلمة المرور الجديدة"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                required
            />

            <AuthButton isLoading={isLoading} className="mt-4">
                إعادة تعيين كلمة المرور
            </AuthButton>
        </form>
    );
};

export default ResetPasswordForm;
