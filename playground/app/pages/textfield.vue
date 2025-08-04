<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-1/3">
      <NXW-Textfield
        v-model="textfieldValue"
        :rules="[notEmpty]"
        filled
      >
        Test-Button
      </NXW-Textfield>
    </div>
  </div>
</template>

<script setup lang="ts">
const textfieldValue = ref('')

function notEmpty(value: string | number): boolean | string {
  return value.toString().trim() !== '' || 'This field cannot be empty'
}
</script>
