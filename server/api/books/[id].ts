interface Chapter {
  id: number
  chapter: string
}
interface Body {
  id: string
  title: string
  author: string
  chapters: Chapter[]
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id)
    return
  const idNew = decodeURIComponent(id)
  // console.log('id:', idNew)

  const bookResult = await queryCollection(event, 'booksDetail')
    .where('title', '=', idNew)
    .first()
  // console.log('bookResultDetail:', bookResult)

  const chapters = bookResult.meta.chapters as Chapter[]
  const body = bookResult.meta.body as Body
  return {
    chapters,
    body,
    // sections: await getSections(id) // 获取章节数据
  }
})
