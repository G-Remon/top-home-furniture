"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "outline" | "ghost";
}

const AuthButton = ({
    children,
    isLoading,
    variant = "primary",
    className,
    disabled,
    ...props
}: AuthButtonProps) => {
    const variants = {
        primary: "bg-wood-brown text-white hover:bg-wood-brown/90 shadow-lg shadow-wood-brown/20",
        secondary: "bg-charcoal text-white hover:bg-charcoal/90",
        outline: "bg-transparent border-2 border-wood-brown text-wood-brown hover:bg-wood-brown/5",
        ghost: "bg-transparent text-soft-gray hover:text-charcoal hover:bg-gray-100",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || disabled}
            className={cn(
                "w-full py-3.5 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm",
                variants[variant],
                (isLoading || disabled) && "opacity-70 cursor-not-allowed",
                className
            )}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
            ) : (
                children
            )}
        </motion.button>
    );
};

export default AuthButton;
