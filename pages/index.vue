<script setup lang="ts">
// 获取作者和书籍数据
// const theAuthor = await queryCollection('authors')
//   .where('url', '=', 'larbish')
//   .first()

/** 获取展示书籍数据 */
const books = await useBooks()
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-6xl px-4 pb-10 pt-8">
      <h1 class="mb-8 text-center text-4xl font-bold font-serif titleColor">
        古文典籍
      </h1>

      <div class="max-w-none prose">
        <p class="text-xl leading-relaxed font-serif textColor">
          欢迎来到古文典籍网站，这里汇集了历代经典著作和名家作品。
        </p>

        <div class="mt-12">
          <h2 class="mb-4 text-3xl font-serif titleColor">
            名家作品
          </h2>

          <CardShow :books="books" />
        </div>

        <!-- <div class="mt-12">
          <h2 class="mb-4 text-3xl font-serif titleColor">
            历代名家
          </h2>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
            <div
              v-for="author in authors"
              :key="author.name"
              class="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 class="mb-2 text-2xl text-[#3c2f2f] font-serif">
                {{ author.name }}
              </h3>
              <p class="text-[#5e4b4b]">
                {{ author.bio }}
              </p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>

</style>
