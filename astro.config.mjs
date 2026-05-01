import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// Sitemap will be re-added once we have more than one route — single-page
// builds trip the @astrojs/sitemap integration.
export default defineConfig({
  site: 'https://allstarbjj.com',
  integrations: [
    tailwind(),
    mdx(),
  ],
  build: {
    format: 'directory', // /about-us/ instead of /about-us.html
  },
});
