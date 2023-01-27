<template>
  <div>
    <NuxtLayout name="docs">
      <NuxtLayout name="default">
        <HeadingHash element="h1" hash="start">{{
          $t("pages.theme.content.title")
        }}</HeadingHash>
        <p class="py-6">
          {{ $t("pages.theme.content.description") }}
        </p>
        <div class="border-[0.5px] border-zinc-500 my-4"></div>
        <section>
          <HeadingHash
            element="h2"
            hash="customize-theme-tailwind"
            class="py-4"
            >{{ $t("pages.theme.content.tailwindconfig.title") }}</HeadingHash
          >
          <p class="py-3">
            {{ $t("pages.theme.content.tailwindconfig.firstStep") }}
          </p>
        </section>
        <section>
          <HeadingHash element="h3" hash="custom-theme" class="py-6">{{
            $t("pages.theme.content.tailwindconfig.custom.title")
          }}</HeadingHash>
          <p class="py-3">
            {{ $t("pages.theme.content.tailwindconfig.custom.description") }}
          </p>
          <p class="py-3">
            {{ $t("pages.theme.content.tailwindconfig.custom.firstStep") }}
          </p>
          <CodeHighlight
            class="mb-2"
            content='export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        secondary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
  },
};'
            lang="js"
            path="tailwind.config.js"
          />
          <div
            class="w-full bg-blue-500 border-2 border-blue-600 rounded-lg p-2 text-black text-sm"
          >
            {{ $t("pages.theme.content.info.darkMode.prefix") }}
            <NuxtLink
              to="https://tailwindcss.com/docs/dark-mode"
              external
              class="text-blue-800 hover:text-purple-700 font-semibold"
              >{{
                $t("pages.theme.content.info.darkMode.link.tailwind")
              }}</NuxtLink
            >
            {{ $t("pages.theme.content.info.darkMode.mid") }}
            <NuxtLink
              to="https://color-mode.nuxtjs.org/"
              external
              class="text-blue-800 hover:text-purple-700 font-semibold"
              >{{
                $t("pages.theme.content.info.darkMode.link.nuxtColorMode")
              }}</NuxtLink
            >
            {{ $t("pages.theme.content.info.darkMode.suffix") }}
          </div>
        </section>
        <section>
          <HeadingHash element="h3" hash="nuxtwind-theme" class="py-6">{{
            $t("pages.theme.content.tailwindconfig.default.title")
          }}</HeadingHash>
          <div
            class="py-3"
            v-html="
              $t('pages.theme.content.tailwindconfig.default.description')
            "
          ></div>
          <CodeHighlight
            class="mb-2"
            content='export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
    },
  },
};'
            lang="js"
            path="tailwind.config.js"
          />
        </section>
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let ogpImageUrl = useOgpImageUrl(
  t("pages.theme.meta.title"),
  t("pages.theme.meta.description"),
  "components"
);
useHead({
  title: t("pages.theme.meta.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.theme.meta.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("pages.theme.meta.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("pages.theme.meta.description"),
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
      content: t("pages.theme.meta.og.locale"),
    },
  ],
});
definePageMeta({
  layout: false,
});
</script>
