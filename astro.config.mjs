import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ccd-iota.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()],
  security: {
    checkOrigin: false
  }
});