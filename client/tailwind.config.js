/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aura: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EFE7D8',
          300: '#DFD1B8',
          400: '#C7AF8A',
          500: '#A27035',
          600: '#8C503A',
          700: '#5C3826',
          800: '#3D2817',
          900: '#1F140B',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
