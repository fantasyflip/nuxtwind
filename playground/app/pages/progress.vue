<template>
  <div class="flex items-center justify-center h-screen gap-8  mx-auto">
    <div class="w-1/3">
      <NXW-Progress
        v-model="loadingProgress"
        :loading="true"
      />
    </div>
    <div class="w-1/3">
      <NXW-Progress
        v-model="loadingProgress"
        :loading="true"
        circular
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const loadingProgress = ref(33)
</script>
