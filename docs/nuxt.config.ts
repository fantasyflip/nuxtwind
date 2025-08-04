// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from '../package.json'

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 3
        },
        highlight: {
          langs: ['postcss', 'mdc', 'vue', 'typescript', 'javascript']
        }
      }
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    },
    publicAssets: [
      {
        dir: 'generated',
        maxAge: 60 * 60 * 24 * 7 // Cache for a week
      }
    ]
  },

  hooks: {
    'build:before': async () => {
      console.log('🔍 Extracting prop types before build...')
      try {
        const { execSync } = await import('child_process')
        execSync('tsx ../scripts/extract-prop-types.ts', {
          cwd: process.cwd(),
          stdio: 'inherit'
        })
        console.log('✅ Prop types extracted successfully')
      } catch (error) {
        console.error('❌ Failed to extract prop types:', error)
        // Don't fail the build, just warn
        console.warn('⚠️  Continuing build without updated prop types')
      }
    },
    'ready': async () => {
      // Only run in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Extracting prop types for development...')
        try {
          const { execSync } = await import('child_process')
          execSync('tsx ../scripts/extract-prop-types.ts', {
            cwd: process.cwd(),
            stdio: 'inherit'
          })
          console.log('✅ Prop types extracted successfully')
        } catch (error) {
          console.error('❌ Failed to extract prop types:', error)
          console.log('ℹ️  Run "npm install" in the root directory and ensure tsx is available')
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://docs-template.nuxt.dev/',
    title: 'Nuxt Docs Template',
    description: 'A template for building documentation with Nuxt UI Pro and Nuxt Content.',
    full: {
      title: 'Nuxt Docs Template - Full Documentation',
      description: 'This is the full documentation for the Nuxt Docs Template.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Essentials',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/essentials%' }
        ]
      }
    ]
  },

  nuxtwind: {
    global: true
  }
})
