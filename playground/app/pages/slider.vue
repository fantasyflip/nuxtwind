<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <NXW-Slider
      v-model="sliderValue"
      height="h-2"
    />
    <div class="dark:text-white">
      {{ sliderValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
const sliderValue = ref(33)
</script>
