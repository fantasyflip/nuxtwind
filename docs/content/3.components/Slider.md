---
title: Slider
description: Get an input from a range of values.
---

## Usage

::Component-Interactive
---
class: 'w-full'
external:
  - modelValue
ignore:
  - modelValue
  - label
  - description
props:
  modelValue: 30
  label: 'Rating'
  description: 'Rate NuxtWind'
---
::

## Props

::prop-display
---
prop: color
---
### `color`
#description
  Sets the colors of the slider.
  ::callout{icon="i-heroicons-light-bulb" }
  Some color values need to be set using HEX values.
  ::
#defaultValue
```ts
{
  description: "text-zinc-400",
  sliderLine: "bg-zinc-600 dark:bg-zinc-600",
  sliderThumb: "#06b6d4",
  sliderThumbDark: "#06b6d4",
  sliderThumbBorder: "#155e75",
  sliderThumbBorderDark: "#155e75"
}
```
::

::prop-display
---
prop: description
---
### `description`
#description
  Adds a description to the slider.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - label
  props:
    modelValue: 30
    label: 'Rating'
    description: 'Rate NuxtWind'
  ---
  ::
::

::prop-display
---
prop: height
---
### `height`
#description
  Sets the height of the slider.
::

::prop-display
---
prop: label
---
### `label`
#description
  Adds a label to the slider.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - description
  props:
    modelValue: 30
    label: 'Rating'
    description: 'Rate NuxtWind'
  ---
  ::
::

::prop-display
---
prop: max
---
### `max`
#description
  Sets the maximum value of the slider.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - description
  props:
    modelValue: 7
    label: 'Rating'
    description: 'Rate NuxtWind'
    max: 10
  ---
  ::
::

::prop-display
---
prop: min
---
### `min`
#description
  Sets the minimum value of the slider.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - description
  props:
    modelValue: 55
    label: 'Rating'
    description: 'Rate NuxtWind'
    min: 50
  ---
  ::
::

::prop-display
---
prop: rounded
---
### `rounded`
#description
  Sets the border-radius of the slider.
  ::callout{icon="i-heroicons-light-bulb" }
  Only applies on the bar.
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/slider#thumb-size" }
  The `thumb-size`-prop may need to be adjusted if the `rounded`-prop is altered.
  ::
::

::prop-display
---
prop: thumbSize
---
### `thumb-size`
#description
  Sets the size of the slider-thumb in pixels.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - label
    - description
    - thumbSize
  props:
    modelValue: 30
    label: 'Rating'
    description: 'Rate NuxtWind'
    thumbSize: 30
  ---
  ::
::

::prop-display
---
prop: width
---
### `width`
#description
  Sets the width of the slider.
::

## Slots

::slot-display
### `label` (slot)

#description
  Custom label content for the slider.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - description
  props:
    modelValue: 30
    description: 'Rate NuxtWind'
  optionSlots:
    label: 'Rating'
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/slider#label" }
  Overrides the `label`-prop.
  ::
::

::slot-display
### `description` (slot)

#description
  Custom description content for the slider.
  ::Component-Interactive
  ---
  class: 'w-full'
  external:
    - modelValue
  ignore:
    - modelValue
    - label
  props:
    modelValue: 30
    label: 'Rating'
  optionSlots:
    description: 'Rate NuxtWind'
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/slider#description" }
  Overrides the `description`-prop.
  ::
::

