<script setup lang="ts">
const links = [
  { name: '主页', path: '/' },
  { name: '关于', path: '/about' },
  { name: '搜索', path: '/search' },
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
            active-class="text-gray-900 dark:text-white/80"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <GithubCom />
          <DarkToggle />
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="h-px bg-gray-300 dark:bg-gray-700" transition />
  </header>
</template>

<style scoped>

</style>
