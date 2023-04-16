/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    extend: {
      colors: {
        blue1: '#00A6F1',
        blue2: '#007DD7',
        blue3: '#005AC1',
        blue4: '#003D95',
        black1: '#000000',
        gray1: '#E5E5E5',
        white1: '#FFFFFF',
        navborder: '#FFFFFF2e',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        homebg1: "url('/images/homebg_1.png')",
        consultbg: "url('/images/consult.png')",
      },
    },
    fontSize: {
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
      '10xl': '9rem',
      '11xl': '10rem',
      '12xl': '11rem',
      '13xl': '12rem',
      '14xl': '13rem',
      '15xl': '14rem',
    },
  },
  plugins: [],
};
