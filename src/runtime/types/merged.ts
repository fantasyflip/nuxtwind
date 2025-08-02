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
