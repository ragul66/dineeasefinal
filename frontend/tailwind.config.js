/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgcolor: "#2c3e50",
      },
      fontFamily: {
        primary: ["Poppins", "serif"],
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{html,js,jsx}",
//     "./components/**/*.{html,js,jsx}",
//     "./src/**/*.{html,js,jsx,tsx}",
//   ],
//   // ...
// };
