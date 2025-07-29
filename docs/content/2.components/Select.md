---
title: Select
description: Quickly choose from a list of options.
---

## Usage

::Component-Interactive
---
external:
  - modelValue
  - items
ignore:
  - modelValue
  - items
  - label
  - placeholder
props:
  modelValue: ''
  items:
    - Vue
    - React
    - Angular
  label: 'Framework'
  placeholder: 'Select a framework'
---
::

## Props

::prop-display
---
name: append-icon
types:
  - object
  - boolean
default: false
required: false
---
### `append-icon`
#description
  Appends the provided icon to the right side of the input.
  ::callout{icon="i-heroicons-light-bulb" to="https://vuejs.org/api/reactivity-advanced.html#markraw" }
  Providing a component it should be wrapped in `markRaw()`.
  ::
::

::prop-display
---
name: clearable
types:
  - boolean
default: false
required: false
---
### `clearable`
#description
  Adds a clear button when the input is not empty.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    clearable: true
  ---
  ::
  ::warning{icon="i-heroicons-light-bulb" to="/components/select#search" }
  The `clearable`-property only takes effect if the `search`-property is set.
  ::
::

::prop-display
---
name: color
types:
  - object
default:
    textfield: {}
    bg: "bg-gray-200 dark:bg-zinc-800"
    text: "text-black dark:text-white"
    border: "border-gray-300 dark:border-zinc-700"
    hover: "hover:bg-primary-700"
required: false
---
### `color`
#description
  Sets the select's colors
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#color" }
  The `textfield`-property takes any input of the original `color`-prop of the `Textfield`-component.
  ::
#defaultValue
```ts
{
  textfield: {},
  bg: "bg-gray-200 dark:bg-zinc-800",
  text: "text-black dark:text-white",
  border: "border-gray-300 dark:border-zinc-700",
  hover: "hover:bg-primary-700"
}
```
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
  Disables the select.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    disabled: true
  ---
  ::
::

::prop-display
---
name: filled
types:
  - boolean
  - string
default: false
example: 'border-b-2'
required: false
---
### `filled`
#description
  Applies a filled style to the select.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    filled: true
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#filled" }
  The `filled`-property takes any input of the original `filled`-prop of the `Textfield`-component.
  ::
::

::prop-display
---
name: font
types:
  - object
default:
    label: "text-sm"
    input: "text-sm"
    hint: "text-xs"
required: false
---
### `font`
#description
  Sets the font sizes of the select-components.
#defaultValue
```ts
{
  label: "text-sm",
  input: "text-sm",
  hint: "text-xs"
}
```
::

::prop-display
---
name: height
types:
  - string
default: 'max-h-48'
required: false
---
### `height`
#description
  Sets the (maximum) height of the dropdown.
::

::prop-display
---
name: items
types:
  - array
default: []
example:
    - Vue
    - React
    - Angular
required: true
---
### `items`
#description
  Sets the available items of the select. Can either be an array of strings/numbers or an array of objects.
  ::callout{icon="i-heroicons-light-bulb" to="/components/select#display-property" }
  If the items are objects, you must specify a `display-property`.
  ::
::

::prop-display
---
name: label
types:
  - string
default: ''
required: false
---
### `label`
#description
  Sets the label of the select.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
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
  Sets the select to a loading state.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    loading: true
  ---
  ::
::

::prop-display
---
name: mark-on-focus
types:
  - boolean
default: false
required: false
---
### `mark-on-focus`
#description
  Marks the selected input on focus.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    search: true
    mark-on-focus: true
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/select#search" }
  Only applies if the `search`-property is set.
  ::
::

::prop-display
---
name: outlined
types:
  - boolean
  - string
default: false
example: 'border'
required: false
---
### `outlined`
#description
  Applies a outlined style to the select.
  ::Component-Interactive
  ---
  hide:
    - color
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    outlined: true
    color:
      textfield:
        bg: 'bg-white dark:bg-slate-900'
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#outlined" }
  The `outlined`-property takes any input of the original `outlined`-prop of the `Textfield`-component.
  ::
::

::prop-display
---
name: placeholder
types:
  - string
default: ''
required: false
---
### `placeholder`
#description
  Sets the placeholder of the select.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
  ---
  ::
::

::prop-display
---
name: prepend-icon
types:
  - object
  - boolean
default: false
required: false
---
### `prepend-icon`
#description
  Prepends the provided icon to the left side of the input.
  ::callout{icon="i-heroicons-light-bulb" to="https://vuejs.org/api/reactivity-advanced.html#markraw" }
  Providing a component it should be wrapped in `markRaw()`.
  ::
::

::prop-display
---
name: search
types:
  - boolean
default: false
required: false
---
### `search`
#description
  Makes the textfield usable as a search input and filters the provided items accordingly.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    search: true
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/select#display-property" }
  If the items are objects, you must specify a `display-property`. The search will be performed on this property.
  ::
::

::prop-display
---
name: shadow
types:
  - boolean
  - string
default: false
example: 'shadow-lg'
required: false
---
### `shadow`
#description
  Sets the shadow of the dropdown.
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#shadow" }
  The `shadow`-property takes any input of the original `shadow`-prop of the `Textfield`-component.
  ::
::

::prop-display
---
name: show-all-on-focus
types:
  - boolean
default: false
required: false
---
### `show-all-on-focus`
#description
  Shows all items on focus regardless of the search input or selected item.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    label: 'Framework'
    placeholder: 'Select a framework'
    show-all-on-focus: true
    search: true
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/select#search" }
  Only applies if the `search`-property is set.
  ::
::

::prop-display
---
name: transition
types:
  - boolean
  - object
default: true
example:
    duration: "duration-300"
    ease: "ease-in-out"
    placeholder: 
      duration: "placeholder:duration-500"
      ease: "placeholder:ease-in-out"
required: false
---
### `transition`
#description
  Sets the transition properties of the select.
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#transition" }
  The `transition`-property takes any input of the original `transition`-prop of the `Textfield`-component.
  ::
#example
```ts
{
  duration: "duration-300",
  ease: "ease-in-out",
  placeholder: {
    duration: "placeholder:duration-500",
    ease: "placeholder:ease-in-out"
  }
}
```
::

::prop-display
---
name: width
types:
  - object
default:
    textfield: "w-full"
    select: "w-full"
required: false
---
### `width`
#description
  Sets the width of the select.
#defaultValue
```ts
{
  textfield: "w-full",
  select: "w-full"
}
```
::

::prop-display
---
name: display-property
types:
  - string
default: undefined
required: false
---
### `display-property`
#description
  Determines which property of the items should be displayed in the dropdown when the items are objects.
  V-Model will still return the whole object.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - placeholder
  props:
    modelValue: ''
    items:
      - name: Vue
        value: 'vue'
        stars: 1234
      - name: React
        value: 'react'
        stars: 5678
      - name: Angular
        value: 'angular'
        stars: 91011
    label: 'Framework'
    placeholder: 'Select a framework'
    display-property: 'name'
  selectOptions:
    display-property:
      - value: name
        label: 'Name'
      - value: value
        label: 'Value'
      - value: stars
        label: 'Stars'
  ---
  ::
::

## Slots

::slot-display
### `append-icon` (slot)

#description
  Custom content for appending an icon to the right side of the input.
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#append-icon-slot" }
  Redirects to the `append-icon`-slot of the `Textfield`-component.
  ::
::

::slot-display
### `item`

#description
  Customizes the appearance of the items in the dropdown.
::

::slot-display
### `label` (slot)

#description
  Custom content for the label.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - placeholder
  props:
    modelValue: ''
    items:
      - Vue
      - React
      - Angular
    placeholder: 'Select a framework'
  optionSlots:
    label: 'Custom Label'
  ---
::

::slot-display
### `prepend-icon` (slot)

#description
  Custom content for prepending an icon to the left side of the input.
  ::callout{icon="i-heroicons-light-bulb" to="/components/textfield#prepend-icon-slot" }
  Redirects to the `prepend-icon`-slot of the `Textfield`-component.
  ::
::
