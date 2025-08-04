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
  - modelValue
hide:
  - items
---
::

## Props

::prop-display
---
prop: autoPlay
---
### `autoPlay`
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
    - modelValue
  hide:
    - items
  ---
  ::
::

::prop-display
---
prop: disableAutoPlayOnHover
---
### `disableAutoPlayOnHover`
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
    - modelValue
  hide:
    - items
  ---
  ::
::

::prop-display
---
prop: hideNavigation
---
### `hideNavigation`
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
    - modelValue
  hide:
    - items
  ---
  ::
::

::prop-display
---
prop: hidePagination
---
### `hidePagination`
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
    - modelValue
  hide:
    - items
  ---
  ::
::

::prop-display
---
prop: shadow
---
### `shadow`
#description
  Adds a shadow to the carousel.
::

::prop-display
---
prop: timeout
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
    - modelValue
  hide:
    - items
  ---
  ::
::

::prop-display
---
prop: transition
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