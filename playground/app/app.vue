<template>
  <div>
    <div class="absolute bottom-4 right-4">
      <NXW-Button
        link="/"
      >
        Home
      </NXW-Button>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// set dark mode for the playground
useHead({
  htmlAttrs: {
    class: 'dark bg-black',
  },
})
</script>
