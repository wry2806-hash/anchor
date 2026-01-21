import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030020",
        mute: "#030020",
        blue: "#00B2FF",
        deep: "#030020",
        paper: "#FFFFFF",
        tint: "#F4F8FF",
        line: "#E5E7EB"
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(11, 95, 255, 0.08)",
        lift: "0 20px 40px rgba(10, 10, 11, 0.08)"
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
