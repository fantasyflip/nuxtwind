import type { BadgeConfig } from '../types/merged'

export default {
  color: {
    bg: 'bg-red-500 dark:bg-red-500',
    border: 'border-white dark:border-zinc-900',
    text: 'text-white dark:text-white',
  },
  top: true,
  bottom: false,
  right: true,
  left: false,
  text: 'text-xs font-bold',
  border: 'border-2',
  width: 'min-w-[24px]',
  height: 'min-h-[24px]',
} satisfies BadgeConfig
