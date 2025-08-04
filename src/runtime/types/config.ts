import type { ButtonProps, BadgeProps, AppbarProps, CarouselProps, CheckboxProps, CheckboxgroupProps, DrawerProps, ProgressProps, SelectProps, SkeletonProps, SliderProps, TextareaProps, TextfieldProps, ToastProps, TooltipProps } from './props'

export interface NuxtWindConfig {
  button?: ButtonProps
  badge?: BadgeProps
  appbar?: AppbarProps
  carousel?: CarouselProps
  checkbox?: CheckboxProps
  checkboxgroup?: CheckboxgroupProps
  drawer?: DrawerProps
  progress?: ProgressProps
  select?: SelectProps
  skeleton?: SkeletonProps
  slider?: SliderProps
  textarea?: TextareaProps
  textfield?: TextfieldProps
  toast?: ToastProps
  tooltip?: TooltipProps
  // Add other component props here
}
