"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
    length?: number;
    onComplete?: (code: string) => void;
    error?: boolean;
}

const OTPInput = ({ length = 6, onComplete, error }: OTPInputProps) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move focus to next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every((digit) => digit !== "") && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const data = e.clipboardData.getData("text").slice(0, length);
        if (!/^\d+$/.test(data)) return;

        const newOtp = [...otp];
        data.split("").forEach((digit, idx) => {
            newOtp[idx] = digit;
        });
        setOtp(newOtp);

        if (newOtp.every((digit) => digit !== "") && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    return (
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={cn(
                        "w-12 h-14 text-center text-xl font-bold bg-white border-2 border-gray-100 rounded-xl outline-none transition-all",
                        "focus:border-wood-brown focus:ring-4 focus:ring-wood-brown/5",
                        digit ? "border-wood-brown/50" : "border-gray-100",
                        error && "border-destructive focus:ring-destructive/5"
                    )}
                />
            ))}
        </div>
    );
};

export default OTPInput;
