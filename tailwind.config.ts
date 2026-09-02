import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D71920",
          darkred: "#9E1117",
          crimson: "#B3131A",
          brightred: "#FF2A32",
          black: "#090909",
          dark: "#121212",
          charcoal: "#1A1A1A",
          surface: "#1E1E22",
          cream: "#FFF1E6",
          offwhite: "#F8F5F0",
          gold: "#FFB020",
          amber: "#FF7A00"
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(215, 25, 32, 0.3)",
        "glow-md": "0 0 30px rgba(215, 25, 32, 0.4)",
        "glow-lg": "0 0 50px rgba(215, 25, 32, 0.55)",
        "glow-gold": "0 0 30px rgba(255, 176, 32, 0.35)",
        "card-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "pizza-glow": "radial-gradient(circle at center, rgba(215, 25, 32, 0.18) 0%, rgba(9, 9, 9, 0) 70%)",
        "red-shimmer": "linear-gradient(135deg, #D71920 0%, #9E1117 50%, #680A0E 100%)",
        "dark-glass": "linear-gradient(180deg, rgba(26, 26, 26, 0.8) 0%, rgba(14, 14, 14, 0.9) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
