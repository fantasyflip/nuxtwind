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
    // class: "bg-white text-black",
  },
  htmlAttrs: {
    lang: locale.value,
    style: "scroll-behavior: smooth;",
  },
  titleTemplate: "%s | Component Flip",
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});
</script>

<style>
html {
  overflow: auto;

  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

/* width / */
::-webkit-scrollbar {
  width: 0.625em;
}

/* / Track / */
::-webkit-scrollbar-track {
  background: theme("colors.zinc.800");
}

/* / Handle / */
::-webkit-scrollbar-thumb {
  background: theme("colors.primary");
}

/* / Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: theme("colors.secondary");
}
</style>
