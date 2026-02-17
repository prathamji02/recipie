/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fde4b8',
          200: '#fbd389',
          300: '#f9c25a',
          400: '#f8b536',
          500: '#f7a812',
          600: '#f69d10',
          700: '#f48e0d',
          800: '#f2800a',
          900: '#ef6a05',
        },
        accent: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        }
      }
    },
  },
  plugins: [],
}
