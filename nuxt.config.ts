// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  css: ["vue-json-pretty/lib/styles.css"],
  plugins: ["@/plugins/vue-json-pretty"],
  modules: [
    [
      "@nuxtjs/tailwindcss",
      {
        config: {
          theme: {
            extend: {
              colors: {
                primary: "#155e75",
                secondary: "#15803d",
              },
            },
          },
        },
      },
    ],
    "unplugin-icons/nuxt",
  ],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
});
