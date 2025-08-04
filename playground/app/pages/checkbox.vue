<template>
  <div class="flex gap-3 flex-col items-center justify-center h-screen">
    <NXW-Checkbox
      v-model="checkboxValue"
      label="Checkbox Label"
      description="Checkbox Description"
      :loading="loading"
    />
    <NXW-Button @click="loading = !loading">
      Toggle Loading
    </NXW-Button>
  </div>
</template>

<script setup lang="ts">
const checkboxValue = ref(false)
const loading = ref(false)
</script>
