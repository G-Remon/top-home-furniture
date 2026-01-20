import AuthContainer from "@/components/auth/AuthContainer";
import EmailVerificationForm from "@/components/auth/EmailVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Email | Top Home",
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
