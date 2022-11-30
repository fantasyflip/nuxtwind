<template>
  <div>
    {{ $t("pages.index.content.hello", { name: $route.path }) }}
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
      content: "https://fantasyflip.de/",
    },
    {
      property: "og:locale",
      content: t("pages.index.meta.og.locale"),
    },
  ],
});
</script>
