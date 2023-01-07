/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#01959F',
        borderprimary: '#4DB5BC',
        borderdanger: '#F5B1B7',
        danger: '#E11428',
        borderwarning: '#FEEABC',
        warning: '#FA9810',
        light: '#FFFAFA',
        bordersuccess: '#B8DBCA',
        success: '#43936C',
      },
    },
  },
  plugins: [],
};
