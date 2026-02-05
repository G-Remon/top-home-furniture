import AuthContainer from "@/components/auth/AuthContainer";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تسجيل الدخول | توب هوم للأثاث",
    description: "قم بتسجيل الدخول إلى حساب توب هوم الخاص بك لإدارة طلباتك وقائمة أمنيات الأثاث.",
};

export default function LoginPage() {
    return (
        <AuthContainer
            title="مرحباً بعودتك"
            subtitle="سجل الدخول للمتابعة في رحلة تجميل منزلك"
        >
            <LoginForm />
        </AuthContainer>
    );
}
