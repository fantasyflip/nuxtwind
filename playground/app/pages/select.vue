<template>
  <div class="flex flex-col items-center justify-center h-screen ">
    <div class="w-1/4">
      <NXW-Select
        v-model="modelValue"
        :items="items"
        label="Framework"
        placeholder="Select a framework"
        display-property="stars"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const modelValue = ref('')
const items = ref([
  {
    name: 'Vue',
    value: 'vue',
    stars: 1234,
  },
  {
    name: 'React',
    value: 'react',
    stars: 5678,
  },
  {
    name: 'Angular',
    value: 'angular',
    stars: 91011,
  },
])
</script>
