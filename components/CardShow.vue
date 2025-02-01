<script lang="ts" setup>
import type { Book } from '~/types/bookTypes'

defineProps<{
  books: Book[]
}>()

const router = useRouter()
// 跳转到图书详情页
function goBook(book: Book) {
  // 跳转到图书详情页
  // TODO: 默认跳转到第一章节
  // router.push(`/book/${book.title}/chapter/${1}`)
  router.push(`/book/${book.title}`)
}
</script>

<template>
  <div
    class="grid grid-cols-1 gap-6 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
  >
    <div
      v-for="book in books"
      :key="book.title"
      class="relative transform cursor-pointer rounded-lg px-6 py-4 shadow-sm transition-all duration-300 cardBg"
      hover="shadow-lg scale-108 -translate-y-1"
      @click="goBook(book)"
    >
      <p class="mb-2 text-2xl font-bold font-serif titleColor">
        {{ book.title }}
      </p>
      <p class="textColor2">
        {{ book.description }}
      </p>
      <div class="flex items-center justify-end italic">
        <p class="text-sm text-gray-400/80 dark:text-gray-4/50">
          {{ book.author }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
