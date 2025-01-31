<script setup lang="ts">
const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur">
    <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
      <div class="h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-2xl text-gray-900 font-bold font-serif dark:text-gray-200">读书</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden items-center md:flex space-x-8">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.path"
            class="text-sm text-gray-500 font-medium transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            active-class="text-gray-900 dark:text-gray-100"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <DarkToggle />
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="h-px bg-gray-300 dark:bg-gray-700" />
  </header>
</template>

<style scoped>

</style>
