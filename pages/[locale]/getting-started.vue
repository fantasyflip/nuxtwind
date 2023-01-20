<template>
  <div>
    <NuxtLayout name="docs">
      <NuxtLayout name="default">
        <h1 class="text-5xl font-bold">Getting Started</h1>
        <p class="py-6">
          Using Nuxtwind is as easy as adding a module to your Nuxt.js project
          and making minor changes to your TailwindCSS config.
        </p>
        <div class="border-[0.5px] border-zinc-500 my-4"></div>
        <h2 class="text-4xl font-semibold py-4">Installation</h2>
        <p class="py-3">
          1. Add
          <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
            >@nuxtwind/components</code
          >
          dependency to your project:
        </p>
        <div class="py-3">
          <BashHighlight content="npm i @nuxtwind/components" />
        </div>
        <p class="py-3">
          2. Add it to your
          <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
            >modules</code
          >
          section in your
          <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
            >nuxt.config</code
          >:
        </p>
        <div class="py-3">
          <CodeHighlight
            content="export default defineNuxtConfig({
  modules: ['@nuxtwind/components'],
});"
            lang="ts"
            path="nuxt.config.ts"
          />
        </div>
        <p class="py-3">
          3. Add the module path to the content array in your
          <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
            >tailwind.config</code
          >. This is required for TailwindCSS to load all utility classes that
          are used in Nuxtwind:
        </p>
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
          That's it! You can now use all Nuxtwind components in your project.
        </p>
        <div class="border-[0.5px] border-zinc-500 my-4"></div>
        <h2 class="text-4xl font-semibold py-4">Options</h2>
        <p class="py-3">
          You can customize the module's behavior by providing available options
          in the
          <code class="dark:bg-zinc-800 bg-gray-200 rounded-lg p-1"
            >modules</code
          >
          array in your nuxt.config:
        </p>
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
          See the
          <NuxtLink
            :to="useLocaleUrl('options')"
            class="text-primary-800 hover:text-secondary-700"
            >module options</NuxtLink
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
