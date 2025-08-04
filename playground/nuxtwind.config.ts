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
  drawer: {
    border: false,
    color: {
      bg: 'bg-yellow-500 dark:bg-yellow-500',
    },
  },
  progress: {
    color: {
      secondStrike: 'after:bg-yellow-600',
    },
  },
  select: {
    search: true,
    color: {
      bg: 'bg-yellow-500 dark:bg-yellow-500',
    },
  },
  skeleton: {
    tagOptions: {
      p: {
        color: 'bg-yellow-500 dark:bg-yellow-500',
      },
    },
  },
  slider: {
    label: 'Slider',
    color: {
      sliderLine: 'bg-yellow-500 dark:bg-yellow-500',
    },
  },
  textarea: {
    counter: true,
    color: {
      text: 'text-yellow-500 dark:text-yellow-400',
    },
  },
  textfield: {
    clearable: true,
    color: {
      text: 'text-yellow-500 dark:text-yellow-400',
    },
  },
  toast: {
    type: 'success',
    color: {
      text: 'text-yellow-500 dark:text-yellow-400',
    },
  },
  tooltip: {
    interactive: true,
    color: {
      bg: 'bg-yellow-500 dark:bg-yellow-500',
    },
  },
} satisfies NuxtWindConfig
