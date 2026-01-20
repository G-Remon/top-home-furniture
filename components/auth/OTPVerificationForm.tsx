"use client";

import { useState } from "react";
import { Phone, CheckCircle2, RotateCcw } from "lucide-react";
import AuthButton from "./AuthButton";
import OTPInput from "./OTPInput";
import { motion } from "framer-motion";

const OTPVerificationForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleComplete = (code: string) => {
        console.log("OTP Complete:", code);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="w-20 h-20 bg-olive/10 text-olive rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-charcoal">Phone Verified</h2>
                    <p className="text-sm text-soft-gray">
                        Your phone number has been successfully verified.
                    </p>
                </div>
                <AuthButton onClick={() => window.location.href = "/"}>
                    Continue to Home
                </AuthButton>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
                <OTPInput length={6} onComplete={handleComplete} error={error} />

                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-sm font-semibold text-wood-brown hover:text-wood-brown/80 flex items-center gap-2"
                    >
                        <RotateCcw size={14} />
                        Resend Code (59s)
                    </button>
                </div>
            </div>

            <AuthButton isLoading={isLoading}>
                Verify OTP
            </AuthButton>
        </form>
    );
};

export default OTPVerificationForm;
