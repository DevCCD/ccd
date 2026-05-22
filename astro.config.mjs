import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // En Astro 5, el comportamiento 'hybrid' ya es el predeterminado
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind()]
});