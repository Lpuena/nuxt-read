<script setup lang="ts">
import type { Book, BookDetail, BookSections } from '~/types/bookTypes'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

useHead({
  title: '搜索',
})

const route = useRoute()
const router = useRouter()
const searchTerm = ref(route.query.q as string || '')
const showSearchKeyword = ref('')

const searchInput = ref(null)
const results = ref<{
  books: SearchResult<Book>[]
  structures: SearchResult<BookSections>[]
  contents: SearchResult<BookDetail>[]
}>({
  books: [],
  structures: [],
  contents: [],
}) // 改为响应式引用

// 监听路由参数变化
watch(
  () => route.query.q,
  async (q) => {
    const term = q?.toString() || ''
    showSearchKeyword.value = term // 同步搜索词到页面
    searchTerm.value = term // 同步搜索词到输入框
    if (term) {
      results.value = await useGlobalSearch(term) // 重新获取数据
      // console.log('匹配到的内容', results.value)
    }
    else {
      results.value = { books: [], contents: [], structures: [] } // 清空结果
    }
  },
  { immediate: true }, // 初始化时立即执行
)

// 处理搜索提交（保持不变）
function handleSearch(e?: Event) {
  e?.preventDefault()
  router.push({ query: { q: searchTerm.value } })
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 pb-10 pt-8 container">
      <!-- 搜索框 -->
      <form class="mx-auto mb-12 max-w-2xl" @submit.prevent="handleSearch">
        <div class="flex items-center gap-2 rounded-full bg-white px-6 py-3 brc dark:bg-[#2d2921]">
          <input
            ref="searchInput"
            v-model="searchTerm"
            type="search"
            placeholder="输入关键词搜索书籍或内容..."
            class="flex-1 bg-transparent outline-none textColor"
          >
          <button
            type="submit"
            class="i-carbon-search text-2xl transition-colors hover:textColor textColor2"
          />
        </div>
      </form>

      <div class="max-w-none prose">
        <!-- 书籍匹配结果 -->
        <matched-book v-if="results.books.length" :results="results" />

        <!-- 段落匹配结果 -->
        <matched-structure v-if="results.structures.length" :results="results" />

        <!-- 内容匹配结果 -->
        <matched-content v-if="results.contents.length" :results="results" />

        <!-- 无结果提示 -->
        <div
          v-if="!results.books.length && !results.contents.length && !results.structures.length && showSearchKeyword "
          class="py-20 text-center"
        >
          <div class="flex flex-col items-center justify-center">
            <div class="i-carbon-face-dissatisfied text-7xl tgc" />
            <p class="mt-4 text-xl font-serif textColor">
              未找到与 "{{ showSearchKeyword }}" 相关的内容
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
