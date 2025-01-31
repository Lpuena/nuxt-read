import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    authors: defineCollection({
      type: 'data',
      source: 'authors/**.json',
      schema: z.object({
        name: z.string(),
        avatar: z.string(),
        url: z.string(),
      }),
    }),
    books: defineCollection({
      type: 'data',
      source: 'books.json',
      schema: z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        year: z.string(),
      }),
    }),
  },
})
