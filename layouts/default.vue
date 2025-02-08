<script setup>
const _route = useRoute()
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - 读书` : '读书'
  },
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-all duration-300 bgc">
    <AppHeader />
    <main class="mx-auto flex-1 px-4 py-8 container">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
