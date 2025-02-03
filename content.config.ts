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
    docs: defineCollection({
      source: '**',
      type: 'page',
    }),
    // books: defineCollection({
    //   type: 'data',
    //   source: 'books.json',
    //   schema: z.object({
    //     title: z.string(),
    //     author: z.string(),
    //     description: z.string(),
    //     year: z.string(),
    //   }),
    // }),
    books: defineCollection({
      type: 'data',
      source: 'books.json',
      schema: z.object({
        books: z.array(
          z.object({
            title: z.string(),
            author: z.string(),
            description: z.string(),
            year: z.string(),
          }),
        ),
        path: z.string(), // 添加 path 字段定义
      }),
    }),
    booksSections: defineCollection({
      type: 'data',
      source: 'booksSections/**.json',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        description: z.string(),
        sections: z.array(
          z.object({
            type: z.string(),
            chapters: z.array(
              z.object({
                id: z.number(),
                chapterTitle: z.string(),
              }),
            ),
          }),
        ),
      }),
    }),
    booksDetail: defineCollection({
      type: 'data',
      source: 'booksDetail/**.json',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        content: z.array(
          z.object(
            {
              chapterId: z.string(),
              chapterContent: z.array(z.string()),
            },
          ),
        ),
      }),
    }),
  },
})
