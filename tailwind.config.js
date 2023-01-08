/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        primary: '#01959F',
        borderprimary: '#4DB5BC',
        bgprimary: '#F7FEFF',
        borderdanger: '#F5B1B7',
        danger: '#E11428',
        borderwarning: '#FEEABC',
        warning: '#FA9810',
        bgwarning: ' #FFFCF5',
        lightwarning: '#FFFAFA',
        bordersuccess: '#B8DBCA',
        success: '#43936C',
        bgsuccess: '#F8FBF9',
        bordergrey: '#E0E0E0',
        bggrey: '#FAFAFA',
        textdark: '#404040',
        textblack: '#1E1F21',
        textgrey: '#1D1F20',
        borderdash: '#E0E0E0',
      },
    },
  },
  plugins: [],
};
