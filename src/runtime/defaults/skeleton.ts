import type { SkeletonConfig } from '../types/merged'

export default {
  loading: true,
  tag: 'p',
  autoDetectRootTag: true,
  animationClass: 'animate-pulse',
  tagOptions: {
    p: {
      gap: 'gap-2',
      lines: 3,
      lineHeight: 'h-4',
      color: 'bg-gray-300 dark:bg-gray-700',
      rounded: 'rounded',
    },
    article: {
      headingGap: 'gap-4',
      headingHeight: 'h-6',
      headingRounded: 'rounded-lg',
      gap: 'gap-2',
      lines: 3,
      lineHeight: 'h-4',
      color: 'bg-gray-300 dark:bg-gray-700',
      rounded: 'rounded',
    },
    img: {
      width: 'w-32',
      height: 'h-32',
      color: 'bg-gray-300 dark:bg-gray-700',
      rounded: 'rounded-lg',
      iconSize: 'size-10',
      iconColor: 'text-gray-400 dark:text-gray-600',
    },
    card: {
      imgHeight: 'h-full min-h-40',
      headingHeight: 'h-6',
      imgRounded: 'rounded',
      headingRounded: 'rounded-lg',
      imgIconColor: 'text-zinc-600',
      imgIconSize: 'size-10',
      imageAspect: 'aspect-video',
      color: 'bg-zinc-800',
      gap: 'gap-4',
    },
  },
} satisfies SkeletonConfig
