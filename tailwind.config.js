/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F8A92D",
        blue: {
          light: "#1D2232",
          dark: "#151A2A",
        },
        white: "#E8EDF1",
        gray: "#6B6B6B",
        placeholder: "#757575",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        xs: ".75rem",
        sm: "14px",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      boxShadow: {
        custom: "0 1px 3px rgba(0, 0, 0, 0.30)",
      },
    },
  },
  plugins: [],
};
