import type { Book, BookDetail, BookSections } from '~/types/bookTypes'

interface MatchPosition {
  field: string
  indices: [number, number] // 现在这个位置是相对于excerpt的
  excerpt: string
  // 添加可选定位属性
  chapterId?: string | number // 章节ID（仅内容匹配时存在）
  bookName?: string
  paragraphIndex?: number // 段落索引（仅内容匹配时存在）
  sectionType?: string // 章节类型（仅结构匹配时存在）
}

export interface SearchResult<T> {
  item: T
  matches: MatchPosition[]
}
/** 获取所有章节名称信息 */
async function useAllChapters() {
  const bookResult = await queryCollection('bookSections')
    .all()
  return bookResult
}
/** 获取所有章节具体内容 */
async function useAllChapterContent() {
  const bookResult = await queryCollection('bookDetail')
    .all()
  return bookResult
}

/** 搜索 */
export async function useGlobalSearch(keyword: string) {
  const lowerKeyword = keyword.toLowerCase()

  // 1. 搜索书籍元数据
  const books = await useBooks()
  const matchedBooks = findBookMatches(books, lowerKeyword)

  // 2. 搜索章节标题
  const structures = await useAllChapters()
  const matchedStructures = findStructureMatches(structures, lowerKeyword)

  // 3. 搜索章节内容
  const contents = await useAllChapterContent()
  const matchedContents = findContentMatches(contents, lowerKeyword)

  return {
    books: matchedBooks,
    structures: matchedStructures,
    contents: matchedContents,
  }
}

// 辅助函数：在字段值中查找匹配（修复中文标点问题）
function findFieldMatches(fieldValue: string, keyword: string, fieldName: string, chapterId?: number): Omit<MatchPosition, 'paragraphIndex'>[] {
  const matches: Omit<MatchPosition, 'paragraphIndex'>[] = []
  let startIndex = 0

  // 保持原始大小写进行匹配（不再转小写）
  while (true) {
    const foundIndex = fieldValue.indexOf(keyword, startIndex)
    if (foundIndex === -1)
      break

    // 使用原始文本计算上下文
    const { excerpt, indices } = getExcerpt(
      fieldValue,
      foundIndex,
      keyword.length,
    )

    matches.push({
      field: fieldName,
      indices,
      excerpt,
      chapterId,
    })

    startIndex = foundIndex + keyword.length
  }
  return matches
}

// 生成带上下文的摘要（修复偏移问题）
function getExcerpt(text: string, start: number, length: number): { excerpt: string, indices: [number, number] } {
  const contextStart = Math.max(0, start - 15)
  const contextEnd = start + length + 15
  const hasStartEllipsis = contextStart > 0
  const hasEndEllipsis = contextEnd < text.length

  // 实际截取内容（不带省略号）
  const rawExcerpt = text.slice(contextStart, contextEnd)

  // 计算在最终excerpt中的实际位置
  const excerptStartOffset = hasStartEllipsis ? 3 : 0 // 前面是否有省略号
  const adjustedStart = start - contextStart + excerptStartOffset
  const adjustedEnd = adjustedStart + length

  // 添加省略号
  return {
    excerpt: (hasStartEllipsis ? '...' : '') + rawExcerpt + (hasEndEllipsis ? '...' : ''),
    indices: [adjustedStart, adjustedEnd - 1], // 保持闭区间
  }
}

// 书籍匹配逻辑（保持原有 filter 结构）
function findBookMatches(books: Book[], keyword: string): SearchResult<Book>[] {
  return books.reduce((results, book) => {
    const matches: MatchPosition[] = []

    // 遍历所有字段，收集所有匹配项
    Object.entries(book).forEach(([key, value]) => {
      const fieldMatches = findFieldMatches(String(value), keyword, key)
      matches.push(...fieldMatches)
    })

    // 如果有匹配项，则加入结果
    if (matches.length > 0) {
      results.push({ item: book, matches })
    }

    return results
  }, [] as SearchResult<Book>[])
}

// 章节标题匹配（保持原有 filter 结构）
function findStructureMatches(structures: BookSections[], keyword: string): SearchResult<BookSections>[] {
  return structures.reduce((results, structure) => {
    const matches: MatchPosition[] = []
    let hasAnyMatch = false

    structure.sections.forEach((section) => {
      section.chapters.forEach((chapter) => {
        const fieldMatches = findFieldMatches(chapter.chapterTitle, keyword, 'chapterTitle', chapter.id)
        if (fieldMatches.length) {
          hasAnyMatch = true
          matches.push(...fieldMatches.map(m => ({
            ...m,
            sectionType: section.type,
            excerpt: `${section.type} > ${m.excerpt}`,
          })))
        }
      })
    })

    if (hasAnyMatch) {
      results.push({ item: structure, matches })
    }
    return results
  }, [] as SearchResult<BookSections>[])
}

// 章节内容匹配（保持原有 filter 结构）
function findContentMatches(contents: BookDetail[], keyword: string): SearchResult<BookDetail>[] {
  return contents.reduce((results, content) => {
    const matches: MatchPosition[] = []
    let hasAnyMatch = false

    content.content.forEach((chapter) => {
      chapter.chapterContent.forEach((paragraph, paraIndex) => {
        const fieldMatches = findFieldMatches(paragraph, keyword, 'content')
        if (fieldMatches.length) {
          hasAnyMatch = true
          fieldMatches.forEach((match) => {
            matches.push({
              ...match,
              chapterId: chapter.chapterId,
              paragraphIndex: paraIndex,
              excerpt: match.excerpt,
            })
          })
        }
      })
    })

    if (hasAnyMatch) {
      results.push({ item: content, matches })
    }
    return results
  }, [] as SearchResult<BookDetail>[])
}
