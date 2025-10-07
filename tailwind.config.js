/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FFFDF5',
          100: '#FFE08A',
          200: '#FFD700',
          300: '#F4D03F',
          400: '#D4AF37',
          500: '#D4AF37',
          600: '#C5A028',
          700: '#B8941F',
          800: '#A68519',
          900: '#8B6F14',
        },
      },
    },
  },
  plugins: [],
};
