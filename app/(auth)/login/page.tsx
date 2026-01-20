import AuthContainer from "@/components/auth/AuthContainer";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Top Home Furniture",
    description: "Sign in to your Top Home account to manage your orders and furniture wishlist.",
};

export default function LoginPage() {
    return (
        <AuthContainer
            title="Welcome Back"
            subtitle="Sign in to continue your home transformation journey"
        >
            <LoginForm />
        </AuthContainer>
    );
}
