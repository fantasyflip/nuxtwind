<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Button </template>
      <template #component>
        <Button
          :color="{
            bg: 'bg-red-500',
          }"
          border-radius
          grow
          link="https://google.com"
          target="_blank"
        ></Button>
      </template>
      <template #playground> Playground </template>
      <template #props> Props </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
