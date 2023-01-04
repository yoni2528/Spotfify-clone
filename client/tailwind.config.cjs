// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef, @typescript-eslint/no-unused-vars
const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-2%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        shrink: {
          '0%': {
            opacity: '1',
            transform: 'translateX(-2%)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(0)'
          }
        }
      }
    }
  },
  plugins: []
};
