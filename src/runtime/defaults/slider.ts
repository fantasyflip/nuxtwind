import type { SliderConfig } from '../types/merged'

export default {
  color: {
    label: 'text-black dark:text-white',
    description: 'text-zinc-400',
    sliderLine: 'bg-zinc-600 dark:bg-zinc-600',
    sliderThumb: '#06b6d4',
    sliderThumbDark: '#06b6d4',
    sliderThumbBorder: '#155e75',
    sliderThumbBorderDark: '#155e75',
  },
  label: '',
  description: '',
  min: 0,
  max: 100,
  thumbSize: 15,
  disabled: false,
  rounded: 'rounded-lg',
  width: 'w-full',
  height: 'h-0.5',
} satisfies SliderConfig
