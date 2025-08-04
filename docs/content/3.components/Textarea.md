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
prop: appendIcon
---
### `appendIcon`
#description
  Appends the provided icon to the right side of the input.
  ::callout{icon="i-heroicons-light-bulb" to="https://vuejs.org/api/reactivity-advanced.html#markraw" }
  Providing a component it should be wrapped in `markRaw()`.
  ::
::

::prop-display
---
prop: autocomplete
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
prop: color
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
prop: counter
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
prop: disabled
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
prop: filled
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
prop: font
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
prop: height
---
### `height`
#description
  Sets the height of the textarea.
::

::prop-display
---
prop: hint
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
prop: label
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
prop: loading
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
prop: outlined
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
prop: placeholder
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
prop: prependIcon
---
### `prependIcon`
#description
  Prepends the provided icon to the left side of the input.
  ::callout{icon="i-heroicons-light-bulb" to="https://vuejs.org/api/reactivity-advanced.html#markraw" }
  Providing a component it should be wrapped in `markRaw()`.
  ::
::

::prop-display
---
prop: rounded
---
### `rounded`
#description
  Applies border-radius to the textarea.
::

::prop-display
---
prop: shadow
---
### `shadow`
#description
  Applies a shadow to the textarea.
::

::prop-display
---
prop: transition
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
prop: width
---
### `width`
#description
  Sets the width of the textarea.
::

---

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