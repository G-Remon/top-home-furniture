import AuthContainer from "@/components/auth/AuthContainer";
import OTPVerificationForm from "@/components/auth/OTPVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تحقق من الهاتف | توب هوم",
};

export default function VerifyOTPPage() {
    return (
        <AuthContainer
            title="تحقق من الهاتف"
            subtitle="لقد أرسلنا رمزاً مكوناً من 6 أرقام إلى جهازك المحمول"
        >
            <OTPVerificationForm />
        </AuthContainer>
    );
}
