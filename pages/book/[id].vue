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
    <div class="mx-auto max-w-7xl px-4 pb-10 pt-8">
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
        <div
          class="mb-12 rounded-lg p-8 shadow-lg cardBg"
          transition
        >
          <p class="heti--ancient text-lg leading-relaxed textColor">
            {{ bookDetail?.description }}
          </p>
        </div>
      </div>

      <!-- 目录部分 -->
      <div
        class="mb-12 brc rounded-xl p-8 cardBg"
        transition
      >
        <h2
          class="brw mb-6 pl-3 text-2xl font-semibold font-serif titleColor"
          transition
        >
          书籍目录
        </h2>

        <!-- 经典竖排风格 -->
        <div
          class="grid grid-cols-2 gap-4 md:grid-cols-4 sm:grid-cols-3"
          transition
        >
          <div
            v-for="(chapter, index) in bookDetail?.chapters"
            :key="index"
            class="flex flex-col cursor-pointer items-center justify-center brc rounded-lg p-4 text-center"
            transition
            hover="shadow-lg scale-103 -translate-y-1"
            @click="goBook(chapter.id)"
          >
            <!-- 章节序号 -->
            <div class="mb-1 text-lg transition-colors textColor">
              第{{ index + 1 }}章
            </div>

            <!-- 章节名称 -->
            <div class="text-sm tgc">
              {{ chapter.chapter }}
            </div>
          </div>
        </div>

        <!--  -->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
