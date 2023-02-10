<template>
  <div class="center">
    <div class="md:text-[230px] sm:text-[180px] text-8xl font-bold group">
      <span>404</span>
      <span class="text-primary-800 group-hover:text-secondary-800">.</span>
    </div>
    <h1 class="md:text-3xl sm:text-2xl text-xl">
      {{ $t("pages.404.content.errorMessage") }}
    </h1>
    <h2
      v-if="$route.query.component"
      class="md:text-2xl sm:text-xl text-lg"
      v-html="
        $t('pages.404.content.urlDisplay', { path: $route.query.component })
      "
    ></h2>
    <h2
      v-else
      class="md:text-2xl sm:text-xl text-lg"
      v-html="$t('pages.404.content.urlDisplay', { path: $route.path })"
    ></h2>
    <NuxtLink
      :to="useLocaleUrl('')"
      :rel="$t('pages.404.buttons.home')"
      class="mt-6 btn inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-cyan-800 text-white hover:bg-emerald-700 mx-2 hover:shadow-2xl"
    >
      {{ $t("pages.404.buttons.home") }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let ogpImageUrl = useOgpImageUrl("404", t("pages.404.content.errorMessage"));
useHead({
  title: t("pages.404.meta.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.404.meta.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("pages.404.meta.og.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("pages.404.meta.description"),
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: ogpImageUrl,
    },
    {
      hid: "twitter:image",
      property: "twitter:image",
      content: ogpImageUrl,
    },
    {
      hid: "twitter:card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://nuxtwind.com/",
    },
    {
      property: "og:locale",
      content: t("pages.404.meta.og.locale"),
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
.btn {
  transition: all 0.2s ease-in-out;
}
.btn:hover {
  transform: scale(1.1);
}
</style>
