/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecf5ff",
          500: "#1e3a8a",
          600: "#1e40af",
          700: "#1d4ed8",
        },
        emerald: {
          500: "#10b981",
        },
      },
    },
  },
  plugins: [],
};
