import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ccd-iota.vercel.app',
  output: 'static',
  integrations: [tailwind()],
  security: {
    checkOrigin: false
  }
});