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
    <!-- 触发按钮 -->
    <button
      id="toc-btn"
      class="fixed left-0 top-1/2 z-50 flex transition items-center gap-2 rounded-r-xl px-3 py-4 shadow-lg duration-300 -translate-y-1/2 cardBg brc"
      :class="{ 'opacity-0': isOpen }"
      hover="border-[#d4c29c] shadow-xl"
      @click="toggleOpen"
    >
      <div class="i-carbon-list text-lg titleColor" />
    </button>

    <!-- 目录面板 -->
    <nav
      id="toc-nav"
      class="fixed bottom-26 left-4 top-26 z-50 w-70 transform rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out cardBg brc"
      :class="isOpen ? 'translate-x-0' : '-translate-x-[120%]'"
    >
      <div class="h-full flex flex-col p-6">
        <!-- 标题栏 -->
        <div class="flex items-center justify-between pb-4 brcB">
          <h3 class="text-lg font-bold titleColor">
            {{ title }}
          </h3>
          <button
            class="transition rounded-lg p-1.5 duration-200 hover:bg-[#f5f2e9] dark:hover:bg-[#2d2921]"
            @click="toggleOpen"
          >
            <div class="i-carbon-close text-lg titleColor" />
          </button>
        </div>

        <!-- 章节列表 -->
        <div class="mt-4 flex-1 overflow-y-auto pr-2">
          <div v-for="section in sections" :key="section.type" class="mb-4">
            <h4 class="text-sm font-bold titleColor">
              {{ section.type }}
            </h4>
            <ul class="space-y-1">
              <li v-for="chapter in section.chapters" :key="chapter.id">
                <NuxtLink
                  :to="`/book/${title}/chapter/${chapter.id}`"
                  class="block transition rounded-lg px-4 py-2.5 text-sm duration-200 hover:bg-[#f5f2e9] textColor dark:hover:bg-[#2d2921]"
                  :class="[
                    route.params.chapterId === String(chapter.id)
                      ? '!titleColor bg-[#f5f2e9] dark:bg-[#2d2921] font-medium'
                      : '',
                  ]"
                  @click.stop
                >
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
