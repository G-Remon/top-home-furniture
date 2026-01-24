import AuthContainer from "@/components/auth/AuthContainer";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "انضم إلينا | توب هوم للأثاث",
    description: "أنشئ حساباً في توب هوم وابدأ في بناء مساحة معيشة أحلامك اليوم.",
};

export default function RegisterPage() {
    return (
        <AuthContainer
            title="إنشاء حساب"
            subtitle="انضم إلى مجتمعنا من عشاق ديكور المنزل"
        >
            <RegisterForm />
        </AuthContainer>
    );
}
