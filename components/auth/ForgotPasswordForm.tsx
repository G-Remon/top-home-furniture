"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Send } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { motion } from "framer-motion";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 2000);
    };

    if (isSent) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="w-20 h-20 bg-olive/10 text-olive rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={40} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-charcoal">Check your email</h2>
                    <p className="text-sm text-soft-gray">
                        We've sent a password reset link to <br />
                        <span className="font-semibold text-charcoal">{email}</span>
                    </p>
                </div>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-wood-brown hover:gap-3 transition-all"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <AuthInput
                label="Email Address"
                placeholder="Enter your registered email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <AuthButton isLoading={isLoading}>
                Send Reset Link
            </AuthButton>

            <div className="text-center">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-soft-gray hover:text-charcoal transition-colors underline underline-offset-4 decoration-gray-200"
                >
                    <ArrowLeft size={16} />
                    Remembered your password?
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
