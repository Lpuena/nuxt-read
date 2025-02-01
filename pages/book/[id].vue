<script lang="ts" setup>
const route = useRoute()
const title = route.params.id as string

const bookObj = await useChapters(title)

const bookDetail = bookObj.body
const router = useRouter()
// 跳转到图书详情页
function goBook(chapterId: number) {
  // 跳转到图书详情页
  // TODO: 默认跳转到第一章节
  // router.push(`/book/${book.title}/chapter/${1}`)
  router.push(`/book/${title}/chapter/${chapterId}`)
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-6xl px-4 pb-10 pt-8">
      <!-- 书籍标题 -->
      <h1 class="mb-8 text-center text-4xl font-bold font-serif titleColor">
        {{ title }}
      </h1>

      <!-- 书籍元信息 -->
      <div class="mb-8 text-center text-lg textColor">
        <span class="mr-4">作者：{{ bookDetail?.author }}</span>
      </div>

      <!-- 书籍描述卡片 -->
      <div>
        <h2 class="mb-4 text-3xl font-serif titleColor">
          书籍简介
        </h2>
        <div class="mb-12 rounded-lg p-8 shadow-lg cardBg">
          <p class="heti--ancient text-lg leading-relaxed textColor">
            {{ bookDetail?.description }}
          </p>
        </div>
      </div>

      <!-- 目录部分 -->
      <div>
        <h2 class="mb-4 text-3xl font-serif titleColor">
          书籍目录
        </h2>
        <div class="mb-12 rounded-lg p-6 shadow-sm cardBg">
          <div class="grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            <div
              v-for="chapter in bookDetail?.chapters"
              :key="chapter.id"
              class="rounded-lg transition-all duration-300 ease-out dark:border-[#3a3429] cardBg"
              brc
              hover="shadow-md scale-103 -translate-y-1"

              @click="goBook(chapter.id)"
            >
              <div class="h-full flex items-center justify-center p-4 text-center">
                <p class="text-lg transition-colors group-hover:titleColor textColor">
                  {{ chapter.chapter }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
