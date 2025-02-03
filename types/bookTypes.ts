export interface Book {
  title: string
  pinyin: string
  description: string
  author: string
  year: string
}

export interface Chapter {
  id: number
  chapterTitle: string
}
export interface BookDetail {
  id: string
  title: string
  author: string
  description: string
  /** 章节的分类 */
  sections: Section[]
}

export interface Section {
  type: string
  chapters: Chapter[]
}

/** 当前章节的详细内容 */
export interface BookContent {
  id: string
  title: string
  author: string
  content: { chapterId: string, chapterContent: string[] }[]
};
