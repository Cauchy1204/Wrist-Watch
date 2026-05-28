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
        ink: "#172033",
        mist: "#F5F7FF",
        violet: "#7667F5",
        azure: "#3D8BFF",
        pulse: "#17BEBB"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(43, 58, 103, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
