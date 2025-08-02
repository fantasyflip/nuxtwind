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

export interface ProgressProps {
  modelValue?: number
  size?: {
    width?: string
    height?: string
  }
  color?: {
    circle?: string
    circleDark?: string
    circleProgress?: string
    circleProgressDark?: string
    circleCutout?: string
    background?: string
    firstStrike?: string
    secondStrike?: string
    linearProgress?: string
    linearProgressHover?: string
  }
  circular?:
    | boolean
    | {
      size?: string
      cutout?: {
        size?: string
        text?: string
      }
    }
  loading?: boolean
  initialLoadTime?: number | boolean
  initialLoadTimeType?: 'calc' | 'static'
  transition?:
    | boolean
    | {
      duration?: string
      ease?: string
    }
  rounded?: boolean | string
}

export interface SelectProps {
  modelValue?: string | object
  items?: string[] | object[]
  color?: {
    textfield?: {
      bg?: string
      text?: string
      hint?: string
      error?: string
      label?: string
      labelFocus?: string
      placeholderText?: string
      icon?: string
      iconFocus?: string
      border?: string
      borderFocus?: string
      borderError?: string
      borderFocusError?: string
    }
    bg?: string
    text?: string
    border?: string
    hover?: string
  }
  font?: {
    label?: string
    input?: string
    placeholder?: string
    hint?: string
  }
  search?: boolean
  markOnFocus?: boolean
  showAllOnFocus?: boolean
  label?: string
  outlined?: boolean | string
  filled?: boolean | string
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  transition?:
    | boolean
    | {
      duration?: string
      ease?: string
      placeholder?: {
        duration?: string
        ease?: string
      }
    }
  shadow?: boolean | string
  appendIcon?: object
  prependIcon?: object
  clearable?: boolean
  width?: {
    textfield?: string
    select?: string
  }
  height?: string
  displayProperty?: string
}

export interface SkeletonProps {
  loading?: boolean
  tag?: string
  autoDetectRootTag?: boolean
  animationClass?: string
  tagOptions?: {
    p?: {
      gap?: string
      lines?: number
      lineHeight?: string
      color?: string
      rounded?: string
    }
    article?: {
      headingGap?: string
      headingHeight?: string
      headingRounded?: string
      gap?: string
      lines?: number
      lineHeight?: string
      color?: string
      rounded?: string
    }
    img?: {
      width?: string
      height?: string
      color?: string
      rounded?: string
      iconSize?: string
      iconColor?: string
    }
    card?: {
      imgHeight?: string
      headingHeight?: string
      imgRounded?: string
      headingRounded?: string
      imgIconColor?: string
      imgIconSize?: string
      imageAspect?: string
      color?: string
      gap?: string
    }
  }
}
