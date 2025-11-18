import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind"; // <-- 1. LA IMPORTACIÓN



// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()] // <-- 2. LA INTEGRACIÓN
});