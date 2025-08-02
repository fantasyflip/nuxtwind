import type { ButtonProps, BadgeProps, AppbarProps, CarouselProps, CheckboxProps, CheckboxgroupProps, DrawerProps, ProgressProps, SelectProps, SkeletonProps } from './props'

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
  // Add other component props here
}
