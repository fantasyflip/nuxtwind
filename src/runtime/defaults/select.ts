import type { SelectConfig } from '../types/merged'

export default {
  items: [],
  color: {
    textfield: {},
    bg: 'bg-gray-200 dark:bg-zinc-800',
    text: 'text-black dark:text-white',
    border: 'border-gray-300 dark:border-zinc-700',
    hover: 'hover:bg-primary-700',
  },
  font: {
    label: 'text-sm',
    input: 'text-sm',
    placeholder: 'text-sm',
    hint: 'text-sm',
  },
  search: false,
  markOnFocus: false,
  showAllOnFocus: false,
  label: '',
  outlined: 'border-2',
  filled: 'filled',
  disabled: false,
  loading: false,
  placeholder: '',
  transition: {
    duration: 'duration-300',
    ease: 'ease-in-out',
    placeholder: {
      duration: 'duration-300',
      ease: 'ease-in-out',
    },
  },
  shadow: 'shadow-lg',
  appendIcon: undefined,
  prependIcon: undefined,
  clearable: false,
  width: {
    textfield: 'w-full',
    select: 'w-full',
  },
  height: 'max-h-48',
  displayProperty: undefined,
} satisfies SelectConfig
