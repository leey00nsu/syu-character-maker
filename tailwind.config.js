/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    screens: {
      ...require('tailwindcss/defaultConfig').theme.screens,
      xs: '450px',
      '3xl': '1920px',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#66CC8A',

          secondary: '#377CFB',

          accent: '#EA5234',

          neutral: '#333C4D',

          'base-100': '#FFFFFF',

          info: '#3ABFF8',

          success: '#36D399',

          warning: '#FBBD23',

          error: '#F87272',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
