export default defineNuxtConfig({
  // TODO run pnpm add "generated-tarball" before starting dev server
  modules: ['@nuxtwind/components'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nuxtwind: {
    debugLog: true,
  },
})
