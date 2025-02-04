<script lang="ts" setup>
import type { BookSections } from '~/types/bookTypes'

defineProps<{
  results: {
    structures: SearchResult<BookSections>[]
  }
}>()

// 章节标题高亮处理
function useSectionHighlight(excerpt: string, indices?: [number, number]) {
  if (!indices)
    return excerpt
  return `${excerpt.slice(0, indices[0])
  }<mark class="bg-yellow-100 px-1 rounded">${excerpt.slice(indices[0], indices[1] + 1)}</mark>${
    excerpt.slice(indices[1] + 1)}`
}

// 解析章节结构
function parseSection(excerpt: string) {
  const [sectionType, chapterTitle] = excerpt.split(' > ')
  return { sectionType, chapterTitle }
}

const router = useRouter()
function goToChapter(bookTitle: string, chapterId: string) {
  router.push(`/book/${bookTitle}/chapter/${chapterId}`)
}
</script>

<template>
  <section class="mb-12">
    <div class="mb-6 flex items-center">
      <div class="i-carbon-folder text-4xl textColor2" />
      <p class="ml-2 text-3xl font-bold font-serif titleColor">
        匹配的章节（{{ results.structures.length }} 处）
      </p>
    </div>

    <div class="space-y-6">
      <div
        v-for="result in results.structures"
        :key="result.item.id"
        class="transition rounded-lg p-6 shadow-md cardBg brc hover:shadow-xl"
      >
        <h3 class="mb-4 pb-2 text-xl font-semibold font-serif brcB titleColor">
          《{{ result.item.title }}》
        </h3>

        <div class="space-y-4">
          <div
            v-for="(match, idx) in result.matches"
            :key="idx"
            class="cursor-pointer brL pl-4 transition-all hover:bg-gray-50 dark:hover:bg-[#3a3429]"
            @click="goToChapter(result.item.title, String(match.chapterId))"
          >
            <div class="mb-2 flex items-baseline">
              <span class="pr-3 text-sm tgc">所属分类：</span>
              <span class="rounded bg-gray-100 px-2 py-1 text-sm">
                {{ parseSection(match.excerpt).sectionType }}
              </span>
            </div>

            <div
              class="block transition-colors hover:text-[#3c2f2f] textColor"
            >
              <p
                class="pb-2 text-lg leading-relaxed font-serif"
                v-html="useSectionHighlight(parseSection(match.excerpt).chapterTitle, match.indices)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
