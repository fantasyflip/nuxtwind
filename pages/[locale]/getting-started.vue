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
  content: ["./module/src/runtime/components/**/*.vue"],
};'
            lang="js"
            path="tailwind.config.js"
          />
        </div>
        <p class="py-3">
          {{ $t("pages.gettingStarted.content.installation.done") }}
        </p>
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
            lang="js"
            path="tailwind.config.js"
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
useHead({
  title: "Getting Started",
  meta: [
    {
      name: "description",
      content: "Getting Started with Nuxtwind",
    },
  ],
});
definePageMeta({
  layout: false,
});
</script>
