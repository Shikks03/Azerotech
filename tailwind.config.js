/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-dark": "#080B1A",
        "indigo-electric": "#4F6EF7",
        "indigo-light": "#6B7FFF",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "7xl": "80rem",
        "4xl": "56rem",
        "2xl": "42rem",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [],
};

