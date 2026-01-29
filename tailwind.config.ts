import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        "off-white": "#faf9f6",
        charcoal: "#1a1a1a",
        "wood-brown": "#D4AF37",
        olive: "#6b8e23",
        "soft-gray": "#6b7280",
        cream: "#F5F5DC",
        white: "#ffffff",
        background: "#faf9f6",
        foreground: "#1a1a1a",
        primary: "#D4AF37",
        "primary-foreground": "#ffffff",
        secondary: "#6b7280",
        "secondary-foreground": "#ffffff",
        accent: "#6b8e23",
        "accent-foreground": "#ffffff",
        card: "#ffffff",
        "card-foreground": "#1a1a1a",
        destructive: "#e63946",
        "destructive-foreground": "#ffffff",
        muted: "#f5f5f5",
        "muted-foreground": "#6b7280",
      },
      borderRadius: { lg: "0.5rem", md: "0.375rem", sm: "0.25rem" },
      fontFamily: { sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans] },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "zoom-in": { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
      animation: { "fade-in": "fade-in 0.5s ease-out", "zoom-in": "zoom-in 0.2s ease-out" },
    },
  },
  plugins: [],
};

export default config;
