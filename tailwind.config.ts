import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#FF4785',
          dark: '#E63D75',
          light: '#FF6B9E',
          50: '#FFF0F5',
          100: '#FFE1EC',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
