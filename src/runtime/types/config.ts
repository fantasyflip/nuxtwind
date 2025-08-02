import type { ButtonProps, BadgeProps, AppbarProps, CarouselProps, CheckboxProps, CheckboxgroupProps, DrawerProps } from './props'

export interface NuxtWindConfig {
  button?: ButtonProps
  badge?: BadgeProps
  appbar?: AppbarProps
  carousel?: CarouselProps
  checkbox?: CheckboxProps
  checkboxgroup?: CheckboxgroupProps
  drawer?: DrawerProps
  // Add other component props here
}
