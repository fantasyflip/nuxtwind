import { defineNuxtConfig } from "nuxt/config";
import MyModule from "..";

export default defineNuxtConfig({
  modules: [
    MyModule,
    [
      "@nuxtjs/tailwindcss",
      {
        configPath: "../../docs/tailwind.config.js",
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
  ],
});
