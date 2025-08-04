---
title: Badge
description: Draw attention to important information.
---

## Usage

::Component-Interactive
---
slotComponentSlug: Button
slots:
  default: |
    
    <NXW-Button>Button</NXW-Button>
  badge-content: 20
---
::

## Props

::prop-display
---
name: border
types:
  - boolean
default: true
required: false
---
### `border`
#description
  Adds a border to the badge.
  ::Component-Interactive
  ---
  slotComponentSlug: Button
  props:
    border: true
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    badge-content: 20
  ---
  ::
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
  Positions the badge at the bottom.
  ::Component-Interactive
  ---
  slotComponentSlug: Button
  props:
    bottom: true
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    badge-content: 20
  ---
  ::
::

::prop-display
---
name: color
types:
  - object
default:
    bg: 'bg-red-500 dark:bg-red-500'
    border: 'border-white dark:border-zinc-900'
    text: 'text-white dark:text-white'
required: false
---
### `color`
#description
  Sets the colors of the badge.
#defaultValue
```ts
{
  bg: 'bg-red-500 dark:bg-red-500',
  border: 'border-white dark:border-zinc-900',
  text: 'text-white dark:text-white'
}
```
::

::prop-display
---
name: height
types:
  - string
default: 'min-h-[24px]'
required: false
---
### `height`
#description
  Sets the height of the badge.
::

::prop-display
---
name: left
types:
  - boolean
default: false
required: false
---
### `left`
#description
  Positions the badge to the left.
  ::Component-Interactive
  ---
  slotComponentSlug: Button
  props:
    left: true
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    badge-content: 20
  ---
  ::
::

::prop-display
---
name: right
types:
  - boolean
default: true
required: false
---
### `right`
#description
  Positions the badge to the right.
::

::prop-display
---
name: text
types:
  - string
default: 'text-xs font-bold'
required: false
---
### `text`
#description
  Sets the typography settings of the badge content.
::

::prop-display
---
name: top
types:
  - boolean
default: true
required: false
---
### `top`
#description
  Positions the badge at the top.
::

::prop-display
---
name: width
types:
  - string
default: 'min-w-[24px]'
required: false
---
### `width`
#description
  Sets the width of the badge.
::

---

## Slots

::slot-display
### `default`

#description
  The default slot is used to place the content on which the badge will be applied.
::

::slot-display
### `badge-content`
::Component-Interactive
---
slotComponentSlug: Button
slots:
  default: |
    
    <NXW-Button>Button</NXW-Button>
optionSlots:
  badge-content: 20
---
::

#description
  Sets the content of the badge.
::