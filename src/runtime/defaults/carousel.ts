export default {
  autoPlay: true,
  timeout: 5,
  disableAutoPlayOnHover: true,
  hideNavigation: false,
  hidePagination: false,
  shadow: 'shadow-xl',
  transition: {
    duration: 'duration-300',
    delay: 'delay-300',
    ease: 'ease-in-out',
  },
  navigation: {
    color: {
      bg: 'bg-white',
      text: 'text-black',
      hover: 'hover:bg-gray-100',
    },
    icon: {
      left: '❮',
      right: '❯',
    },
    size: 'w-8 h-8',
    rounded: 'rounded-2xl',
    opacity: {
      default: 'opacity-0',
      hover: 'group-hover/button:opacity-20',
    },
  },
  pagination: {
    color: {
      active: 'bg-blue-500',
      inactive: 'bg-gray-300',
      hover: 'hover:bg-blue-400',
    },
    size: 'w-3 h-3',
    spacing: 'mx-1',
    rounded: 'rounded-full',
  },
}
