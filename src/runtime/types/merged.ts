export interface ButtonConfig {
  color: {
    bg: string
    text: string
    border: string
    hover: string
    iconHover: string
    loadingCircle: string
    loadingCircleDark: string
    loadingCircleProgress: string
    loadingCircleProgressDark: string
    loadingCircleCutout: string
  }
  rounded: string
  grow: {
    delay: string
    scale: string
  }
  link: object | string
  target: string
  disabled: boolean
  icon: boolean
  loading: boolean
  outlined: boolean | string
  shadow: string
  transition: {
    duration: string
    ease: string
  }
  dense: boolean
  ariLabel: string
  type: 'button' | 'submit' | 'reset'
  width: string
  height: string
}

export interface BadgeConfig {
  color: {
    bg: string
    border: string
    text: string
  }
  top: boolean
  bottom: boolean
  right: boolean
  left: boolean
  text: string
  border: boolean | string
  width: string
  height: string
}

export interface AppbarConfig {
  color: {
    bg: string
    navigationIcon: string
    navigationIconHover: string
  }
  fixed: boolean
  absolute: boolean
  sticky: boolean
  bottom: boolean
  extension: boolean
  shrinkOnScroll: boolean
  elevateOnScroll: boolean
  scrollOffset: number | undefined
  navigationIcon: boolean | object
  zIndex: string
  height: string
  target: string
}

export interface CarouselConfig {
  autoPlay: boolean
  timeout: number
  disableAutoPlayOnHover: boolean
  hideNavigation: boolean
  hidePagination: boolean
  shadow: string
  transition: {
    duration: string
    delay: string
    ease: string
  }
  navigation: {
    color: {
      bg: string
      text: string
      hover: string
    }
    icon: {
      left: string
      right: string
    }
    size: string
    rounded: string
    opacity: {
      default: string
      hover: string
    }
  }
  pagination: {
    color: {
      active: string
      inactive: string
      hover: string
    }
    size: string
    spacing: string
    rounded: string
  }
}

export interface CheckboxConfig {
  color: {
    label: string
    description: string
    iconInactive: string
    iconActive: string
    hover: string
  }
  text: {
    label: string
    description: string
  }
  label: string
  description: string
  radio: boolean
  disabled: boolean
  loading: boolean
}

export interface CheckboxgroupConfig {
  items: {
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
  color: {
    label: string
    description: string
  }
  text: {
    label: string
    description: string
  }
  label: string
  description: string
  multiple: boolean
  noRadio: boolean
  loading: boolean
  disabled: boolean
  width: string
  generalCheckboxProps: {
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
  notZero: boolean
}

export interface DrawerConfig {
  color: {
    bg: string
    overlayBg: string
  }
  absolute: boolean
  fixed: boolean
  zIndex: string
  overlay: boolean
  disableOverflow: boolean
  expandOnHover: {
    width: string
    hoverWidth: string
  }
  transition: {
    duration: string
    ease: string
  }
  noMobile: boolean
  mobileWidth: number
  border: string
  right: boolean
  permanent: boolean
  height: string
  width: string
}

export interface ProgressConfig {
  size: {
    width: string
    height: string
  }
  color: {
    circle: string
    circleDark: string
    circleProgress: string
    circleProgressDark: string
    circleCutout: string
    background: string
    firstStrike: string
    secondStrike: string
    linearProgress: string
    linearProgressHover: string
  }
  circular: {
    size: string
    cutout: {
      size: string
      text: string
    }
  }
  loading: boolean
  initialLoadTime: number
  initialLoadTimeType: 'calc' | 'static'
  transition: {
    duration: string
    ease: string
  }
  rounded: string
}

export interface SelectConfig {
  items: string[] | object[]
  color: {
    textfield: {
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
    bg: string
    text: string
    border: string
    hover: string
  }
  font: {
    label: string
    input: string
    placeholder: string
    hint: string
  }
  search: boolean
  markOnFocus: boolean
  showAllOnFocus: boolean
  label: string
  outlined: boolean | string
  filled: boolean | string
  disabled: boolean
  loading: boolean
  placeholder: string
  transition: {
    duration: string
    ease: string
    placeholder: {
      duration: string
      ease: string
    }
  }
  shadow: string
  appendIcon?: object
  prependIcon?: object
  clearable: boolean
  width: {
    textfield: string
    select: string
  }
  height: string
  displayProperty?: string
}
