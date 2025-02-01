export interface Book {
  title: string
  description: string
  author: string
  year: string
}

export interface Chapter {
  id: number
  chapter: string
}
export interface Body {
  id: string
  title: string
  author: string
  description: string
  chapters: Chapter[]
}

export interface BookContent {
  [chapterId: string]: string[] // chapterId 是字符串，内容是字符串数组
};
