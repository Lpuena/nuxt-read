<script lang="ts" setup>
const route = useRoute()

const title = route.params.bookName as string
const chapterId = route.params.chapterId as string

// 获取章节列表
// const { data: bookObj } = await useFetch(`/api/books/${title}`)
// console.log('!!!!!!!!!!', bookObj.value)

const bookObj = await useChapters(title, chapterId)

/** 章节列表 */
const chapterList = bookObj?.chapters || []
// console.log('chapterList', chapterList)

/** 当前章节的标题 */
const chapterTitle = chapterList[Number(chapterId) - 1]?.chapter || ''

// 转换章节数据格式
const chapters = chapterList.map((item, index) => ({
  id: String(index + 1),
  title: item.chapter,
}))
</script>

<template>
  <div>
    <TableOfContents :chapters="chapters" :title="title" />
    <div class="mx-auto max-w-7xl px-4 pb-10" transition>
      <h1 class="mb-8 flex items-end justify-center text-4xl font-bold font-serif titleColor">
        {{ title }}
        <!-- 显示当前章节名称 -->
        <p class="heti ml-2 text-2xl font-serif">
          （{{ chapterTitle }}）
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
              {{ sentence }}
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
