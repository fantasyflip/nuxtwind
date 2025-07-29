---
title: Textarea
description: Handle multi-line text inputs.
---

## Usage

::Component-Interactive
---
class: 'pb-8'
props:
  label: Message
  placeholder: Type your message here
  modelValue: ''
external:
  - modelValue
ignore:
  - modelValue
  - label
  - placeholder
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
name: autocomplete
types:
  - string
default: 'on'
required: false
---
### `autocomplete`
#description
  Sets the autocomplete attribute on the input.
  ::callout{icon="i-heroicons-light-bulb" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#autocomplete" }
  Read more about the `autocomplete` attribute on MDN.
  ::
::

::prop-display
---
name: color
types:
  - object
default:
    bg: "bg-gray-200 dark:bg-zinc-800"
    text: "text-black dark:text-white"
    hint: "text-gray-600 dark:text-gray-400"
    error: "text-red-500 dark:text-red-500"
    label: "text-black dark:text-white"
    labelFocus: "peer-focus:text-primary-600"
    placeholderText: "placeholder:text-gray-400 dark:placeholder:text-gray-600"
    icon: "text-black dark:text-white"
    iconFocus: "group-focus-within:text-primary-600"
    border: "border-black dark:border-white"
    borderFocus:
      "focus:border-primary-800 dark:focus:border-primary-800 focus-within:border-primary-800 dark:focus-within:border-primary-800"
    borderError: "border-red-500"
    borderFocusError: "focus:border-red-500"
required: false
---
### `color`
#description
  Sets the textarea's colors
#defaultValue
```ts
{
  bg: "bg-gray-200 dark:bg-zinc-800",
  text: "text-black dark:text-white",
  hint: "text-gray-600 dark:text-gray-400",
  error: "text-red-500 dark:text-red-500",
  label: "text-black dark:text-white",
  labelFocus: "peer-focus:text-primary-600",
  placeholderText: "placeholder:text-gray-400 dark:placeholder:text-gray-600",
  icon: "text-black dark:text-white",
  iconFocus: "group-focus-within:text-primary-600",
  border: "border-black dark:border-white",
  borderFocus:
    "focus:border-primary-800 dark:focus:border-primary-800 focus-within:border-primary-800 dark:focus-within:border-primary-800",
  borderError: "border-red-500",
  borderFocusError: "focus:border-red-500"
}
```
::

::prop-display
---
name: counter
types:
  - boolean
default: false
required: false
---
### `counter`
#description
  Adds a character counter to the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
    counter: true
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - placeholder
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
  Disables the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
    disabled: true
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - placeholder
  ---
  ::
::

::prop-display
---
name: filled
types:
  - boolean
  - string
default: true
example: 'border-b-2'
required: false
---
### `filled`
#description
  Applies a filled style to the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
    filled: true
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - placeholder
  ---
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
---
### `font`
#description
  Sets the font sizes of the textarea-components.
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
default: 'min-h-[40px]'
required: false
---
### `height`
#description
  Sets the height of the textarea.
::

::prop-display
---
name: hint
types:
  - string
default: '"" (empty string)'
required: false
---
### `hint`
#description
  Adds a hint to the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
    hint: Should be something useful
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - placeholder
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
  Adds a label to the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
  external:
    - modelValue
  ignore:
    - modelValue
    - placeholder
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
  Sets the loading state of the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
    loading: true
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - placeholder
  ---
  ::
::

::prop-display
---
name: outlined
types:
  - boolean
  - string
default: false
required: false
---
### `outlined`
#description
  Applies a outlined style to the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
    outlined: true
    color:
      bg: 'bg-white dark:bg-slate-900'
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - placeholder
    - color
  hide:
    - color
  ---
  ::
::

::prop-display
---
name: placeholder
types:
  - string
default: '"" (empty string)'
required: false
---
### `placeholder`
#description
  Adds a placeholder to the textarea.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    label: Message
    placeholder: Type your message here
    modelValue: ''
  external:
    - modelValue
  ignore:
    - modelValue
    - label
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
name: rounded
types:
  - boolean
  - string
default: true
example: 'rounded-lg'
required: false
---
### `rounded`
#description
  Applies border-radius to the textarea.
::

::prop-display
---
name: shadow
types:
  - boolean
  - string
default: true
example: 'shadow-lg'
required: false
---
### `shadow`
#description
  Applies a shadow to the textarea.
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
  Applies transition styles to the textarea.
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
  - string
default: 'w-full'
required: false
---
### `width`
#description
  Sets the width of the textarea.
::

## Slots

::slot-display
### `append-icon` (slot)

#description
  Custom content for appending an icon to the right side of the input.
::

::slot-display
### `label` (slot)

#description
  Custom content for the label.
  ::Component-Interactive
  ---
  class: 'pb-8'
  props:
    placeholder: Type your message here
    modelValue: ''
  external:
    - modelValue
  ignore:
    - modelValue
    - placeholder
  optionSlots:
    label: 'Message'
  ---
  ::
::

::slot-display
### `prepend-icon` (slot)

#description
  Custom content for prepending an icon to the left side of the input.
::