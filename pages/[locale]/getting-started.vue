<template>
  <div>
    <NuxtLayout name="docs">
      <div>Getting Started!</div>
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  title: "Getting Started",
  meta: [
    {
      name: "description",
      content: "Getting Started with Nuxtwind",
    },
  ],
});
definePageMeta({
  layout: false,
});
</script>
