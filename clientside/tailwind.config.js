/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "serif"],
        secondary: ["Edu AU VIC WA NT Pre", "cursive"],
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out",
        bounceSlow: "bounceSlow 2s infinite",
        slideIn: "slideIn 0.5s ease-out",
        pulseSlow: "pulseSlow 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
