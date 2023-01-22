<template>
  <div>
    <NuxtLayout name="docs">
      <NuxtLayout name="default">
        <h1 class="text-3xl md:text-4xl xl:text-5xl font-bold">
          {{ $t("pages.gettingStarted.content.title") }}
        </h1>
        <p class="py-6">
          {{ $t("pages.gettingStarted.content.description") }}
        </p>
        <div class="border-[0.5px] border-zinc-500 my-4"></div>
        <h2 class="text-2xl md:text-3xl xl:text-4xl font-semibold py-4">
          Installation
        </h2>
        <div
          class="py-3"
          v-html="
            $t('pages.gettingStarted.content.installation.firstStep', {
              package: '@nuxtwind/components',
            })
          "
        ></div>
        <div class="py-3">
          <BashHighlight content="npm i @nuxtwind/components" />
        </div>
        <div
          class="py-3"
          v-html="$t('pages.gettingStarted.content.installation.secondStep')"
        ></div>
        <div class="py-3">
          <CodeHighlight
            content="export default defineNuxtConfig({
  modules: ['@nuxtwind/components'],
});"
            lang="ts"
            path="nuxt.config.ts"
          />
        </div>
        <div
          class="py-3"
          v-html="$t('pages.gettingStarted.content.installation.thirdStep')"
        ></div>
        <div class="py-3">
          <CodeHighlight
            content='export default {
  content: ["./node_modules/@nuxtwind/components/dist/runtime/components/*.vue"],
};'
            lang="js"
            path="tailwind.config.js"
          />
        </div>
        <p class="py-3">
          {{ $t("pages.gettingStarted.content.installation.done") }}
        </p>
        <div
          class="w-full bg-yellow-300 border-2 border-yellow-400 rounded-lg p-2 text-black text-sm"
        >
          {{ $t("pages.gettingStarted.content.attention.theme.prefix") }}
          <NuxtLink
            :to="useLocaleUrl('theme')"
            class="text-primary-800 hover:text-secondary-700 font-semibold"
            >{{
              $t("pages.gettingStarted.content.attention.theme.link")
            }}</NuxtLink
          >
          {{ $t("pages.gettingStarted.content.attention.theme.suffix") }}
        </div>
        <div class="border-[0.5px] border-zinc-500 my-4"></div>
        <h2 class="text-2xl md:text-3xl xl:text-4xl font-semibold py-4">
          {{ $t("pages.gettingStarted.content.options.title") }}
        </h2>
        <div
          class="py-3"
          v-html="$t('pages.gettingStarted.content.options.description')"
        ></div>
        <div class="py-3">
          <CodeHighlight
            content='export default defineNuxtConfig({
  modules: [
    [
      "@nuxtwind/components",
      {
        /* module options */
      },
    ],
  ],
});'
            lang="ts"
            path="nuxt.config.ts"
          />
        </div>
        <p class="py-3">
          {{ $t("pages.gettingStarted.content.options.link.prefix") }}
          <NuxtLink
            :to="useLocaleUrl('options')"
            class="text-primary-800 hover:text-secondary-700"
            >{{
              $t("pages.gettingStarted.content.options.link.text")
            }}</NuxtLink
          >.
        </p>
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let ogpImageUrl = useOgpImageUrl(
  t("pages.gettingStarted.meta.title"),
  t("pages.gettingStarted.meta.description"),
  "components"
);
useHead({
  title: t("pages.gettingStarted.meta.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.gettingStarted.meta.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("pages.gettingStarted.meta.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("pages.gettingStarted.meta.description"),
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
      content: t("pages.gettingStarted.meta.og.locale"),
    },
  ],
});
definePageMeta({
  layout: false,
});
</script>
