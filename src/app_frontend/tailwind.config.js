/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        primary: '#5B2784',
        purple: {
          normal: '#572D8A',
        },
        orange: {
          normal: '#F05A24'
        },
        black: {
          normal: '#050008'
        },
        primary500: 'rgba(91, 39, 102, 0.5)',
        primary300: 'rgba(91, 39, 102, 0.8)',
        gray: {
          '100': 'rgba(0, 0, 0, 0.1)'
        },
        green: '#004F2D',
        accent: '#EC1D79',
        magnum: {
          '50': '#fff9ed',
          '100': '#fef2d6',
          '200': '#fce0ac',
          '300': '#f9c978',
          '400': '#f7b155',
          '500': '#f38d1c',
          '600': '#e47312',
          '700': '#bd5711',
          '800': '#964516',
          '900': '#793a15',
          '950': '#411c09'
        }
      },
      height: {
        desktop: 'calc(100vh - 65px)',
        mobile: 'calc(100vh - 130px)',
        mobileForm: 'calc(100vh - 180px)'
      },
      border: {
        color: 'rgba(0, 0, 0, 0.3)'
      },
    }
  },
  plugins: []
};