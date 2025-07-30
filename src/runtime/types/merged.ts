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
