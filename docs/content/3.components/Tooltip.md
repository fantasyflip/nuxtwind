---
title: Tooltip
description: Show information when hovering over an element.
---

## Usage

::Component-Interactive
---
slotComponentSlug: Button
slots:
  default: |
    
    <NXW-Button>Button</NXW-Button>
  tooltip: Click me!
---
::

## Props

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
  Sets the tooltip to appear at the bottom of the element.
  ::Component-Interactive
  ---
  props:
    bottom: true
  slotComponentSlug: Button
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    tooltip: Click me!
  ---
  ::
::

::prop-display
---
name: color
types:
  - object
default:
    text: "dark:text-white text-black"
    bg: "bg-primary-800"
    bgPointer: "bg-primary-800"
required: false
---
### `color`
#description
  Sets the color of the tooltip.
#defaultValue
```ts
{
  text: "dark:text-white text-black",
  bg: "bg-primary-800",
  bgPointer: "bg-primary-800"
}
```
::

::prop-display
---
name: interactive
types:
  - boolean
default: false
required: false
---
### `interactive`
#description
  Makes the tooltip itself hoverable.
  ::Component-Interactive
  ---
  props:
    interactive: true
  slotComponentSlug: Button
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    tooltip: Click me!
  ---
  ::
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
  Sets the tooltip to appear at the left of the element.
  ::Component-Interactive
  ---
  props:
    left: true
  slotComponentSlug: Button
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    tooltip: Click me!
  ---
  ::
::

::prop-display
---
name: right
types:
  - boolean
default: false
required: false
---
### `right`
#description
  Sets the tooltip to appear at the right of the element.
  ::Component-Interactive
  ---
  props:
    right: true
  slotComponentSlug: Button
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    tooltip: Click me!
  ---
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
  Applies border-radius to the tooltip.
::

::prop-display
---
name: text
types:
  - string
default: 'text-xs text-center'
required: false
---
### `text`
#description
  Sets the typography of the tooltip.
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
  Sets the tooltip to appear at the top of the element.
  ::Component-Interactive
  ---
  props:
    top: true
  slotComponentSlug: Button
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
    tooltip: Click me!
  ---
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
required: false
---
### `transition`
#description
  Sets the transition-properties of the tooltip.
#example
```ts
{
  duration: "duration-300",
  ease: "ease-in-out"
}
```
::

::prop-display
---
name: width
types:
  - string
default: 'w-max'
required: false
---
### `width`
#description
  Sets the width of the tooltip.
::

::prop-display
---
name: z-index
types:
  - string
default: 'z-10'
required: false
---
### `z-index`
#description
  Sets the z-index of the tooltip.
::

## Slots

::slot-display
### `default`

#description
  Default content for the elment that will trigger the tooltip.
::

::slot-display
### `tooltip`

#description
  Content for the tooltip itself.
  ::Component-Interactive
  ---
  slotComponentSlug: Button
  slots:
    default: |
      
      <NXW-Button>Button</NXW-Button>
  optionSlots:
    tooltip: Click me!
  ---
  ::
::