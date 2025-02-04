import type { Book, BookDetail, BookSections } from '~/types/bookTypes'

interface MatchPosition {
  field: string
  indices: [number, number]
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

// 辅助函数：在字段值中查找匹配
function findFieldMatches(fieldValue: string, keyword: string, fieldName: string, chapterId?: number): Omit<MatchPosition, 'chapterId' | 'paragraphIndex'>[] {
  const matches: Omit<MatchPosition, 'paragraphIndex'>[] = []
  let startIndex = 0
  const searchStr = fieldValue.toLowerCase()
  const keywordLower = keyword.toLowerCase()

  while (true) {
    const foundIndex = searchStr.indexOf(keywordLower, startIndex)
    if (foundIndex === -1)
      break

    matches.push({
      field: fieldName,
      indices: [foundIndex, foundIndex + keyword.length - 1],
      excerpt: getExcerpt(fieldValue, foundIndex, keyword.length),
      chapterId,
    })

    startIndex = foundIndex + keyword.length
  }
  return matches
}

// 生成带上下文的摘要
function getExcerpt(text: string, start: number, length: number): string {
  const contextStart = Math.max(0, start - 15)
  const contextEnd = start + length + 15
  return (contextStart > 0 ? '...' : '')
    + text.slice(contextStart, contextEnd)
    + (contextEnd < text.length ? '...' : '')
}

// 书籍匹配逻辑（保持原有 filter 结构）
function findBookMatches(books: Book[], keyword: string): SearchResult<Book>[] {
  return books.reduce((results, book) => {
    const matches: MatchPosition[] = []

    // 保持原有过滤逻辑
    const shouldInclude = Object.entries(book).some(([key, value]) => {
      const fieldMatches = findFieldMatches(String(value), keyword, key)
      if (fieldMatches.length) {
        matches.push(...fieldMatches)
        return true
      }
      return false
    })

    if (shouldInclude) {
      results.push({ item: book, matches })
    }
    return results
  }, [] as SearchResult<Book>[])
}

// 章节标题匹配（保持原有 filter 结构）
function findStructureMatches(structures: BookSections[], keyword: string): SearchResult<BookSections>[] {
  return structures.reduce((results, structure) => {
    const matches: MatchPosition[] = []

    const shouldInclude = structure.sections.some(section =>
      section.chapters.some((chapter) => {
        // console.log('chapter', chapter)

        const fieldMatches = findFieldMatches(chapter.chapterTitle, keyword, 'chapterTitle', chapter.id)

        if (fieldMatches.length) {
          matches.push(...fieldMatches.map(m => ({
            ...m,
            sectionType: section.type, // 添加章节类型
            excerpt: `${section.type} > ${m.excerpt}`, // 增强上下文
          })))
          return true
        }
        return false
      }),
    )

    if (shouldInclude)
      results.push({ item: structure, matches })
    return results
  }, [] as SearchResult<BookSections>[])
}

// 章节内容匹配（保持原有 filter 结构）
function findContentMatches(contents: BookDetail[], keyword: string): SearchResult<BookDetail>[] {
  return contents.reduce((results, content) => {
    const matches: MatchPosition[] = []

    const shouldInclude = content.content.some(chapter =>
      chapter.chapterContent.some((paragraph, paraIndex) => {
        const fieldMatches = findFieldMatches(paragraph, keyword, 'content')
        if (fieldMatches.length) {
          matches.push({
            // 基础字段
            ...fieldMatches[0], // 假设单个段落只展示第一个匹配
            // 添加内容定位字段
            chapterId: chapter.chapterId,
            paragraphIndex: paraIndex,
            // 增强上下文显示
            // excerpt: `[${chapter.chapterId}] ${fieldMatches[0].excerpt}`,
            excerpt: `${fieldMatches[0].excerpt}`,
          })
          return true
        }
        return false
      }),
    )

    if (shouldInclude)
      results.push({ item: content, matches })
    return results
  }, [] as SearchResult<BookDetail>[])
}
