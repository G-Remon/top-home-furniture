import AuthContainer from "@/components/auth/AuthContainer";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join Us | Top Home Furniture",
    description: "Create a Top Home account and start building your dream living space today.",
};

export default function RegisterPage() {
    return (
        <AuthContainer
            title="Create Account"
            subtitle="Join our community of home decor enthusiasts"
        >
            <RegisterForm />
        </AuthContainer>
    );
}
