/** @type {import('tailwindcss').Config} */
module.exports = { // Ojo, puede ser module.exports en vez de export default
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#CB6B6B',
          DEFAULT: '#910121',
          dark: '#700708',
        },
        secondary: {
          light: '#AEC4DB',
          DEFAULT: '#91AECC',
          dark: '#5D94C0',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}