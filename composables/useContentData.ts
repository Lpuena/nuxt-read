import type { Book, BookDetail } from '~/types/bookTypes'
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
/** 获取章节标题(以及章节内容-可选) */
export async function useChapters(bookTitle: string, chapterId?: string) {
  const bookRes = await queryCollection('booksSections')
    .where('title', '=', bookTitle)
    .first()

  const bookResult = bookRes || { meta: { sections: [], body: {} } }
  // console.log('bookResult:', bookResult)

  const sections = bookRes.sections

  const bookDetail = bookResult.meta.body as BookDetail

  const bookId = bookDetail.id
  // 获取章节详细内容
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

  const chapters = bookResult.content

  // 选择 chapter 中chapterId 对应的章节内容
  const chapter = chapters.find(chapter => chapter.chapterId === chapterId)
  const chapterContent = chapter?.chapterContent || []
  return chapterContent
}

/** 获取所有章节名称信息 */
async function useAllChapters() {
  const bookResult = await queryCollection('booksSections')
    .all()
  return bookResult
}
/** 获取所有章节具体内容 */
async function useAllChapterContent() {
  const bookResult = await queryCollection('booksDetail')
    .all()
  return bookResult
}

/** 搜索 */
export async function useGlobalSearch(keyword: string) {
  // 1. 搜索书籍元数据
  const books = await useBooks()
  console.log('books:', books)

  const matchedBooks = books.filter(book =>
    Object.values(book).some(value =>
      String(value).toLowerCase().includes(keyword.toLowerCase()),
    ),
  )
  console.log('matchedBooks:', matchedBooks)

  // 2. 搜索章节标题
  const structures = await useAllChapters()
  console.log('structures:', structures)

  const matchedStructures = structures.filter(structure =>
    Object.values(structure.sections.map(item => item.chapters.map(chapter => chapter.chapterTitle))).some(value =>
      String(value).toLowerCase().includes(keyword.toLowerCase()),
    ),
  )
  console.log('matchedSections:', matchedStructures)

  // TODO: 3. 搜索章节内容
  const contents = await useAllChapterContent()
  console.log('contents:', contents)
  const matchedContents = contents.filter(content =>
    Object.values(content.content.map(item => item.chapterContent)).some(value =>
      String(value).toLowerCase().includes(keyword.toLowerCase()),
    ),
  )
  console.log('matchedContents:', matchedContents)

  return {
    /** 匹配到的书籍 */
    books: matchedBooks,
    /** 匹配到的章节标题 */
    structures: matchedStructures,
    /** 匹配到的章节内容 */
    contents: matchedContents,
  }
}
