<script setup lang="ts">
import type { Chapter } from '~/types/bookTypes'

const props = defineProps<{
  title: string
  chapterId: string
  chapterList: Chapter[]
}>()
const router = useRouter()
function goChapter(id: number) {
  router.push(`/book/${props.title}/chapter/${Number(props.chapterId) + id}`)
}
function goChapterList() {
  router.push(`/book/${props.title}`)
}

// 键盘方向键来控制翻页
function handleKeyDown(event: KeyboardEvent) {
  // 不能超过章节数
  if (Number(props.chapterId) + (event.key === 'ArrowLeft' ? -1 : 1) < 1 || Number(props.chapterId) + (event.key === 'ArrowLeft' ? -1 : 1) > props.chapterList.length) {
    return
  }

  if (event.key === 'ArrowLeft') {
    goChapter(-1)
  }
  else if (event.key === 'ArrowRight') {
    goChapter(1)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="mt-12 flex items-center justify-center font-serif space-x-6">
    <a
      class="group inline-flex transition items-center hover:text-[#8a7a7a] titleColor"
      :class="{
        'invisible pointer-events-none': Number(chapterId) <= 1,
        'cursor-pointer': Number(chapterId) > 1,
      }"
      @click="goChapter(-1)"
    >
      <span class="i-ph-arrow-arc-left-bold text-xl transition-transform tgc group-hover:-translate-x-1" />
      <span class="ml-2 border-b border-transparent text-lg group-hover:brcB">上卷</span>
    </a>

    <div
      class="cursor-pointer text-sm font-mono tgc"
      hover="textColor2 brcB"
      @click="goChapterList"
    >
      // 卷{{ chapterId }}，共{{ chapterList.length }}卷 //
    </div>

    <a
      class="group inline-flex transition items-center hover:text-[#8a7a7a] titleColor"
      :class="{
        'invisible pointer-events-none': Number(chapterId) >= chapterList.length,
        'cursor-pointer': Number(chapterId) < chapterList.length,
      }"
      @click="goChapter(1)"
    >
      <span class="mr-2 border-b border-transparent text-lg group-hover:brcB">下卷</span>
      <span class="i-ph-arrow-arc-right-bold text-xl transition-transform group-hover:translate-x-1 tgc" />
    </a>
  </div>
</template>
