/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ffffff",
        accent: "#333333",
        muted: "#737373",
        neon: "#8b5cf6" /* Innovative Violet */,
        vibrant: "#ec4899" /* Striking Pink for Contact */,
        cupido: "#ec4899" /* Striking Pink for Cupido highlight */,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
