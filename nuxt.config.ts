// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  // TODO Add auto import for module components
  // components: {
  //   global: true,
  //   dirs: ["~/components", "~/module/src/runtime/components"],
  // },
  css: ["vue-json-pretty/lib/styles.css"],
  plugins: ["@/plugins/vue-json-pretty"],
  modules: [
    [
      "@nuxtjs/tailwindcss",
      {
        configPath: "~/tailwind.config.js",
      },
    ],
    "unplugin-icons/nuxt",
    [
      "@nuxtjs/color-mode",
      {
        preference: "system", // default value of $colorMode.preference
        fallback: "dark", // fallback value if not system preference found
        classSuffix: "",
        classPrefix: "",
        storageKey: "theme",
      },
    ],
    "@vueuse/nuxt",
    "nuxt-simple-robots",
  ],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        strictMessage: false,
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  runtimeConfig: {
    // Private keys are only available on the server
    // Public keys that are exposed to the client
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://nuxtwind.com",
    },
  },
});
