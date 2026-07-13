import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://allstarbjj.com',
  integrations: [
    tailwind(),
    mdx(),
    // sitemap(), — temporarily disabled due to build error; will re-enable after cutover
  ],
  vite: { cacheDir: '/tmp/vite-cache' },
  build: {
    format: 'directory', // /about-us/ instead of /about-us.html
  },
});
