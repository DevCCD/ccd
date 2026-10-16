import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ccd-iota.vercel.app',
  output: 'static',
  integrations: [tailwind(), sitemap({
      // /blog es una página de ejemplo (datos de prueba): fuera del sitemap hasta que tenga contenido real
      filter: (page) => !page.includes('/blog'),
    })],
  security: {
    checkOrigin: false
  }
});