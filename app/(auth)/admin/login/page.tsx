import AuthContainer from "@/components/auth/AuthContainer";
import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Access | Top Home",
    description: "Secure administrative access for Top Home staff members.",
};

export default function AdminLoginPage() {
    return (
        <AuthContainer
            title="Terminal Access"
            subtitle="Authorized personnel only. All activities are monitored."
        >
            <AdminLoginForm />
        </AuthContainer>
    );
}
