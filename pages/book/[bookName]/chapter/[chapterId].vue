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
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-6xl px-4 py-10">
      <h1 class="mb-8 text-center text-4xl font-bold font-serif titleColor">
        {{ title }}
      </h1>

      <!-- 显示当前章节名称 -->
      <div class="mb-8 text-center text-2xl font-serif titleColor">
        {{ chapterTitle }}
      </div>

      <div class="max-w-none prose">
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
    </div>
  </div>
</template>

<style scoped>
</style>
