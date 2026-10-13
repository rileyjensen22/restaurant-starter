import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { business } from './src/config/business';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: business.siteUrl,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
