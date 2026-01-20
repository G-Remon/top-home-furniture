"use client";

import { useState } from "react";
import { Lock, UserCircle, Shield, ArrowRight } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";

const AdminLoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-charcoal text-white rounded-2xl mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-wood-brown" />
                </div>
                <div>
                    <h3 className="text-sm font-bold tracking-tight">Staff Access Only</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Security Level 4</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <AuthInput
                    label="Admin Username / ID"
                    placeholder="Enter staff ID"
                    icon={UserCircle}
                    required
                />

                <AuthInput
                    label="Security Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    required
                />

                <AuthButton isLoading={isLoading} variant="secondary" className="mt-4">
                    Authenticate
                    {!isLoading && <ArrowRight size={18} />}
                </AuthButton>

                <div className="text-center pt-2">
                    <Link
                        href="/"
                        className="text-xs font-medium text-soft-gray hover:text-charcoal transition-colors underline underline-offset-4 decoration-gray-200"
                    >
                        Return to Store Front
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AdminLoginForm;
