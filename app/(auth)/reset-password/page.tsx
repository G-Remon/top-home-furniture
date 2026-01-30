import AuthContainer from "@/components/auth/AuthContainer";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "إعادة تعيين كلمة المرور | توب هوم",
};

export default function ResetPasswordPage() {
    return (
        <AuthContainer
            title="تأمين الحساب"
            subtitle="قم بتعيين كلمة مرور جديدة قوية لحساب توب هوم الخاص بك"
        >
            <Suspense fallback={
                <div className="flex items-center justify-center p-8">
                    <div className="w-8 h-8 border-4 border-wood-brown border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <ResetPasswordForm />
            </Suspense>
        </AuthContainer>
    );
}
