<template>
  <div class="h-screen bg-layered-waves-bottom bg-no-repeat bg-center bg-cover">
    <!-- TODO Animate bg https://codepen.io/lykos-manolis/pen/qBoyaLW -->
    <div class="h-[60vh] md:flex">
      <div
        class="w-full h-[70%] md:p-0 p-14 align-center md:hidden flex justify-center"
      >
        <NuxtWindIconName />
      </div>
      <div
        class="lg:w-[60%] md:w-[70%] w-full grid place-items-center md:mt-10 md:ml-10"
      >
        <div class="2xl:w-[80%] lg:w-[75%]">
          <div
            class="2xl:text-5xl xl:text-4xl lg:text-3xl sm:text-3xl text-2xl md:text-start text-center font-bold px-2 md:px-0"
          >
            NuxtWind Component Library
          </div>
          <div
            class="2xl:text-2xl xl:text-xl lg:text-base sm:text-sm text-xs md:text-start text-center text-zinc-500 pt-1 px-2 md:px-0"
          >
            Created for Nuxt 3. Made with TailwindCSS. Inspired by Vuetify.
          </div>
          <div class="flex pt-8 md:justify-start justify-center">
            <Button class="mr-4" link="/getting-started">Get Started</Button>
            <Button
              link="/component/button"
              :color="{
                bg: 'bg-primary-700 dark:bg-primary-700',
                hover: 'hover:bg-secondary-600 dark:hover:bg-secondary-600',
              }"
              >Documentation</Button
            >
          </div>
        </div>
      </div>
      <div class="lg:w-[40%] md:w-[30%] align-center hidden md:flex">
        <ClientOnly>
          <!-- TODO remove client-only -->
          <NuxtWindIconName
            :width="
              useTWBreakpoint({
                base: '70%',
                sm: '70%',
                md: '70%',
                lg: '50%',
                xl: '50%',
                '2xl': '50%',
              }).value.current.value
            "
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
definePageMeta({
  layout: false,
});
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
