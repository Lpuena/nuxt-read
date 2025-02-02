<script setup lang="ts">
const props = defineProps<{
  title: string
  chapterId: string | number
  chapterList: any[]
}>()
const router = useRouter()
function goChapter(id: number) {
  router.push(`/book/${props.title}/chapter/${Number(props.chapterId) + id}`)
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
      v-if="Number(chapterId) > 1"
      class="group inline-flex cursor-pointer items-center transition hover:text-[#8a7a7a] titleColor"
      @click="goChapter(-1)"
    >
      <span class="i-ph-arrow-arc-left-bold text-xl transition-transform tgc group-hover:-translate-x-1" />
      <span class="group-hover:brcB ml-2 border-b border-transparent text-lg">上篇</span>
    </a>

    <div class="text-sm tgc">
      // 第{{ chapterId }}篇，共{{ chapterList.length }}篇 //
    </div>

    <a
      v-if="Number(chapterId) < chapterList.length"
      class="group inline-flex cursor-pointer items-center transition hover:text-[#8a7a7a] titleColor"
      @click="goChapter(1)"
    >
      <span class="group-hover:brcB mr-2 border-b border-transparent text-lg">下篇</span>
      <span class="i-ph-arrow-arc-right-bold text-xl transition-transform group-hover:translate-x-1 tgc" />
    </a>
  </div>
</template>
