"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
                label="Full Name"
                placeholder="John Doe"
                icon={User}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <AuthInput
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                icon={Mail}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />

            <AuthInput
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 890"
                icon={Phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <AuthInput
                    label="Confirm"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                />
            </div>

            <div className="px-1 text-[11px] text-soft-gray leading-relaxed italic">
                By registering, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-wood-brown">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="underline hover:text-wood-brown">Privacy Policy</Link>.
            </div>

            <AuthButton isLoading={isLoading} className="mt-4">
                Create Account
                {!isLoading && <ArrowRight size={18} />}
            </AuthButton>

            <p className="text-center text-sm text-soft-gray pt-2">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-bold text-charcoal hover:text-wood-brown transition-colors"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;
