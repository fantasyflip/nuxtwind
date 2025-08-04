<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-1/3">
      <NXW-Textarea
        v-model="textareaValue"
        :rules="[notEmpty]"
      >
        Test-Button
      </NXW-Textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
const textareaValue = ref('')

function notEmpty(value: string): boolean | string {
  return value.trim() !== '' || 'This field cannot be empty'
}
</script>
