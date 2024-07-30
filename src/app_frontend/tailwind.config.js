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
        primary500: 'rgba(91, 39, 102, 0.5)',
        primary300: 'rgba(91, 39, 102, 0.8)',
        accent: '#EC1D79',
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