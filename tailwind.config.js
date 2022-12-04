/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/commons/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        spin: 'spin 2s linear infinite',
        spin2: 'spin2 2s linear infinite',
      },
      keyframes:{
        spin: {
          '0%': {transform: 'rotate(0deg)', opacity:1},
          '50%': {transform: 'rotate(180deg)', opacity:.6},
          '100%': {transform: 'rotate(360deg)', opacity:1},
        },
        spin2: {
          '0%': {transform: 'rotate(0deg)', opacity:.6},
          '50%': {transform: 'rotate(-180deg)', opacity:1},
          '100%': {transform: 'rotate(-360deg)', opacity:.6},
        },
      }
    },
  },
  plugins: [],
}