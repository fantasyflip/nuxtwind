import type { NuxtWindConfig } from '~/src/runtime/types/config'

// nuxtwind.config.ts
export default {
  button: {
    color: {
      bg: 'bg-purple-600',
      text: 'text-white',
    },
  },
  badge: {
    color: {
      bg: 'bg-yellow-500',
    },
    bottom: true,
  },
  appbar: {
    color: {
      bg: 'bg-yellow-500',
    },
    navigationIcon: true,
  },
  carousel: {
    hideNavigation: true,
    timeout: 2,
  },
  checkbox: {
    color: {
      iconActive: 'text-yellow-500 dark:text-yellow-400',
    },
    radio: true,
  },
  checkboxgroup: {
    notZero: true,
    color: {
      label: 'text-yellow-500 dark:text-yellow-400',
    },
  },
} satisfies NuxtWindConfig
