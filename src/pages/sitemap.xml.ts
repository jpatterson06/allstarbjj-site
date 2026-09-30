// Hand-rolled sitemap. (@astrojs/sitemap 3.7 needs Astro 5; this site runs Astro 4.)
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { towns } from '../lib/towns';

const SITE = 'https://allstarbjj.com';
const EXCLUDE = new Set(['/thanks/', '/schedule/', '/privacy-policy/', '/terms-of-service/']);

export const GET: APIRoute = async () => {
  const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));
  const paths = new Set<string>();
  for (const f of pageFiles) {
    if (f.includes('[')) continue; // dynamic routes added below
    let p = f.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/index$/, '/');
    if (p === '/index') p = '/';
    if (!p.endsWith('/')) p += '/';
    if (!EXCLUDE.has(p)) paths.add(p);
  }
  for (const t of towns) paths.add(`/trial/${t.slug}/`);
  for (const post of await getCollection('blog')) paths.add(`/blog/${post.slug}/`);

  const urls = [...paths].sort()
    .map((p) => `  <url><loc>${SITE}${p}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
