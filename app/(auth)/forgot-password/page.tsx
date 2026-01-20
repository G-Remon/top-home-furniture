import AuthContainer from "@/components/auth/AuthContainer";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recover Password | Top Home",
};

export default function ForgotPasswordPage() {
    return (
        <AuthContainer
            title="Lost your way?"
            subtitle="Enter your email and we'll help you get back to your account"
        >
            <ForgotPasswordForm />
        </AuthContainer>
    );
}
