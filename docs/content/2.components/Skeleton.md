---
title: Skeleton
description: Prevent layout shift by showing a placeholder while content is loading.
---

## Usage

::Component-Interactive
---
class: ' w-full'
external:
 - loading
ignore:
  - loading
  - tag
props:
  loading: true
  tag: article
slots:
  default: <!-- Your Content here -->
---
::

## Props

::prop-display
---
name: animation-class
types:
  - string
default: "animate-pulse"
required: false
---
### `animation-class`
#description
  Sets the animation class for the skeleton.
::

::prop-display
---
name: auto-detect-root-tag
types:
  - boolean
default: true
required: false
---
### `auto-detect-root-tag`
#description
  Auto detects the child element in the skeleton's root slot and sets the tag accordingly. Detectable tags are 'p', 'article' and 'img'.
  ::callout{icon="i-heroicons-light-bulb" to="/component/skeleton#tag" }
  This only works on the client side. To make it SSR-Safe set a tag with the `tag`-prop.
  ::
  ::callout{icon="i-heroicons-light-bulb"  }
  To apply the `card`-tag this prop must be disabled since it is not a detectable native HTML tag.
  ::
::

::prop-display
---
name: loading
types:
  - boolean
default: true
required: false
---
### `loading`
#description
  Sets the skeleton to a loading state.
::

::prop-display
---
name: tag
types:
  - string
default: p
required: false
---
### `tag`
#description
  Sets the tag-style of the skeleton.
  ::Component-Interactive
  ---
  class: ' w-full'
  ignore:
    - loading
  external:
    - loading
  props:
    loading: true
    tag: card
  selectOptions:
    tag:
      - value: p
        label: p
      - value: article
        label: article  
      - value: img
        label: img
      - value: card
        label: card
  slots:
    default: <!-- Your Content here -->
  ---
  ::
::

::prop-display
---
name: tagOptions
types:
  - object
default:
    p: 
      lines: 3
      lineHeight: "h-4"
      color: "dark:bg-zinc-700 bg-zinc-200"
      rounded: "rounded-3xl"
      gap: "gap-2"
    article: 
      lines: 5
      lineHeight: "h-4"
      headingHeight: "h-6"
      color: "dark:bg-zinc-700 bg-zinc-200"
      gap: "gap-2"
      headingGap: "gap-5"
      rounded: "rounded-3xl"
      headingRounded: "rounded-lg"
    img: 
      width: "w-full"
      height: "h-full min-h-40"
      rounded: "rounded"
      color: "bg-zinc-800"
      iconColor: "text-zinc-600"
      iconSize: "size-10"
    card: 
      imgHeight: "h-full min-h-40"
      headingHeight: "h-6"
      imgRounded: "rounded"
      headingRounded: "rounded-lg"
      imgIconColor: "text-zinc-600"
      imgIconSize: "size-10"
      imageAspect: "aspect-video"
      color: "bg-zinc-800"
      gap: "gap-4"
required: false
---
### `tagOptions`
#description
  Adjusts the skeleton's style based on the tag.
#defaultValue
```ts
{
  p: {
    lines: 3,
    lineHeight: "h-4",
    color: "dark:bg-zinc-700 bg-zinc-200",
    rounded: "rounded-3xl",
    gap: "gap-2"
  },
  article: {
    lines: 5,
    lineHeight: "h-4",
    headingHeight: "h-6",
    color: "dark:bg-zinc-700 bg-zinc-200",
    gap: "gap-2",
    headingGap: "gap-5",
    rounded: "rounded-3xl",
    headingRounded: "rounded-lg"
  },
  img: {
    width: "w-full",
    height: "h-full min-h-40",
    rounded: "rounded",
    color: "bg-zinc-800",
    iconColor: "text-zinc-600",
    iconSize: "size-10"
  },
  card: {
    imgHeight: "h-full min-h-40",
    headingHeight: "h-6",
    imgRounded: "rounded",
    headingRounded: "rounded-lg",
    imgIconColor: "text-zinc-600",
    imgIconSize: "size-10",
    imageAspect: "aspect-video",
    color: "bg-zinc-800",
    gap: "gap-4"
  }
}
```
::

## Slots

::slot-display
### `default`

#description
  Content that will be replaced by the skeleton while loading.
::