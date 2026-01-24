import AuthContainer from "@/components/auth/AuthContainer";
import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "وصول المشرف | توب هوم",
    description: "وصول إداري آمن لأعضاء فريق توب هوم.",
};

export default function AdminLoginPage() {
    return (
        <AuthContainer
            title="وصول الإدارة"
            subtitle="للموظفين المصرح لهم فقط. جميع الأنشطة مراقبة."
        >
            <AdminLoginForm />
        </AuthContainer>
    );
}
