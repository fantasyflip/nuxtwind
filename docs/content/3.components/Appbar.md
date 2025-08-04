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
prop: absolute
---
### `absolute`
#description
  Sets the appbar to absolute position.
::

::prop-display
---
prop: bottom
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
prop: color
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
prop: elevateOnScroll
---
### `elevateOnScroll`
#description
  On scroll, the appbar will receive elevation by adding a drop shadow.
::

::prop-display
---
prop: extension
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
prop: fixed
---
### `fixed`
#description
  Sets the appbar to fixed position.
::

::prop-display
---
prop: height
---
### `height`
#description
  Sets the height of the appbar.
::

::prop-display
---
prop: navigationIcon
---
### `navigationIcon`
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
prop: scrollOffset
---
### `scrollOffset`
#description
  Sets the Y-Scroll-Offset for elevation and shrinking of the appbar, if it's used in a relative container element.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#elevate-on-scroll" }
  Requires `elevateOnScroll` and/or `shrinkOnScroll` to be set.
  ::
::

::prop-display
---
prop: shrinkOnScroll
---
### `shrinkOnScroll`
#description
  Shrinks the extension slot on scroll.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#extension" }
  Requires `extension` to be active.
  ::
::

::prop-display
---
prop: sticky
---
### `sticky`
#description
  Sets the appbar to sticky position.
::

::prop-display
---
prop: target
---
### `target`
#description
  Sets the target for navigation links.
::

::prop-display
---
prop: zIndex
---
### `zIndex`
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
  Only relevant if `navigationIcon`-prop is set.
  ::
::

::slot-display
### `extension` (slot)

#description
  Slot to provide content for the extension area.
  ::callout{icon="i-heroicons-light-bulb" to="/components/appbar#extension" }
  Only relevant if `extension`-prop is set.
  ::
::