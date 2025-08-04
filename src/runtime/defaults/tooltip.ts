import type { TooltipConfig } from '../types/merged'

export default {
  color: {
    text: 'dark:text-white text-black',
    bg: 'bg-primary-800',
    bgPointer: 'text-primary-800',
  },
  top: true,
  bottom: false,
  left: false,
  right: false,
  transition: {
    duration: 'duration-300',
    ease: 'ease-in-out',
  },
  text: 'text-xs text-center',
  rounded: 'rounded-lg',
  zIndex: 'z-10',
  interactive: false,
  width: 'w-max',
} satisfies TooltipConfig
