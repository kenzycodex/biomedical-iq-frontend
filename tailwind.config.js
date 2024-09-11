const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b0ff',
          400: '#3396ff',
          500: '#007bff',
          600: '#0062cc',
          700: '#004a99',
          800: '#003166',
          900: '#001933',
        },
        secondary: {
          50: '#f2f5f8',
          100: '#e6ebf1',
          200: '#ccd7e3',
          300: '#b3c3d5',
          400: '#99afc7',
          500: '#809bb9',
          600: '#667c94',
          700: '#4d5d70',
          800: '#333e4b',
          900: '#1a1f26',
        },
        success: {
          500: '#10B981',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
