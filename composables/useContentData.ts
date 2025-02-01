import type { Body, Book, BookContent, Chapter } from '~/types/bookTypes'
// 获取作者数据
// export async function useAuthors() {
//   return await queryContent('authors')
//     .where({ url: 'larbish' })
//     .findOne()
// }

/** 获取书籍数据 */
export async function useBooks() {
  const booksRes = await useAsyncData (() => queryCollection('books').all())
  console.log('booksRes:', booksRes)

  const booksResult = booksRes.data.value || []
  return booksResult[0].meta.books as Book[]
}

/** 获取章节数据 */
export async function useChapters(bookTitle: string, chapterId: string) {
  const bookRes = await useAsyncData(() => queryCollection('booksDetail')
    .where('title', '=', bookTitle)
    .first())
  const bookResult = bookRes.data.value || { meta: { chapters: [], body: {} } }

  const chapters = bookResult.meta.chapters as Chapter[]
  const body = bookResult.meta.body as Body

  const bookId = body.id
  return {
    chapters,
    body,
    chapterContent: await useChapterContent(bookId, chapterId), // 获取章节数据
  }
}

/** 获取章节内容 */
export async function useChapterContent(bookId: string, chapterId: string) {
  const name = `${bookId}-content`
  const bookResult = await queryCollection('booksDetail')
    .where('title', '=', name)
    .first()

  const chapter = bookResult.meta.content as BookContent
  const chapterContent = chapter[chapterId]
  return chapterContent
}
