<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
const head = useLocaleHead({
  dir: true,
  seo: true,
});

const metaItems = computed(() => {
  const staticItems = [{ name: "description", content: "My amazing site." }];
  // merge with head.meta
  return [...staticItems, ...(head.value.meta ?? [])];
});

const linkItems = computed(() => {
  const staticItems = [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ];
  // merge with head.link
  return [...staticItems, ...(head.value.link ?? [])];
});
useHead({
  titleTemplate: "%s | App-Name",
  meta: metaItems.value,
  link: linkItems.value,
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir as "ltr" | "rtl" | "auto" | undefined,
    style: "scroll-behavior: smooth;",
  },
});
defineOgImageComponent("NuxtSeo", {
  colorMode: "dark",
});
</script>
