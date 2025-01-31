interface BookContent {
  [chapterId: string]: string[] // chapterId 是字符串，内容是字符串数组
};
// server/api/books/[bookId]/chapters/[chapterId].ts
export default defineEventHandler(async (event) => {
  // 1. 获取参数
  const bookId = getRouterParam(event, 'bookId')
  const chapterId = getRouterParam(event, 'chapterId')
  if (!bookId || !chapterId)
    return
  const bookIdNew = decodeURIComponent(bookId)
  const chapterIdNew = decodeURIComponent(chapterId)

  console.log('bookIdNew', bookIdNew)
  console.log('chapterIdNew', chapterIdNew)

  const name = `${bookIdNew}-content`
  const bookResult = await queryCollection(event, 'booksDetail')
    .where('title', '=', name)
    .first()
  console.log('bookResult12312312', bookResult)

  //  选择返回的章节内容
  const chapter = bookResult.meta.content as BookContent
  const chapterContent = chapter[chapterIdNew]
  console.log('chapterContent', chapterContent)

  // 3. 返回结果
  return {
    chapterContent,
  }
})
