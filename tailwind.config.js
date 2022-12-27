/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          1000: '#010B13'
        },
        orange: {
          150: '#F0E6D2'
        }
      }
    }
  },
  plugins: []
};
