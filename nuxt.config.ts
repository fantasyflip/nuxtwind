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
          darkMode: "class",
          theme: {
            extend: {
              keyframes: {
                "indeterminate-first": {
                  "0%": {
                    left: "-100%",
                    width: "100%",
                  },
                  "100%": {
                    left: "100%",
                    width: "10%",
                  },
                },
                "indeterminate-second": {
                  "0%": {
                    left: "-150%",
                    width: "100%",
                  },
                  "100%": {
                    left: "100%",
                    width: "10%",
                  },
                },
              },
              animation: {
                indeterminatebefore:
                  "indeterminate-first 1.5s infinite ease-out",
                indeterminateafter:
                  "indeterminate-second 1.5s infinite ease-in",
              },
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
