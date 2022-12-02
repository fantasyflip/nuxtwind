<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Button </template>
      <template #component>
        <Button color="red-500" outlined border-radius grow shadow>Test</Button>
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
