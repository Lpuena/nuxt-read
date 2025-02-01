<script setup lang="ts">
// 获取作者和书籍数据
// const theAuthor = await queryCollection('authors')
//   .where('url', '=', 'larbish')
//   .first()

// const authors = await queryCollection('authors')
//   .order('name', 'DESC')
//   .all()

// 获取书籍数据
// const booksResult = await queryCollection('books').all()

// const books = booksResult[0].meta.books

// const { data: booksResult } = await useFetch(`/api/books`)

/** 获取展示书籍数据 */
const { data } = await useAsyncData('books', () => {
  return queryCollection('books').first()
})
console.log('booksRes', data.value)

let books: any[] = []
if (data.value) {
  books = data.value.meta.books
}
// const books = booksRes.data
// console.log('books', books)
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h1 class="mb-8 text-center text-4xl font-bold font-serif titleColor">
        古文典籍
      </h1>

      <div class="prose-lg max-w-none prose">
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
