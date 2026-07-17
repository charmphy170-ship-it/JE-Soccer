import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // JE Soccer Bright Palette
        je: {
          neon: "#39FF14",
          lime: "#CCFF00",
          electric: "#00FF88",
          cyan: "#00F0FF",
          hot: "#FF3366",
          orange: "#FF9500",
          yellow: "#FFD700",
          purple: "#B829DD",
          blue: "#2979FF",
          dark: "#0A0A0F",
          darker: "#050508",
          card: "#12121A",
          surface: "#1A1A24",
          border: "#2A2A3A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.4s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #39FF14, 0 0 10px #39FF14" },
          "100%": { boxShadow: "0 0 20px #39FF14, 0 0 40px #39FF14" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
export default config
