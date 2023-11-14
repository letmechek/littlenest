/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom-font': ['"DM Serif Display"', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],

      },
      backgroundColor: {
        'custom-yellow': '#EBE2D5',
        'custom-yellow1': 'bg-yellow-700',
      }
    },
  },
  plugins: [],
}