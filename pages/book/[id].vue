<script lang="ts" setup>
const route = useRoute()
const title = route.params.id
</script>

<template>
  <div>{{ title }}</div>
</template>

<style scoped>
</style>
