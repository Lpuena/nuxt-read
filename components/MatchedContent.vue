<script lang="ts" setup>
import type { BookDetail } from '~/types/bookTypes'

defineProps<{
  results: {
    contents: SearchResult<BookDetail>[]
  }
}>()

const router = useRouter()
function goToDetail(bookTitle: string, chapterId: string) {
  router.push(`/book/${bookTitle}/chapter/${chapterId}`)
}
</script>

<template>
  <section class="mb-12">
    <div class="mb-6 flex items-center">
      <div class="i-carbon-document text-4xl textColor2" />
      <p class="ml-2 text-3xl font-bold font-serif titleColor">
        匹配的内容（{{ results.contents.length }} 处）
      </p>
    </div>

    <div class="space-y-6">
      <div
        v-for="result in results.contents"
        :key="result.item.id"
        class="transition rounded-lg p-6 shadow-md cardBg brc hover:shadow-xl"
      >
        <h3 class="mb-4 pb-2 text-xl font-semibold font-serif brcB titleColor">
          出自《{{ result.item.bookName }}》
        </h3>
        <div class="space-y-4">
          <div
            v-for="(match, idx) in result.matches"
            :key="idx"
            class="brL pl-4 transition-all hover:border-opacity-70 hover:bg-gray-50 dark:hover:bg-[#3a3429]"
            @click="goToDetail(result.item.bookName, String(match.chapterId))"
          >
            <p class="mb-1 flex justify-between text-sm tgc">
              <span>第 {{ match.chapterId }} 章 · 第 {{ Number(match.paragraphIndex) + 1 }} 段</span>
            </p>
            <p
              class="line-clamp-3 pb-2 leading-relaxed textColor"
              v-html="useHighLight(match.excerpt, match.indices)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
