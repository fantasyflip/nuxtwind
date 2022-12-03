<template>
  <div class="center">
    <div class="md:text-[230px] sm:text-[180px] text-8xl font-bold group">
      <span>{{ $t("pages.fallbackIndex.content.oops") }}</span>
      <span class="text-primary group-hover:text-secondary">!</span>
    </div>
    <div class="md:text-3xl sm:text-2xl text-xl mt-6">
      {{ $t("pages.fallbackIndex.content.errorMessage") }}
    </div>
    <div class="flex">
      <NuxtLink
        to="/en/"
        :rel="$t('pages.fallbackIndex.buttons.english')"
        class="mt-6 btn inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-cyan-800 text-white hover:bg-emerald-700 mx-2 hover:shadow-2xl"
      >
        {{ $t("pages.fallbackIndex.buttons.english") }}
      </NuxtLink>
      <NuxtLink
        to="/de/"
        :rel="$t('pages.fallbackIndex.buttons.german')"
        class="mt-6 btn inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-cyan-800 text-white hover:bg-emerald-700 mx-2 hover:shadow-2xl"
      >
        {{ $t("pages.fallbackIndex.buttons.german") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
useHead({
  title: t("pages.fallbackIndex.meta.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.fallbackIndex.meta.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("pages.fallbackIndex.meta.og.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("pages.fallbackIndex.meta.description"),
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
      content: "https://components.fantasyflip.de/",
    },
    {
      property: "og:locale",
      content: t("pages.fallbackIndex.meta.og.locale"),
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
