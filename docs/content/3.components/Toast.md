---
title: Toast
description: Easily display a notification to the user.
---

## Usage

::Component-Interactive
---
props:
  autoClose: false
  message: NuxtWind is awesome!
  title: NuxtWind is Nuxt 4 ready!
ignore:
  - autoClose
  - message
  - title
---
::

## Props

::prop-display
---
prop: autoClose
---
### `auto-close`
#description
  Activates automatic closing of the toast after a given duration.
  ::Component-Interactive
  ---
  props:
    autoClose: false
    message: NuxtWind is awesome!
    title: NuxtWind is Nuxt 4 ready!
  ignore:
    - message
    - title
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/toast#duration" }
  The duration can be set using the `duration`-prop.
  ::
::

::prop-display
---
prop: color
---
### `color`
#description
  Sets the toast's colors
  ::callout{icon="i-heroicons-light-bulb" to="/components/progress#color" }
  The `progress`-property takes any input of the original `color`-prop of the `Progress`-component.
  ::
#defaultValue
```ts
{
  progress: {},
  text: "text-gray-700 dark:text-gray-300",
  bg: "bg-gray-100 dark:bg-zinc-800",
  icon: {
    info: {
      text: "text-blue-500 dark:text-blue-200",
      bg: "bg-blue-200 dark:bg-blue-800"
    },
    warning: {
      text: "text-yellow-500 dark:text-yellow-200",
      bg: "bg-yellow-200 dark:bg-yellow-800"
    },
    error: {
      text: "text-red-500 dark:text-red-200",
      bg: "bg-red-200 dark:bg-red-800"
    },
    success: {
      text: "text-green-500 dark:text-green-200",
      bg: "bg-green-200 dark:bg-green-800"
    }
  }
}
```
::

::prop-display
---
prop: duration
---
### `duration`
#description
  Sets the duration in seconds until the toast closes automatically.
  ::Component-Interactive
  ---
  props:
    autoClose: false
    duration: 5
    message: NuxtWind is awesome!
    title: NuxtWind is Nuxt 4 ready!
  ignore:
    - message
    - title
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/toast#auto-close" }
  Only works if `auto-close` is set to `true`.
  ::
::

::prop-display
---
prop: id
---
### `id`
#description
  Sets the id of the toast.
  ::callout{icon="i-heroicons-light-bulb" }
  The id must be unique.
  ::
::

::prop-display
---
prop: message
---
### `message`
#description
  Sets the message of the toast.
  ::Component-Interactive
  ---
  props:
    autoClose: false
    message: NuxtWind is awesome!
    title: NuxtWind is Nuxt 4 ready!
  ignore:
    - title
    - autoClose
  ---
  ::
::

::prop-display
---
prop: rounded
---
### `rounded`
#description
  Applies border-radius to the toast.
::

::prop-display
---
prop: shadow
---
### `shadow`
#description
  Applies a shadow to the toast.
::

::prop-display
---
prop: title
---
### `title`
#description
  Sets the title of the toast.
  ::Component-Interactive
  ---
  props:
    autoClose: false
    message: NuxtWind is awesome!
    title: NuxtWind is Nuxt 4 ready!
  ignore:
    - message
    - autoClose
  ---
  ::
::

::prop-display
---
prop: type
---
### `type`
#description
  Sets the type of the toast.
  ::Component-Interactive
  ---
  props:
    autoClose: false
    message: NuxtWind is awesome!
    title: NuxtWind is Nuxt 4 ready!
    type: info
  ignore:
    - message
    - title
    - autoClose
  selectOptions:
    type:
      - value: info
        label: Info
      - value: success
        label: Success
      - value: warning
        label: Warning
      - value: error
        label: Error
  ---
  ::
::

::prop-display
---
prop: width
---
### `width`
#description
  Sets the width of the toast.
::

