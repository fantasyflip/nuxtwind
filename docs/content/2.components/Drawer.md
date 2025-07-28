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

::prop-display
---
name: absolute
types:
  - boolean
default: false
required: false
---
### `absolute`
#description
  Sets the drawer to absolute position.
::

::prop-display
---
name: border
types:
  - string
  - boolean
default: 'border-r dark:border-zinc-700 border-gray-500'
required: false
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
name: color
types:
  - object
default:
   bg: 'bg-gray-200 dark:bg-zinc-900'
   overlayBg: 'bg-black/50'
required: false
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
name: disable-overflow
types:
  - boolean
default: true
required: false
---
### `disable-overflow`
#description
  Disables html overflow when the drawer is open.
::

::prop-display
---
name: expand-on-hover
types:
  - object
  - boolean
default:
  width: 'w-12'
  hoverWidth: 'hover:w-80'
required: false
---
### `expand-on-hover`
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
name: fixed
types:
  - boolean
default: true
required: false
---
### `fixed`
#description
  Sets the drawer to fixed position.
::

::prop-display
---
name: height
types:
  - string
default: 'h-screen'
required: false
---
### `height`
#description
  Sets the height of the drawer.
::

::prop-display
---
name: mobile-width
types:
  - number
default: 768
required: false
---
### `mobile-width`
#description
  Sets the threshhold when the 'no-mobile'-Prop should take effect.
::

::prop-display
---
name: no-mobile
types:
  - boolean
default: false
required: false
---
### `no-mobile`
#description
  Prevents the drawer from disabling 'expand-on-hover' on mobile devices.
  ::callout{icon="i-heroicons-light-bulb" to="/components/drawer#mobile-width" }
  The behavior can be adjusted using the `mobile-width`-prop.
  ::
::

::prop-display
---
name: overlay
types:
  - boolean
default: true
required: false
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
name: permanent
types:
  - boolean
default: false
required: false
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
name: right
types:
  - boolean
default: false
required: false
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
name: transition
types:
  - object
  - boolean
default:
    duration: "duration-300"
    ease: "ease-in-out"
required: false
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
name: width
types:
  - string
default: 'w-80'
required: false
---
### `width`
#description
  Sets the width of the drawer.
::

::prop-display
---
name: z-index
types:
  - string
default: 'z-[100]'
required: false
---
### `z-index`
#description
  Sets the z-index of the drawer.
::

## Slots

::slot-display
### `default` (slot)

#description
  The content of the drawer.
::
