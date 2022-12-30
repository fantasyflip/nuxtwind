<template>
  <div class="center">
    <NuxtWindIconName />
    <div class="md:text-2xl sm:text-xl text-md text-center mt-4">
      This is going to be a collection of components for Nuxt 3, powered by
      TailwindCSS that I use in my projects.<br />
      Come back soon to see what I have in store for you.
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
useHead({
  title: t("pages.index.meta.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.index.meta.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("pages.index.meta.og.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("pages.index.meta.description"),
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "/favicon.png",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://nuxtwind.com/",
    },
    {
      property: "og:locale",
      content: t("pages.index.meta.og.locale"),
    },
  ],
});
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
