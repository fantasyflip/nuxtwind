import { defineNuxtConfig } from "nuxt/config";
import MyModule from "..";

export default defineNuxtConfig({
  modules: [
    MyModule,
    [
      "@nuxtjs/tailwindcss",
      {
        configPath: "~/tailwind.config.js",
      },
    ],
    "@vueuse/nuxt",
  ],
});
