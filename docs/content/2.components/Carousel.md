---
title: Carousel
description: Display a series of images or content in a compact design.
---

## Usage

::ExampleCarousel
---
external:
  - items
ignore:
  - items
hide:
  - items
---
::

## Props

::prop-display
---
name: auto-play
types:
  - boolean
default: true
required: false
---
### `auto-play`
#description
  Activates auto-play for the carousel.
  ::ExampleCarousel
  ---
  props:
    auto-play: false
  external:
    - items
  ignore:
    - items
  hide:
    - items
  ---
  ::
::

::prop-display
---
name: disable-auto-play-on-hover
types:
  - boolean
default: true
required: false
---
### `disable-auto-play-on-hover`
#description
  Disables auto-play, if activated, on hover. After hover, auto-play restarts.
  ::ExampleCarousel
  ---
  props:
    disable-auto-play-on-hover: true
  external:
    - items
  ignore:
    - items
  hide:
    - items
  ---
  ::
::

::prop-display
---
name: hide-navigation
types:
  - boolean
default: false
required: false
---
### `hide-navigation`
#description
  Hides the navigation arrows on the sides of the carousel.
  ::ExampleCarousel
  ---
  props:
    hide-navigation: true
  external:
    - items
  ignore:
    - items
  hide:
    - items
  ---
  ::
::

::prop-display
---
name: hide-pagination
types:
  - boolean
default: false
required: false
---
### `hide-pagination`
#description
  Hides the pagination dots at the bottom of the carousel.
  ::ExampleCarousel
  ---
  props:
    hide-pagination: true
  external:
    - items
  ignore:
    - items
  hide:
    - items
  ---
  ::
::

::prop-display
---
name: shadow
types:
  - string
  - boolean
default: shadow-xl
required: false
---
### `shadow`
#description
  Adds a shadow to the carousel.
::

::prop-display
---
name: timeout
types:
  - number
default: 5
required: false
---
### `timeout`
#description
  The time in seconds between each slide.
  ::ExampleCarousel
  ---
  props:
    timeout: 3
  external:
    - items
  ignore:
    - items
  hide:
    - items
  ---
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
    delay: 'delay-300'
    ease: 'ease-in-out'
required: false
---
### `transition`
#description
  The transition effect for displaying navigation arrows and pagination dots.

#defaultValue
```ts
{
  duration: 'duration-300',
  delay: 'delay-300',
  ease: 'ease-in-out'
}
```
::

---

## Slots

::slot-display
### `default`

#description
  Used to set the `NXW-CarouselItem` components. The `NXW-CarouselItem` then can be filled with custom content.
  ::callout{icon="i-heroicons-light-bulb"}
  The `NXW-CarouselItem` components need to be direct children of the `NXW-Carousel` component.
  ::
::