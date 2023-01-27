<template>
  <div>
    <NuxtLayout name="docs">
      <NuxtLayout name="default">
        <HeadingHash element="h1" hash="start">{{
          $t("pages.options.content.title")
        }}</HeadingHash>
        <p class="py-6">
          {{ $t("pages.options.content.description") }}
        </p>
        <div class="border-[0.5px] border-zinc-500 my-4"></div>
        <CodeHighlight
          content='export default defineNuxtConfig({
  modules: [
    [
      "@nuxtwind/components",
      {
        /* default options */
        customPrefix: "NXW-"
      },
    ],
  ],
});'
          lang="ts"
          path="nuxt.config.ts"
        />
        <section>
          <HeadingHash element="h2" hash="customPrefix" class="py-10">
            <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
              >customPrefix</code
            >
          </HeadingHash>
          <span
            >{{ $t("pages.options.content.customPrefix.default") }}:
            <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
              >'NXW-'</code
            ></span
          >
          <p class="py-3">
            {{ $t("pages.options.content.customPrefix.description") }}
          </p>
          <h3 class="text-xl md:text-2xl xl:text-3xl font-semibold py-6">
            {{ $t("pages.options.content.customPrefix.example.title") }}
          </h3>
          <CodeHighlight
            content='export default defineNuxtConfig({
  modules: [
    [
      "@nuxtwind/components",
      {
        /* default options */
        customPrefix: "My-"
      },
    ],
  ],
});'
            lang="ts"
            path="nuxt.config.ts"
          />
          <div
            class="py-3"
            v-html="
              $t('pages.options.content.customPrefix.example.description')
            "
          ></div>
        </section>
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let ogpImageUrl = useOgpImageUrl(
  t("pages.options.meta.title"),
  t("pages.options.meta.description"),
  "components"
);
useHead({
  title: t("pages.options.meta.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.options.meta.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("pages.options.meta.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("pages.options.meta.description"),
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
      content: t("pages.options.meta.og.locale"),
    },
  ],
});
definePageMeta({
  layout: false,
});
</script>
