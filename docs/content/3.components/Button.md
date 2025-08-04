---
title: Button
description: Perform your actions on click of a button.
---

## Usage

::Component-Interactive
---
slots:
  default: Button
---
::

## Props

::prop-display
---

prop: ariLabel
---
### `ariLabel`
#description
  Adds an aria-label to the button.
  ::Component-Interactive
  ---
  props:
    ariLabel: 'Button'
  slots:
    default: Button
  ---
  ::
::

::prop-display
---

prop: color
---
### `color`
#description
  Sets the colors of the button.
::

::prop-display
---

prop: dense
---
### `dense`
#description
  Reduces the padding of the button.
  ::Component-Interactive
  ---
  props:
    dense: true
  slots:
    default: Button
  ---
  ::
::

::prop-display
---

prop: disabled
---
### `disabled`
#description
  Disables the button.
  ::Component-Interactive
  ---
  props:
    disabled: true
  slots:
    default: Button
  ---
  ::
  ::note{icon="i-heroicons-light-bulb" }
  When the button is disabled, it ignores clicks and thus does not emit `click`-events. The `grow`-prop is also ignored.
  ::
::

::prop-display
---

prop: grow
---
### `grow`
#description
  Adds a grow-on-hover effect to the button.
  ::Component-Interactive
  ---
  props:
    grow: true
  slots:
    default: Button
  ---
  ::

#defaultValue
```ts
{
  delay: 'delay-10',
  scale: 'hover:scale-105'
}
```
::

::prop-display
---

prop: height
---
### `height`
#description
  Sets the height of the button.
::

::prop-display
---

prop: icon
---
### `icon`
#description
  Changes the button styling to an icon button. The background color is removed and the width fits the content.
::

::prop-display
---

prop: link
---
### `link`
#description
  Changes the button behavior to a link. A link can either be a relative, internal link or an external link.
  ::callout{icon="i-heroicons-light-bulb" to="https://nuxt.com/docs/api/components/nuxt-link" }
  Under the hood, the button uses `NuxtLink` when `link`-prop is set.
  ::
::

::prop-display
---

prop: loading
---
### `loading`
#description
  Displays a loading spinner inside the button.
  ::Component-Interactive
  ---
  props:
    loading: true
  slots:
    default: Button
  ---
  ::
  ::note{icon="i-heroicons-light-bulb" }
  When the button is in loading-state, it ignores clicks and thus does not emit `click`-events. The `grow`-prop is also ignored.
  ::
::

::prop-display
---

prop: rounded
---
### `rounded`
#description
  Adds border-radius to the button.
::

::prop-display
---

prop: shadow
---
### `shadow`
#description
  Adds a shadow to the button.
  ::Component-Interactive
  ---
  props:
    shadow: true
  slots:
    default: Button
  ---
  ::
::

::prop-display
---

prop: target
---
### `target`
#description
  Sets the link-target when the button acts as a link.
  ::callout{icon="i-heroicons-light-bulb" to="/components/button#link" }
  Requires `link` to be set to take effect.
  ::
::

::prop-display
---

prop: transition
---
### `transition`
#description
  Sets the transition setting of the button.
  ::callout{icon="i-heroicons-light-bulb" }
  Takes effect on the `grow`-prop and the color-change on hover.
  ::
::

::prop-display
---

prop: type
---
### `type`
#description
  Sets the type of the button.
::

::prop-display
---

prop: width
---
### `width`
#description
  Sets the width of the button.
::

---

## Slots

::slot-display
### `default`

#description
  Used to set the content of the button.
::