import type { NuxtWindConfig } from '~/src/runtime/types/config'

// nuxtwind.config.ts
export default {
  Button: {
    color: {
      bg: 'bg-purple-600',
      text: 'text-white',
    },
    loading: true,
  },
} satisfies NuxtWindConfig
