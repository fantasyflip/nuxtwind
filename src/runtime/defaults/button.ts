import type { ButtonConfig } from '../types/merged'

export default {
  color: {
    bg: 'bg-primary-900 dark:bg-primary-900',
    text: 'dark:text-white text-white',
    border: 'dark:border-white border-black',
    hover: 'hover:bg-secondary-800 dark:hover:bg-secondary-800',
    iconHover: 'hover:text-secondary-800 dark:hover:text-secondary-800',
    loadingCircle: '#27272a',
    loadingCircleDark: '#27272a',
    loadingCircleProgress: '#10b981',
    loadingCircleProgressDark: '#10b981',
    loadingCircleCutout: 'before:bg-primary-900 dark:before:bg-primary-900',
  },
  rounded: 'rounded-md',
  grow: {
    delay: 'delay-10',
    scale: 'hover:scale-105',
  },
  link: '',
  outlined: 'border-2',
  target: '_self',
  disabled: false,
  loading: false,
  shadow: 'shadow-md',
  transition: {
    duration: 'duration-300',
    ease: 'ease-in-out',
  },
  dense: false,
  ariLabel: '',
  type: 'button',
  width: 'w-fit',
  height: '',
  icon: false,
} satisfies ButtonConfig
