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
name: ari-label
types:
  - string
  - undefined
default: undefined
required: false
---
### `ari-label`
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
name: color
types:
  - object
required: false
---
### `color`
#description
  Sets the colors of the button.

#defaultValue
```ts
{
  bg: 'bg-primary-900 dark:bg-primary-900',
  text: 'dark:text-white text-black',
  border: 'dark:border-white border-black',
  hover: 'hover:bg-secondary-800 dark:hover:bg-secondary-800',
  iconHover: 'hover:text-secondary-800 dark:hover:text-secondary-800',
  loadingCircle: '#27272a',
  loadingCircleDark: '#27272a',
  loadingCircleProgress: '#10b981',
  loadingCircleProgressDark: '#10b981',
  loadingCircleCutout: 'before:bg-primary-900 dark:before:bg-primary-900'
}
```

::



::prop-display
---
name: dense
types:
  - boolean
default: false
required: false
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
name: disabled
types:
  - boolean
default: false
required: false
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
name: grow
types:
  - object
  - boolean
default:
    delay: 'delay-10'
    scale: 'hover:scale-105'
required: false
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
name: height
types:
  - string
default: '"" (empty string)'
required: false
---
### `height`
#description
  Sets the height of the button.
::

::prop-display
---
name: icon
types:
  - boolean
default: false
required: false
---
### `icon`
#description
  Changes the button styling to an icon button. The background color is removed and the width fits the content.
::

::prop-display
---
name: link
types:
  - string
  - undefined
default: undefined
required: false
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
name: loading
types:
  - boolean
default: false
required: false
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
name: rounded
types:
  - boolean
  - string
default: 'rounded-md'
required: false
---
### `rounded`
#description
  Adds border-radius to the button.
::

::prop-display
---
name: shadow
types:
  - boolean
  - string
default: 'shadow-md'
required: false
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
name: target
types:
  - string
default: '_self'
required: false
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
name: transition
types:
  - object
  - boolean
default:
    duration: 'duration-300'
    ease: 'ease-in-out'
required: false
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
name: type
types:
  - button
  - submit
  - reset
default: button
required: false
---
### `type`
#description
  Sets the type of the button.
::

::prop-display
---
name: width
types:
  - string
default: w-fit
required: false
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