/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-marguerite': {
          '50': '#f4f3ff',
          '100': '#ebe9fe',
          '200': '#d9d6fe',
          '300': '#bdb5fd',
          '400': '#9c8cf9',
          '500': '#7a5af5',
          '600': '#6b3bec',
          '700': '#5c29d8',
          '800': '#4c22b5',
          '900': '#401e94',
          '950': '#261065',
        },

      }
    },
  },
  plugins: [],
}