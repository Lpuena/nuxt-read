<script lang="ts" setup>
import type { Section } from '~/types/bookTypes'

const props = defineProps<{
  title: string
  section: Section
}>()

const router = useRouter()
// 跳转到图书详情页
function goBook(chapterId: number) {
  // 跳转到图书详情页
  router.push(`/book/${props.title}/chapter/${chapterId}`)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
    <div
      v-for="chapter in section.chapters"
      :key="chapter.id"
      class="group relative cursor-pointer"
      @click="goBook(chapter.id)"
    >
      <!-- 装饰性竖线 -->
      <div
        class="absolute left-3 top-1/2 h-4/5 w-1px bg-amber-200/30 group-hover:h-3/5 -translate-y-1/2"
        transition
      />

      <!-- 章节内容 -->
      <div class="h-full flex flex-col justify-center pl-8">
        <!-- 序号（小字） -->
        <div class="mb-1 text-xs text-stone-500 font-mono dark:text-stone-400">
          卷{{ chapter.id }}
        </div>

        <!-- 章节名称 -->
        <div
          class="text-lg text-stone-800 dark:text-stone-200"
          transition
          group-hover="text-amber-500/60"
        >
          {{ chapter.chapterTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
