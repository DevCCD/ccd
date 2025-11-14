/** @type {import('tailwindcss').Config} */
module.exports = { // Ojo, puede ser module.exports en vez de export default
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true, // Esto centra el contenedor automáticamente
      padding: '1.5rem', // Mantenemos un padding lateral (24px)
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px', // Aumentamos el ancho máximo en pantallas muy grandes
      },
    },
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