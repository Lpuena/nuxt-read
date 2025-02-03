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
  })
  // console.log('booksRes:', booksRes.data.value?.books)

  // const booksResult = booksRes.data.value || { meta: { books: [] } }
  // return booksResult.meta.books as Book[]
  return booksRes.data.value?.books as Book[]

  // const bookRes = await queryCollection('books').first()
  // return bookRes.meta.books as Book[]
}

/** 获取章节数据 */
// export async function useChapters(bookTitle: string, chapterId?: string) {
//   const bookRes = await useAsyncData(() => queryCollection('booksDetail')
//     .where('title', '=', bookTitle)
//     .first())
//   const bookResult = bookRes.data.value || { meta: { sections: [], body: {} } }
//   // console.log('bookResult:', bookResult)

//   const sections = bookResult.meta.sections as Section[]
//   const bookDetail = bookResult.meta.body as BookDetail

//   const bookId = bookDetail.id
//   // 获取章节数据
//   let chapterContent = ['']
//   if (chapterId) {
//     chapterContent = await useChapterContent(bookId, chapterId)
//   }
//   return {
//     sections,
//     bookDetail,
//     chapterContent,
//   }
// }

export async function useChapters(bookTitle: string, chapterId?: string) {
  const bookRes = await queryCollection('booksDetail')
    .where('title', '=', bookTitle)
    .first()

  const bookResult = bookRes || { meta: { sections: [], body: {} } }
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

/** 搜索书籍 */
// export async function useSearchBooks(keyword: string) {
//   const { data: sections } = await useAsyncData('search', () => {
//     return queryCollectionSearchSections('docs')
//   })
//   return sections
// }

/** 搜索书籍和章节 */
// export async function useSearch(query: string): Promise<{ books: Book[], sections: Section[] }> {
//   const books = await useBooks()
//   const allSections: Section[] = []

//   const filteredBooks = new Set<Book>()

//   // 遍历所有书籍并收集章节信息
//   for (const book of books) {
//     const { sections, chapterContent } = await useChapters(book.title)
//     allSections.push(...sections)

//     // 将章节内容展平为字符串以便搜索
//     const flattenedChapterContent = Object.values(chapterContent).join(' ').toLowerCase()
//     console.log('allSections:', allSections)

//     console.log('flattenedChapterContent:', flattenedChapterContent)

//     if (flattenedChapterContent.includes(query.toLowerCase())) {
//       // 如果章节内容匹配，则将该书添加到结果中
//       filteredBooks.add(book)
//     }
//   }

//   return { books: filteredBooks, sections: '123' }
// }
