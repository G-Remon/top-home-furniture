import AuthContainer from "@/components/auth/AuthContainer";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | Top Home",
};

export default function ResetPasswordPage() {
    return (
        <AuthContainer
            title="Secure Account"
            subtitle="Set a strong new password for your Top Home account"
        >
            <ResetPasswordForm />
        </AuthContainer>
    );
}
