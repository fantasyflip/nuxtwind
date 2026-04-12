import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtwind/components',
    '@nuxtjs/i18n',
    'nuxt-og-image',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  devtools: { enabled: true },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    classSuffix: '',
    classPrefix: '',
    storageKey: 'theme',
  },

  runtimeConfig: {
    public: {
      i18n: {
        baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL || 'https://example.com',
      },
    },
  },
  compatibilityDate: '2025-03-14',
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'de',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en-US.json',
        isCatchallLocale: true,
      },
      {
        code: 'de',
        name: 'Deutsch',
        language: 'de-DE',
        file: 'de-DE.json',
      },
    ],
    langDir: 'locales',
    vueI18n: './i18n.config.ts',
  },
  nuxtwind: {
    debugLog: true,
  },
})
