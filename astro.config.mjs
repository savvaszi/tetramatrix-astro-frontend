// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'el'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.DIRECTUS_URL': JSON.stringify(process.env.DIRECTUS_URL),
      'import.meta.env.DIRECTUS_TOKEN': JSON.stringify(process.env.DIRECTUS_TOKEN),
    }
  }
});