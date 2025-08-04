import type { CheckboxgroupConfig } from '../types/merged'

export default {
  items: [],
  color: {
    label: 'text-primary-500 dark:text-primary-500',
    description: 'text-gray-500 dark:text-gray-400',
  },
  text: {
    label: 'text-lg font-medium',
    description: 'text-sm',
  },
  label: '',
  description: '',
  multiple: false,
  noRadio: false,
  loading: false,
  disabled: false,
  width: 'w-full',
  generalCheckboxProps: {},
  notZero: false,
} satisfies CheckboxgroupConfig
