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
prop: border
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
prop: bottom
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
prop: color
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
prop: height
---
### `height`
#description
  Sets the height of the badge.
::

::prop-display
---
prop: left
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
prop: right
---
### `right`
#description
  Positions the badge to the right.
::

::prop-display
---
prop: text
---
### `text`
#description
  Sets the typography settings of the badge content.
::

::prop-display
---
prop: top
---
### `top`
#description
  Positions the badge at the top.
::

::prop-display
---
prop: width
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