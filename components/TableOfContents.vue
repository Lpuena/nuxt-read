<script setup lang="ts">
import { useStorage } from '@vueuse/core'

defineProps<{
  chapters: Chapter[]
  title: string
}>()
const isOpen = useStorage('toc-isOpen', false)
interface Chapter {
  id: string
  title: string
}

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
    <!-- 触发按钮 - 固定在左侧中间，移动端在顶部 -->
    <button
      id="toc-btn"
      class="fixed left-0 top-1/2 z-50 flex items-center gap-2 rounded-r-xl bg-white px-3 py-4 shadow-lg transition duration-300 -translate-y-1/2 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"

      :class="{ 'opacity-0': isOpen }"
      @click="toggleOpen"
    >
      <div class="i-carbon-list text-lg" />
    </button>

    <!-- 浮动目录面板 -->
    <nav
      id="toc-nav"
      class="fixed bottom-26 left-4 top-26 z-50 w-70 transform rounded-xl bg-white/95 shadow-2xl shadow-gray-300 backdrop-blur-sm transition-all duration-300 ease-out dark:bg-gray-800/95 dark:shadow-gray-900"
      :class="isOpen ? 'translate-x-0' : '-translate-x-[120%]'"
    >
      <div class="h-full flex flex-col p-6">
        <!-- 顶部标题和关闭按钮 -->
        <div class="flex items-center justify-between border-b pb-4 dark:border-gray-700">
          <h3 class="text-lg text-gray-800 font-bold dark:text-gray-200">
            {{ title }}
          </h3>
          <button
            class="rounded-lg p-1.5 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="toggleOpen"
          >
            <div class="i-carbon-close text-lg" />
          </button>
        </div>

        <!-- 章节列表 -->
        <div class="mt-4 flex-1 overflow-y-auto pr-2">
          <ul class="space-y-1">
            <li v-for="chapter in chapters" :key="chapter.id">
              <NuxtLink
                :to="`/book/${title}/chapter/${chapter.id}`"
                class="block rounded-lg px-4 py-2.5 text-sm text-gray-700 transition duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                :class="[
                  route.params.chapterId === chapter.id
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-medium'
                    : '',
                ]"
                @click.stop
              >
                {{ chapter.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
