/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#f0f4ff",
          100: "#e0e8ff",
          200: "#c7d4fe",
          300: "#a4b8fc",
          400: "#7a91f8",
          500: "#5468f2",
          600: "#3d45e6",
          700: "#003399",
          800: "#002266",
          900: "#001144",
          950: "#000922"
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f"
        },
        surface: {
          50: "#f8fafc",
          100: "#1e293b",
          200: "#1a2234",
          300: "#151c2c",
          400: "#111827",
          500: "#0d1320",
          600: "#0a0f18",
          700: "#070b12",
          800: "#05080d",
          900: "#030508"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      }
    }
  },
  plugins: []
};
