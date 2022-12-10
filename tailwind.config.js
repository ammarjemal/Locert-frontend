/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0px 11px 26px -9px rgba(52, 211, 153, 0.7)',
        '3xl': '0px 11px 26px -9px rgba(52, 211, 153, 1)',
      },
      // box-shadow: ;
    },
  },
  plugins: [],
}
