import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['adult-bjj', 'adult-mma', 'adult-muay-thai', 'kids']),
    meta_description: z.string(),
    hero_image: z.string().optional(),
    pubDate: z.date().optional(),
  }),
});

export const collections = { blog };
