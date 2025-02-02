<script lang="ts" setup>
const route = useRoute()
const title = route.params.id as string

const bookObj = await useChapters(title)

const bookDetail = bookObj.bookDetail

/** 单层级 */
const isSingleSection = ref(false)

// 不同的 sections 渲染不同的组件样式
const sections = bookDetail.sections
if (sections.length === 1 && sections[0].type === '正文') {
  // 单层级
  isSingleSection.value = true
  // console.log('单层级', sections)
}
else {
  // 多层级
  isSingleSection.value = false
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
        >
          <p class="heti--ancient text-lg leading-relaxed textColor">
            {{ bookDetail?.description }}
          </p>
        </div>
      </div>

      <!-- 目录部分 -->
      <h2
        class="mb-4 text-3xl font-serif titleColor"
        transition
      >
        书籍目录
      </h2>

      <div
        class="mb-12 rounded-xl p-8 cardBg brc"
      >
        <!-- 单层级目录 -->
        <div
          v-if="isSingleSection"
          transition
        >
          <SectionShow :title="title" :section="sections[0]" />
        </div>

        <!-- 多层级目录 -->
        <div v-else class="space-y-10">
          <!-- 每个分篇区块 -->
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="space-y-6"
          >
            <!-- 分篇标题 -->
            <div class="flex items-center">
              <div class="mr-4 h-8 w-1 rd-full bg-amber-200/80" />
              <h3 class="text-2xl text-stone-800 font-semibold font-serif dark:text-stone-200">
                {{ section.type }}
              </h3>
            </div>

            <!-- 章节网格 -->
            <SectionShow :title="title" :section="section" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
