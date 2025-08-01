/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}