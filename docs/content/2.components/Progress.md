---
title: Progress
description: Display the progression of a task beautifully.
---

## Usage

::Component-Interactive
---
external:
  - modelValue
props:
  modelValue: 33
---
::

## Props

::prop-display
---
name: circular
types:
  - boolean
  - object
default: false
example:
  size: 'size-20'
  cutout:
    size: 'before:size-[84%]'
    text: 'before:text-[70%]'
required: false
---
### `circular`
#description
  Changes the component from a bar to a circular style. The circular style can be adjusted by passing an object.
  ::Component-Interactive
  ---
  external:
    - modelValue
  hide:
    - color
  ignore:
    - color
  props:
    modelValue: 33
    circular: true
    color:
      circleCutout: 'before:bg-white dark:before:bg-slate-900'
  ---
  ::
#example
```ts
{
  size: 'size-20',
  cutout: {
    size: 'before:size-[84%]',
    text: 'before:text-[70%]'
  }
}
```
::

::prop-display
---
name: color
types:
  - object
default:
  circle: "#e5e7eb"
  circleDark: "#27272a"
  circleProgress: "#00C16A"
  circleProgressDark: "#00C16A"
  circleCutout: "before:bg-white dark:before:bg-zinc-900"
  background: "bg-gray-200 dark:bg-zinc-800"
  firstStrike: "before:bg-primary-500"
  secondStrike: "after:bg-primary-600"
  linearProgress: "bg-primary-500"
  linearProgressHover: "hover:bg-secondary-500"
required: false
---
### `color`
#description
  Sets the colors of the progress component.
  ::callout{icon="i-heroicons-light-bulb" to="/components/progress#circular" }
  If the `circular`-prop is set some colors must be provided as HEX values.
  ::
#defaultValue
```ts
{
  circle: "#e5e7eb",
  circleDark: "#27272a",
  circleProgress: "#00C16A",
  circleProgressDark: "#00C16A",
  circleCutout: "before:bg-white dark:before:bg-zinc-900",
  background: "bg-gray-200 dark:bg-zinc-800",
  firstStrike: "before:bg-primary-500",
  secondStrike: "after:bg-primary-600",
  linearProgress: "bg-primary-500",
  linearProgressHover: "hover:bg-secondary-500"
}
```
::

::prop-display
---
name: initial-load-time
types:
  - number
  - boolean
default: 100
required: false
---
### `initial-load-time`
#description
  Depends on the component style. In the regular bar style it sets the time in milliseconds between mounting the component and displaying its initial value.
  In the circular style it sets the time in milliseconds the component needs to reach the provided value.
::

::prop-display
---
name: initial-load-time-type
types:
  - string
default: 'calc'
required: false
---
### `initial-load-time-type`
#description
  Sets the easing function for reaching the provided value. If set to 'calc' each move will have the same speed.
  If set to 'static' each move will take the same amount of time.
  ::Component-Interactive
  ---
  external:
    - modelValue
  hide:
    - color
  ignore:
    - color
    - circular
  props:
    initialLoadTimeType: 'static'
    modelValue: 33
    circular: true
    color:
      circleCutout: 'before:bg-white dark:before:bg-slate-900'
  ---
  ::
  ::callout{icon="i-heroicons-light-bulb" to="/components/progress#circular" }
  Only applies if the `circular`-prop is set.
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
  Sets the component to a loading state.
  ::Component-Interactive
  ---
  external:
    - modelValue
  hide:
    - color
  ignore:
    - color
  props:
    loading: true
    modelValue: 33
    circular: true
    color:
      circleCutout: 'before:bg-white dark:before:bg-slate-900'
  ---
  ::
::

::prop-display
---
name: rounded
types:
  - string
  - boolean
default: 'rounded-lg'
required: false
---
### `rounded`
#description
  Sets the border-radius of the component.
  ::callout{icon="i-heroicons-light-bulb" }
  Only applies on the bar style.
  ::
::

::prop-display
---
name: size
types:
  - object
default:
  width: 'w-full'
  height: 'h-1'
required: false
---
### `size`
#description
  Sets the size of the component.
  ::callout{icon="i-heroicons-light-bulb" }
  Only applies on the bar style.
  ::
#defaultValue
```ts
{
  width: 'w-full',
  height: 'h-1'
}
```
::

::prop-display
---
name: transition
types:
  - object
  - boolean
default:
  duration: "duration-500"
  ease: "ease-in-out"
required: false
---
### `transition`
#description
  Sets the transition of the component.
  ::callout{icon="i-heroicons-light-bulb" }
  Only applies on the bar style.
  ::
#defaultValue
```ts
{
  duration: "duration-500",
  ease: "ease-in-out"
}
```
::

## Slots

::slot-display
### `inner-circle`

#description
  Custom content for the inner circle cutout.
  ::callout{icon="i-heroicons-light-bulb" to="/components/progress#circular" }
  Only applies if the `circular`-prop is set.
  ::
::