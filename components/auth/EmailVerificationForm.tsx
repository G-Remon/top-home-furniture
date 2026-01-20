"use client";

import { useState } from "react";
import { Mail, ShieldCheck, MailQuestion } from "lucide-react";
import AuthButton from "./AuthButton";
import { motion } from "framer-motion";
import Link from "next/link";

const EmailVerificationForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleResend = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="text-center space-y-8">
            <div className="relative inline-block">
                <div className="w-24 h-24 bg-wood-brown/10 rounded-[2.5rem] flex items-center justify-center text-wood-brown rotate-12">
                    <Mail size={48} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white shadow-lg rounded-2xl flex items-center justify-center text-olive">
                    <ShieldCheck size={24} />
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="text-xl font-bold text-charcoal tracking-tight">Verify your email</h2>
                <p className="text-sm text-soft-gray leading-relaxed">
                    We've sent a verification link to your email address. <br />
                    Please click the link to activate your account.
                </p>
            </div>

            <div className="space-y-4">
                <AuthButton isLoading={isLoading} onClick={handleResend}>
                    Resend Verification Email
                </AuthButton>
                <Link
                    href="/login"
                    className="block text-sm font-semibold text-soft-gray hover:text-charcoal transition-colors underline decoration-gray-200"
                >
                    Back to Login
                </Link>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-soft-gray">
                <MailQuestion size={14} />
                <span>Didn't receive anything? Check your spam folder.</span>
            </div>
        </div>
    );
};

export default EmailVerificationForm;
