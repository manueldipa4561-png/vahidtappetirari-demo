import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    code: z.string(),
    price: z.number(),
    category: z.string(),
    dimensions: z.string(),
    material: z.string().optional(),
    description: z.string(),
    sourceUrl: z.string(),
    images: z.array(z.string()),
    related: z.array(z.string()),
  }),
});

export const collections = { products };
