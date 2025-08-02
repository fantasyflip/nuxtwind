<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <NXW-Progress
      v-model="loadingProgress"
      :loading="true"
    />
  </div>
</template>

<script setup lang="ts">
const loadingProgress = ref(33)
</script>
