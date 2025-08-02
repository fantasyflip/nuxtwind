export default {
  size: {
    width: 'w-full',
    height: 'h-1',
  },
  color: {
    circle: '#e5e7eb',
    circleDark: '#27272a',
    circleProgress: '#00C16A',
    circleProgressDark: '#00C16A',
    circleCutout: 'before:bg-white dark:before:bg-zinc-900',
    background: 'bg-gray-200 dark:bg-zinc-800',
    firstStrike: 'before:bg-primary-500',
    secondStrike: 'after:bg-primary-600',
    linearProgress: 'bg-primary-500',
    linearProgressHover: 'hover:bg-secondary-500',
  },
  circular: {
    size: 'size-20',
    cutout: {
      size: 'before:size-[84%]',
      text: 'text-[70%]',
    },
  },
  loading: false,
  initialLoadTime: 100,
  initialLoadTimeType: 'calc' as 'calc' | 'static',
  transition: {
    duration: 'duration-500',
    ease: 'ease-in-out',
  },
  rounded: 'rounded-lg',
}
