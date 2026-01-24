import AuthContainer from "@/components/auth/AuthContainer";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "إعادة تعيين كلمة المرور | توب هوم",
};

export default function ResetPasswordPage() {
    return (
        <AuthContainer
            title="تأمين الحساب"
            subtitle="قم بتعيين كلمة مرور جديدة قوية لحساب توب هوم الخاص بك"
        >
            <ResetPasswordForm />
        </AuthContainer>
    );
}
