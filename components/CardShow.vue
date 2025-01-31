<script lang="ts" setup>
defineProps<{
  books: {
    title: string
    description: string
    author: string
    year: string
  }[]
}>()
</script>

<template>
  <div
    class="grid grid-cols-1 gap-6 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
  >
    <div
      v-for="book in books"
      :key="book.title"
      class="cardBg cursor-pointer rounded-lg px-6 py-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <p class="mb-2 text-2xl titleColor font-bold font-serif">
        {{ book.title }}
      </p>
      <p class="textColor2">
        {{ book.description }}
      </p>
      <div class="flex items-center justify-end">
        <p class="text-sm text-gray-400/80 dark:text-gray-4/50">
          {{ book.author }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
