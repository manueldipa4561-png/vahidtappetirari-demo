import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://vahidtappetirari-demo.netlify.app',
  vite: { plugins: [tailwindcss()] },
});
