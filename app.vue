<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const route = useRoute();
const { locale } = useI18n();
watch(
  () => route.params.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      locale.value = newLocale;
    }
  },
  { immediate: true }
);
useHead({
  bodyAttrs: {
    class: "bg-zinc-900 text-white",
  },
  htmlAttrs: {
    lang: locale.value,
  },
  titleTemplate: "%s | Component Flip",
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});
</script>
