export interface Book {
  title: string
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

export interface BookContent {
  [chapterId: string]: string[] // chapterId 是字符串，内容是字符串数组
};
