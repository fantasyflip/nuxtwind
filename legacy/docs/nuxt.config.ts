import module from '../src/module'
import pkg from '../package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    'nuxt-og-image',
    module,
  ],
  devtools: {
    enabled: true,
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['postcss', 'mdc'],
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  typescript: {
    strict: false,
  },
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c =>
        ['UButton', 'UIcon'].includes(c.pascalName),
      )

      globals.forEach(c => (c.global = true))
    },
  },
  nuxtwind: {
    global: true,
  },
})
