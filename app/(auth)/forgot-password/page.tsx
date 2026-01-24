import AuthContainer from "@/components/auth/AuthContainer";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "استعادة كلمة المرور | توب هوم",
};

export default function ForgotPasswordPage() {
    return (
        <AuthContainer
            title="هل ضللت الطريق؟"
            subtitle="أدخل بريدك الإلكتروني وسنساعدك في العودة إلى حسابك"
        >
            <ForgotPasswordForm />
        </AuthContainer>
    );
}
