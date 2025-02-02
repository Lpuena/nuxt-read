<script lang="ts" setup>
const route = useRoute()

const title = route.params.bookName as string
const chapterId = route.params.chapterId as string

const bookObj = await useChapters(title, chapterId)

// 查找章节名称的函数
function findChapterById(id: number) {
  // 遍历 sections
  for (const section of bookObj.sections) {
    // 在 chapters 中查找
    const chapter = section.chapters.find(ch => ch.id === id)
    if (chapter) {
      return {
        type: section.type, // 返回章节所属的类型（内篇、外篇、杂篇）
        chapter: chapter.chapterTitle, // 返回章节名称
      }
    }
  }
  return null // 如果未找到，返回 null
}

const chapterInfo = findChapterById(Number(chapterId))

/** 共有多少章节 */
const chapterList = bookObj.sections.flatMap(section => section.chapters)

/** 给内容句首添加两个字符的空格 */
function addEmptyLine(content: string) {
  return `\u3000\u3000${content.replace(/^\s+/, '')}`
}

addEmptyLine('hello world')
</script>

<template>
  <div>
    <TableOfContents :sections="bookObj.sections" :title="title" />
    <div class="mx-auto max-w-7xl px-4 pb-10" transition>
      <h1 class="mb-8 flex items-end justify-center text-4xl font-bold font-serif titleColor">
        {{ title }}
        <!-- 显示当前章节名称 -->
        <p class="heti ml-2 text-2xl font-serif">
          （{{ chapterInfo?.chapter }}）
        </p>
      </h1>

      <div class="max-w-none prose" transition>
        <div class="mt-12">
          <h2 class="mb-4 text-3xl font-serif titleColor">
            章节内容
          </h2>
          <div class="rounded-lg p-6 shadow-sm cardBg">
            <div
              v-for="(sentence, index) in bookObj?.chapterContent"
              :key="index"
              class="heti--ancient mb-4 text-lg textColor"
            >
              {{ addEmptyLine(sentence) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 翻页组件 -->
      <ChapterNavigation :title="title" :chapter-list="chapterList" :chapter-id="chapterId" />
    </div>
  </div>
</template>

<style scoped>
</style>
