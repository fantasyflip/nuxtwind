import type { ToastConfig } from '../types/merged'

export default {
  id: '',
  color: {
    progress: {
      circle: 'text-gray-300 dark:text-gray-600',
      circleDark: 'dark:text-gray-600',
      circleProgress: 'text-primary-600',
      circleProgressDark: 'dark:text-primary-500',
      circleCutout: 'text-white dark:text-zinc-800',
      background: 'bg-gray-200 dark:bg-gray-700',
      firstStrike: 'bg-gradient-to-r from-transparent via-primary-500 to-transparent',
      secondStrike: 'bg-gradient-to-r from-transparent via-primary-400 to-transparent',
      linearProgress: 'bg-primary-600',
      linearProgressHover: 'hover:bg-primary-700',
    },
    text: 'text-gray-700 dark:text-gray-300',
    bg: 'bg-gray-100 dark:bg-zinc-800',
    icon: {
      info: {
        text: 'text-blue-500 dark:text-blue-200',
        bg: 'bg-blue-200 dark:bg-blue-800',
      },
      warning: {
        text: 'text-yellow-500 dark:text-yellow-200',
        bg: 'bg-yellow-200 dark:bg-yellow-800',
      },
      error: {
        text: 'text-red-500 dark:text-red-200',
        bg: 'bg-red-200 dark:bg-red-800',
      },
      success: {
        text: 'text-green-500 dark:text-green-200',
        bg: 'bg-green-200 dark:bg-green-800',
      },
    },
  },
  autoClose: true,
  duration: 5,
  rounded: 'rounded-lg',
  type: 'info' as const,
  title: 'Toast-Title',
  message: 'Toast-Message',
  shadow: 'shadow-lg',
  icon: false,
  width: 'w-full',
} satisfies ToastConfig
