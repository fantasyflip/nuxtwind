---
title: Checkboxgroup
description: Easily create a group of checkboxes.
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
  - description
props:
  modelValue: [false, true, true, false, true]
  label: 'Checkboxgroup'
  description: 'This is a group of checkboxes. The returned value is an array of booleans.'
  items:
    - label: 'Option 1'
      description: 'This is a checkbox with customized color.'
      color:
        label: 'text-green-500 dark:text-green-500'
        description: 'text-green-400 dark:text-green-400'
    - label: 'Option 2'
      description: 'This is a checkbox with long text.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. In atque quaerat temporibus aspernatur tempora culpa magni quis necessitatibus ducimus, error dolore, dolorem molestias esse nam amet vitae, maxime possimus sunt.'
    - label: 'Option 3'
      description: 'This is a checkbox with loading state.'
      loading: true
    - label: 'Option 4'
      description: 'This is a disabled checkbox.'
      disabled: true
    - label: 'Option 5'
---
::

## Props

::prop-display
---
name: color
types:
  - object
default:
    label: 'text-primary-500 dark:text-primary-500'
    description: 'text-gray-500 dark:text-gray-400'
required: false
---
### `color`
#description
  Sets the colors of the label and description of the checkboxgroup.
#defaultValue
```ts
{
  label: 'text-primary-500 dark:text-primary-500',
  description: 'text-gray-500 dark:text-gray-400'
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
  Sets the description of the checkboxgroup.
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
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
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
  Disables the checkboxgroup.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - label
    - description
  props:
    disabled: true
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
::

::prop-display
---
name: general-checkbox-props
types:
  - object
default: {}
example:
  color:
    label: 'text-primary-500 dark:text-primary-500'
    description: 'text-gray-500 dark:text-gray-400'
    iconInactive: 'text-gray-500 dark:text-gray-400'
    iconActive: 'text-primary-800 dark:text-primary-800'
    hover: 'hover:text-secondary-700 dark:hover:text-secondary-700'
  text:
    label: 'text-sm'
    description: 'text-xs'
required: false
---
### `general-checkbox-props`
#description
  Sets the general properties of the checkboxes. Takes all the properties of the Checkbox component.
  ::callout{icon="i-heroicons-light-bulb" to="/components/checkbox#props" }
  Read more about possible properties in the `Checkbox` component documentation.
  ::
#defaultValue
```ts
{}
```
#example
```ts
{
  color: {
    label: 'text-primary-500 dark:text-primary-500',
    description: 'text-gray-500 dark:text-gray-400',
    iconInactive: 'text-gray-500 dark:text-gray-400',
    iconActive: 'text-primary-800 dark:text-primary-800',
    hover: 'hover:text-secondary-700 dark:hover:text-secondary-700'
  },
  text: {
    label: 'text-sm',
    description: 'text-xs'
  }
}
```
::

::prop-display
---
name: items
types:
  - array
default: []
example:
  - label: 'Option 1'
    description: 'This is a checkbox with customized color.'
    color:
      label: 'text-green-500 dark:text-green-500'
      description: 'text-green-400 dark:text-green-400'
  - label: 'Option 2'
    description: 'This is a checkbox with loading state.'
    loading: true
  - label: 'Option 3'
    description: 'This is a disabled checkbox.'
    disabled: true
  - label: 'Option 4'
required: true
---
### `items`
#description
  An array of objects that represent the checkboxes in the group.
#defaultValue
```ts
[]
```
#example
```ts
[
  {
    label: 'Option 1',
    description: 'This is a checkbox with customized color.',
    color: {
      label: 'text-green-500 dark:text-green-500',
      description: 'text-green-400 dark:text-green-400'
    }
  },
  {
    label: 'Option 2',
    description: 'This is a checkbox with loading state.',
    loading: true
  },
  {
    label: 'Option 3',
    description: 'This is a disabled checkbox.',
    disabled: true
  },
  {
    label: 'Option 4'
  }
]
```
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
  Sets the label of the checkboxgroup.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
  props:
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
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
  Sets the loading state of the checkboxgroup.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
    - label
  props:
    loading: true
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
::

::prop-display
---
name: multiple
types:
  - boolean
default: false
required: false
---
### `multiple`
#description
  Allows multiple checkboxes to be selected.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
    - label
  props:
    multiple: false
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
::

::prop-display
---
name: no-radio
types:
  - boolean
default: false
required: false
---
### `noRadio`
#description
  Removes the radio button style from the checkbox.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
    - label
    - multiple
  props:
    noRadio: true
    multiple: false
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
::

::prop-display
---
name: not-zero
types:
  - boolean
default: false
required: false
---
### `notZero`
#description
  Requires at least one checkbox to be selected.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
    - label
  props:
    notZero: false
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
::

::prop-display
---
name: text
types:
  - object
default:
    label: 'text-lg font-medium'
    description: 'text-sm'
required: false
---
### `text`
#description
  Sets the typography of the label and description of the checkboxgroup.
#defaultValue
```ts
{
  label: 'text-lg font-medium',
  description: 'text-sm'
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
  Sets the width of the checkboxgroup.
::

## Slots

::slot-display
### `group-label` (slot)

#description
  Custom label content for the checkboxgroup.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
    - label
  optionSlots:
    group-label: Slot-Label
  props:
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/checkboxgroup#label" }
  Overrides the `label`-prop.
  ::
::

::slot-display
### `group-description` (slot)

#description
  Custom description content for the checkboxgroup.
  ::Component-Interactive
  ---
  external:
    - modelValue
    - items
  ignore:
    - modelValue
    - items
    - description
    - label
  optionSlots:
    group-description: This is a custom description slot.
  props:
    modelValue: [false, true, true]
    label: 'Checkboxgroup'
    description: 'This is a group of checkboxes. The returned value is an array of booleans.'
    items:
      - label: Option 1
      - label: Option 2
      - label: Option 3
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/checkboxgroup#description" }
  Overrides the `description`-prop.
  ::
::