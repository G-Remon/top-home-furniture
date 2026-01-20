import AuthContainer from "@/components/auth/AuthContainer";
import OTPVerificationForm from "@/components/auth/OTPVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Phone | Top Home",
};

export default function VerifyOTPPage() {
    return (
        <AuthContainer
            title="Verify Phone"
            subtitle="We've sent a 6-digit code to your mobile device"
        >
            <OTPVerificationForm />
        </AuthContainer>
    );
}
