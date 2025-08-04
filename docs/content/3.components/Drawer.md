---
title: Drawer
description: The best way to navigate through your app on mobile devices.
---

## Usage

::ExampleDrawer
---
ignore:
  - disable-overflow
  - height
  - absolute
---
::

## Props

::prop-display
---
prop: absolute
---
### `absolute`
#description
  Sets the drawer to absolute position.
::

::prop-display
---
prop: border
---
### `border`
#description
  Sets the border style of the drawer.
  ::ExampleDrawer
  ---
  ignore:
    - disable-overflow
    - height
    - absolute
  props:
    border: true
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/drawer#right" }
  If the `right`-prop is set the border style must be adjusted manually.
  ::
::

::prop-display
---
prop: color
---
### `color`
#description
  Sets the colors of the drawer.
#defaultValue
```ts 
{
  bg: 'bg-gray-200 dark:bg-zinc-900',
  overlayBg: 'bg-black/50'
}
```
::

::prop-display
---
prop: disableOverflow
---
### `disableOverflow`
#description
  Disables html overflow when the drawer is open.
::

::prop-display
---
prop: expandOnHover
---
### `expandOnHover`
#description
  Expands the drawer on hover. Optionally set the width and hoverWidth.
  ::ExampleDrawer
  ---
  ignore:
    - disable-overflow
    - height
    - absolute
  props:
    expand-on-hover: true
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/drawer#no-mobile" }
  `expand-on-hover` will be disabled on mobile devices by default. To prevent this set the `no-mobile`-prop to `true` and adjust its behavior with the `mobile-width`-prop.
  ::
#defaultValue
```ts
{
  width: 'w-12',
  hoverWidth: 'hover:w-80'
}
```
::

::prop-display
---
prop: fixed
---
### `fixed`
#description
  Sets the drawer to fixed position.
::

::prop-display
---
prop: height
---
### `height`
#description
  Sets the height of the drawer.
::

::prop-display
---
prop: mobileWidth
---
### `mobileWidth`
#description
  Sets the threshhold when the 'no-mobile'-Prop should take effect.
::

::prop-display
---
prop: noMobile
---
### `noMobile`
#description
  Prevents the drawer from disabling 'expand-on-hover' on mobile devices.
  ::callout{icon="i-heroicons-light-bulb" to="/components/drawer#mobile-width" }
  The behavior can be adjusted using the `mobile-width`-prop.
  ::
::

::prop-display
---
prop: overlay
---
### `overlay`
#description
  Enables the overlay when the drawer is open.
  ::ExampleDrawer
  ---
  ignore:
    - disable-overflow
    - height
    - absolute
  props:
    overlay: true
  ---
  ::
::

::prop-display
---
prop: permanent
---
### `permanent`
#description
  Disables the drawer from closing, when clicking outside of it.
  ::ExampleDrawer
  ---
  ignore:
    - disable-overflow
    - height
    - absolute
  props:
    permanent: true
  ---
  ::
::

::prop-display
---
prop: right
---
### `right`
#description
  Positions the drawer to the right.
  ::ExampleDrawer
  ---
  ignore:
    - disable-overflow
    - height
    - absolute
  props:
    right: true
  ---
  ::
::

::prop-display
---
prop: transition
---
### `transition`
#description
  Sets the transition settings of the drawer.
#defaultValue
```ts
{
  duration: "duration-300",
  ease: "ease-in-out"
}
```
::

::prop-display
---
prop: width
---
### `width`
#description
  Sets the width of the drawer.
::

::prop-display
---
prop: zIndex
---
### `zIndex`
#description
  Sets the z-index of the drawer.
::

---

## Slots

::slot-display
### `default` (slot)

#description
  The content of the drawer.
::
