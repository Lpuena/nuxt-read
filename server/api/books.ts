import type { Book } from '~/types/bookTypes'

export default defineEventHandler(async (event) => {
  const booksResult = await queryCollection(event, 'books').all()

  const books = booksResult[0].meta.books as Book[]

  return { books }
})
