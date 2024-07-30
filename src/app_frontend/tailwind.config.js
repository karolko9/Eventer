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
        accent: '#EC1D79',
      },
      height: {
        desktop: 'calc(100vh - 65px)',
        mobile: 'calc(100vh - 130px)'
      }
    }
  },
  plugins: []
};