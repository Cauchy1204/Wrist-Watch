import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2F293D",
        mist: "#F5F3FF",
        violet: "#8B5CF6",
        azure: "#A78BFA",
        pulse: "#0EA5A4"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(91, 70, 130, 0.10)",
        lift: "0 12px 30px rgba(91, 70, 130, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
