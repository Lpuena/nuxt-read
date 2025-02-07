<script setup lang="ts">
import type { Section } from '~/types/bookTypes'
import { useStorage } from '@vueuse/core'

defineProps<{
  sections: Section[]
  title: string
}>()
const isOpen = useStorage('toc-isOpen', false)

const route = useRoute()

function toggleOpen() {
  isOpen.value = !isOpen.value
}

// 处理点击外部关闭
function handleClickOutside(event: MouseEvent) {
  const nav = document.getElementById('toc-nav')
  const btn = document.getElementById('toc-btn')

  if (isOpen.value && nav && btn
    && !nav.contains(event.target as Node)
    && !btn.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div>
    <!-- 触发按钮 - 更柔和的过渡效果 -->
    <button
      id="toc-btn"
      class="fixed left-0 top-1/2 z-50 flex transition items-center gap-2 rounded-r-xl px-2.5 py-3 shadow-lg -translate-y-1/2 cardBg brc"
      :class="{ 'opacity-0': isOpen }"
      hover="border-[#d4c29c] shadow-xl bg-opacity-95 dark:bg-opacity-95"
      @click="toggleOpen"
    >
      <div class="i-carbon-list text-2xl textColor2" />
    </button>

    <!-- 目录面板 - 优化视觉层次 -->
    <nav
      id="toc-nav"
      transition
      hover="shadow-xl"
      class="fixed bottom-10 left-4 top-18 z-50 w-72 rounded-xl shadow-xl backdrop-blur-sm cardBg brc"
      :class="[
        isOpen ? 'translate-x-0' : '-translate-x-[120%] opacity-10',
      ]"
    >
      <div class="h-full flex flex-col p-6">
        <!-- 标题栏 - 更清晰的层次 -->
        <div class="flex items-center justify-between pb-4 brcB">
          <h3 class="text-lg font-bold titleColor">
            {{ title }}
          </h3>
          <button
            class="transition rounded-lg p-1.5 duration-200"
            hover="bg-[#d4c29c]/10"
            @click="toggleOpen"
          >
            <div class="i-carbon-close text-lg textColor2" />
          </button>
        </div>

        <!-- 章节列表 - 优化间距和hover效果 -->
        <div class="mt-5 flex-1 overflow-y-auto pr-2">
          <div v-for="section in sections" :key="section.type" class="mb-6">
            <h4 class="mb-2 text-sm font-bold textColor2">
              {{ section.type }}
            </h4>
            <ul class="space-y-1.5">
              <li v-for="chapter in section.chapters" :key="chapter.id">
                <NuxtLink
                  :to="`/book/${title}/chapter/${chapter.id}`"
                  class="block transition rounded-lg px-4 py-2.5 text-sm duration-200 textColor"
                  :class="[
                    route.params.chapterId === String(chapter.id)
                      ? 'titleColor bg-[#d4c29c]/10 dark:bg-[#d4c29c]/5 font-medium'
                      : 'hover:bg-[#d4c29c]/5 dark:hover:bg-[#d4c29c]/5',
                  ]"
                  @click.stop
                >
                  <span class="mr-1">{{ chapter.id }}.</span>
                  {{ chapter.chapterTitle }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
