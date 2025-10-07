/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffef7',
          100: '#fffbea',
          200: '#fff5c7',
          300: '#ffee9e',
          400: '#ffdd52',
          500: '#ffdd52',
          600: '#e6c749',
          700: '#ccb041',
          800: '#b39938',
          900: '#99832f',
        },
      },
    },
  },
  plugins: [],
};
