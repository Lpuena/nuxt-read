import type { Book, BookContent, BookDetail, Section } from '~/types/bookTypes'
// 获取作者数据
// export async function useAuthors() {
//   return await queryContent('authors')
//     .where({ url: 'larbish' })
//     .findOne()
// }

/** 获取书籍数据 */
export async function useBooks() {
  const booksRes = await useAsyncData('books', () => {
    return queryCollection('books').first()
  }, {
    // 确保服务端渲染时等待数据
    server: true,
    immediate: true,
  })
  // console.log('booksRes:', booksRes)

  const booksResult = booksRes.data.value || { meta: { books: [] } }
  return booksResult.meta.books as Book[]

  // const bookRes = await queryCollection('books').first()
  // return bookRes.meta.books as Book[]
}

/** 获取章节数据 */
export async function useChapters(bookTitle: string, chapterId?: string) {
  const bookRes = await useAsyncData(() => queryCollection('booksDetail')
    .where('title', '=', bookTitle)
    .first())
  const bookResult = bookRes.data.value || { meta: { sections: [], body: {} } }
  // console.log('bookResult:', bookResult)

  const sections = bookResult.meta.sections as Section[]
  const bookDetail = bookResult.meta.body as BookDetail

  const bookId = bookDetail.id
  // 获取章节数据
  let chapterContent = ['']
  if (chapterId) {
    chapterContent = await useChapterContent(bookId, chapterId)
  }
  return {
    sections,
    bookDetail,
    chapterContent,
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
