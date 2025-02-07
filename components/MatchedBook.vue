<script lang="ts" setup>
import type { Book } from '~/types/bookTypes'

defineProps<{
  results: {
    books: SearchResult<Book>[]
  }
}>()

const router = useRouter()
function goToBook(bookTitle: string) {
  router.push(`/book/${bookTitle}`)
}
</script>

<template>
  <section class="mb-12">
    <div class="mb-6 flex items-center">
      <div class="i-ph-book-open text-4xl textColor2" />
      <p class="ml-2 text-3xl font-bold font-serif titleColor">
        匹配的书籍（{{ results.books.length }} 本）
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <div
        v-for="result in results.books"
        :key="result.item.title"
        class="transition rounded-lg p-6 shadow-md cardBg brc"
        hover="shadow-xl -translate-y-2"
        @click="goToBook(result.item.title)"
      >
        <p class="mb-4 pb-2 text-2xl font-serif brcB titleColor">
          《{{ result.item.title }}》
        </p>
        <div class="space-y-3">
          <p class="textColor2">
            {{ result.item.description }}
          </p>
          <div class="flex items-center justify-end italic">
            <p class="text-sm text-gray-400/80 dark:text-gray-4/50">
              作者： {{ result.item.author }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
