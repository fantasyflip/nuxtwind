export interface ButtonProps {
  color?: {
    bg?: string
    text?: string
    border?: string
    hover?: string
    iconHover?: string
    loadingCircle?: string
    loadingCircleDark?: string
    loadingCircleProgress?: string
    loadingCircleProgressDark?: string
    loadingCircleCutout?: string
  }
  rounded?: boolean | string
  grow?:
    | boolean
    | {
      delay?: string
      scale?: string
    }
  link?: object | string
  target?: string
  disabled?: boolean
  icon?: boolean
  loading?: boolean
  outlined?: boolean | string
  shadow?: boolean | string
  transition?:
    | boolean
    | {
      duration?: string
      ease?: string
    }
  dense?: boolean
  ariLabel?: string
  type?: 'button' | 'submit' | 'reset'
  width?: string
  height?: string
}

export interface BadgeProps {
  color?: {
    bg?: string
    border?: string
    text?: string
  }
  top?: boolean
  bottom?: boolean
  right?: boolean
  left?: boolean
  text?: string
  border?: boolean | string
  width?: string
  height?: string
}

export interface AppbarProps {
  color?: {
    bg?: string
    navigationIcon?: string
    navigationIconHover?: string
  }
  fixed?: boolean
  absolute?: boolean
  sticky?: boolean
  bottom?: boolean
  extension?: boolean
  shrinkOnScroll?: boolean
  elevateOnScroll?: boolean
  scrollOffset?: number
  navigationIcon?: boolean | object
  zIndex?: string
  height?: string
  target?: string
}

export interface CarouselProps {
  modelValue?: number
  autoPlay?: boolean
  timeout?: number
  disableAutoPlayOnHover?: boolean
  hideNavigation?: boolean
  hidePagination?: boolean
  shadow?: boolean | string
  transition?:
    | boolean
    | {
      duration?: string
      delay?: string
      ease?: string
    }
  navigation?: {
    color?: {
      bg?: string
      text?: string
      hover?: string
    }
    icon?: {
      left?: string
      right?: string
    }
    size?: string
    rounded?: string
    opacity?: {
      default?: string
      hover?: string
    }
  }
  pagination?: {
    color?: {
      active?: string
      inactive?: string
      hover?: string
    }
    size?: string
    spacing?: string
    rounded?: string
  }
}

export interface CheckboxProps {
  modelValue?: boolean
  color?: {
    label?: string
    description?: string
    iconInactive?: string
    iconActive?: string
    hover?: string
  }
  text?: {
    label?: string
    description?: string
  }
  label?: string
  description?: string
  radio?: boolean
  disabled?: boolean
  loading?: boolean
}

export interface CheckboxgroupProps {
  modelValue?: boolean[]
  items?: {
    label?: string
    description?: string
    color?: {
      label?: string
      description?: string
      iconInactive?: string
      iconActive?: string
      hover?: string
    }
    text?: {
      label?: string
      description?: string
    }
    disabled?: boolean
    loading?: boolean
  }[]
  color?: {
    label?: string
    description?: string
  }
  text?: {
    label?: string
    description?: string
  }
  label?: string
  description?: string
  multiple?: boolean
  noRadio?: boolean
  loading?: boolean
  disabled?: boolean
  width?: string
  generalCheckboxProps?: {
    label?: string
    description?: string
    color?: {
      label?: string
      description?: string
      iconInactive?: string
      iconActive?: string
      hover?: string
    }
    text?: {
      label?: string
      description?: string
    }
    disabled?: boolean
    loading?: boolean
  }
  notZero?: boolean
}

export interface DrawerProps {
  modelValue?: boolean
  color?: {
    bg?: string
    overlayBg?: string
  }
  absolute?: boolean
  fixed?: boolean
  zIndex?: string
  overlay?: boolean
  disableOverflow?: boolean
  expandOnHover?:
    | boolean
    | {
      width?: string
      hoverWidth?: string
    }
  transition?:
    | boolean
    | {
      duration?: string
      ease?: string
    }
  noMobile?: boolean
  mobileWidth?: number
  border?: boolean | string
  right?: boolean
  permanent?: boolean
  height?: string
  width?: string
}
