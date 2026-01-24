import AuthContainer from "@/components/auth/AuthContainer";
import EmailVerificationForm from "@/components/auth/EmailVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تحقق من البريد | توب هوم",
};

export default function VerifyEmailPage() {
    return (
        <AuthContainer
            title=""
            showLogo={true}
        >
            <EmailVerificationForm />
        </AuthContainer>
    );
}
