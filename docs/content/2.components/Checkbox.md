---
title: Checkbox
description: Quickly tick off your options.
---

## Usage

::Component-Interactive
---
props:
  modelValue: true
  label: 'Install NuxtWind'
  description: 'pnpm i @nuxtwind/components'
ignore:
  - label
  - description
---
::

## Props

::prop-display
---
name: color
types:
  - object
default:
    label: 'text-black dark:text-gray-300'
    description: 'text-gray-500 dark:text-gray-400'
    iconInactive: 'text-gray-500 dark:text-gray-400'
    iconActive: 'text-primary-800 dark:text-primary-800'
    hover: 'hover:text-secondary-700 dark:hover:text-secondary-700'
required: false
---
### `color`
#description
  Sets the colors of the checkbox and its properties.

#defaultValue
```ts
{
  label: 'text-black dark:text-gray-300',
  description: 'text-gray-500 dark:text-gray-400',
  iconInactive: 'text-gray-500 dark:text-gray-400',
  iconActive: 'text-primary-800 dark:text-primary-800',
  hover: 'hover:text-secondary-700 dark:hover:text-secondary-700'
}
```
::

::prop-display
---
name: description
types:
  - string
default: '"" (empty string)'
required: false
---
### `description`
#description
  Descriptional content for the checkbox label
  ::Component-Interactive
  ---
  props:
    modelValue: true
    label: 'Install NuxtWind'
    description: 'pnpm i @nuxtwind/components'
  ignore:
    - label
  ---
  ::
  ::warning{icon="i-heroicons-light-bulb" to="/components/checkbox#label" }
  The description will only be displayed if the checkbox has the `label`-prop set.
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
  Disables the checkbox.
  ::Component-Interactive
  ---
  props:
    modelValue: true
    label: 'Install NuxtWind'
    description: 'pnpm i @nuxtwind/components'
    disabled: true
  ignore:
    - label
    - description
  ---
  ::
::

::prop-display
---
name: label
types:
  - string
default: '"" (empty string)'
required: false
---
### `label`
#description
  Label content for the checkbox.
  ::Component-Interactive
  ---
  props:
    modelValue: true
    label: 'Install NuxtWind'
    description: 'pnpm i @nuxtwind/components'
  ignore:
    - description
  ---
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
  Visually changes the checkbox to a loading state.
  ::Component-Interactive
  ---
  props:
    modelValue: true
    label: 'Install NuxtWind'
    description: 'pnpm i @nuxtwind/components'
    loading: true
  ignore:
    - label
    - description
  ---
  ::
::

::prop-display
---
name: radio
types:
  - boolean
default: false
required: false
---
### `radio`
#description
  Changes the checkbox to a radio button.
  ::Component-Interactive
  ---
  props:
    modelValue: true
    label: 'Install NuxtWind'
    description: 'pnpm i @nuxtwind/components'
    radio: true
  ignore:
    - label
    - description
  ---
  ::
::

::prop-display
---
name: text
types:
  - object
default:
    label: 'text-sm font-medium'
    description: 'text-xs font-normal'
required: false
---
### `text`
#description
  Typography settings for label and description.
#defaultValue
```ts
{
  label: 'text-sm font-medium',
  description: 'text-xs font-normal'
}
```
::


## Slots

::slot-display
### `label` (slot)

#description
  Custom label content for the checkbox.
  ::Component-Interactive
  ---
  props:
    modelValue: true
  optionSlots:
    label: Install NuxtWind
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/checkbox#label" }
  Overrides the `label`-prop.
  ::
::

::slot-display
### `description` (slot)

#description
  Custom description content for the checkbox.
  ::Component-Interactive
  ---
  props:
    modelValue: true
    label: Install NuxtWind
  ignore:
    - label
  optionSlots:
    description: pnpm i @nuxtwind/components
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/checkbox#description" }
  Overrides the `description`-prop.
  ::
  ::warning{icon="i-heroicons-light-bulb" to="/components/checkbox#label" }
  Just as the corresponding prop, the description slot will also only be displayed if the checkbox has the `label`-prop set or some content in the `label` slot.
  ::
::