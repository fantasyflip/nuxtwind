---
title: Appbar
description: The best place to put your navigation.
---

## Usage

::Component-Interactive
---
class: block
---
::

## Props

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
  Sets the appbar to absolute position.
::

::prop-display
---
name: bottom
types:
  - boolean
default: false
required: false
---
### `bottom`
#description
  Changes the position of the appbar to the bottom of the screen.
  ::callout{icon="i-heroicons-light-bulb" }
  Requires either `absolute` or `fixed` to be set.
  ::
::

::prop-display
---
name: color
types:
  - object
default:
  bg: "bg-gray-200 dark:bg-zinc-900"
  navigationIcon: "text-black dark:text-white"
  navigationIconHover: "hover:text-primary-700 dark:hover:text-primary-300"
required: false
---
### `color`
#description
  Sets the colors of the appbar.
#defaultValue
```ts
{
  bg: 'bg-gray-200 dark:bg-zinc-900',
  navigationIcon: 'text-black dark:text-white',
  navigationIconHover: 'hover:text-primary-700 dark:hover:text-primary-300'
}
```
::

::prop-display
---
name: elevate-on-scroll
types:
  - boolean
default: false
required: false
---
### `elevate-on-scroll`
#description
  On scroll, the appbar will receive elevation by adding a drop shadow.
::

::prop-display
---
name: extension
types:
  - boolean
default: false
required: false
---
### `extension`
#description
  Activates the extension slot below the appbar.
  ::Component-Interactive
  ---
  props:
    extension: true
  slots:
    extension: This is the extension slot.
  class: block pb-8
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#extension-slot" }
  Content for the extension can be provided via the `extension` slot.
  ::
::

::prop-display
---
name: fixed
types:
  - boolean
default: false
required: false
---
### `absolute`
#description
  Sets the appbar to fixed position.
::

::prop-display
---
name: height
types:
  - string
default: h-14
required: false
---
### `height`
#description
  Sets the height of the appbar.
::

::prop-display
---
name: navigation-icon
types:
  - boolean
  - object
default: false
required: false
---
### `navigation-icon`
#description
  Activates the navigation icon slot.
  ::Component-Interactive
  ---
  props:
    navigation-icon: true
  class: block
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#navigation-icon-slot" }
  Content for the navigation icon can be provided via the `navigation-icon` slot or via a custom component. The default navigation icon is MDI-Menu.
  ::
::

::prop-display
---
name: scroll-offset
types:
  - number
  - undefined
default: undefined
required: false
---
### `scroll-offset`
#description
  Sets the Y-Scroll-Offset for elevation and shrinking of the appbar, if it's used in a relative container element.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#elevate-on-scroll" }
  Requires `elevate-on-scroll` and/or `shrink-on-scroll` to be set.
  ::
::

::prop-display
---
name: shrink-on-scroll
types:
  - boolean
default: false
required: false
---
### `shrink-on-scroll`
#description
  Shrinks the extension slot on scroll.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#extension" }
  Requires `extension` to be active.
  ::
::

::prop-display
---
name: sticky
types:
  - boolean
default: false
required: false
---
### `sticky`
#description
  Sets the appbar to sticky position.
::

::prop-display
---
name: z-index
types:
  - string
default: z-10
required: false
---
### `z-index`
#description
  Sets the appbar's z-index.
::

---

## Slots

::slot-display
### `default`

#description
  The default slot is used to place the content of the appbar.
::

::slot-display
### `navigation-icon` (slot)

#description
  Slot to provide a custom navigation icon.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#navigation-icon" }
  Only relevant if `navigation-icon`-prop is set.
  ::
::

::slot-display
### `extension` (slot)

#description
  Slot to provide a custom navigation icon.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#extension" }
  Only relevant if `extension`-prop is set.
  ::
::