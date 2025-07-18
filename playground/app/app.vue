<template>
  <div>
    <NXW-Button>Button</NXW-Button>
    <NXW-Progress
      v-model="loadingProgress"
      :loading="true"
    />
  </div>
</template>

<script setup>
const loadingProgress = ref(33)
</script>
