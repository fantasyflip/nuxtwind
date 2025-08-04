<template>
  <div :class="contentWrapperClass">
    <slot>Hover over me!</slot>
    <div :class="tooltipWrapperClass">
      <slot name="tooltip">
        Tooltip
      </slot>
      <svg
        :class="pointerClass"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon
          class="fill-current"
          points="0,0 127.5,127.5 255,0"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { TooltipProps } from '../types/props'
import type { TooltipConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<TooltipProps>(), {
  top: undefined,
  bottom: undefined,
  left: undefined,
  right: undefined,
  transition: true,
  rounded: true,
  interactive: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<TooltipConfig>(() => useComponentConfig('tooltip', props))

const contentWrapperClass = computed(() => {
  const classes = ['group', 'cursor-pointer', 'relative', 'inline-block']

  return classes.join(' ')
})

const tooltipWrapperClass = computed(() => {
  const classes: string[] = [
    'transition-opacity',
    'opacity-0',
    'py-2',
    'absolute',
    'group-hover:opacity-100',
    'px-3',
  ]

  if (!config.value.interactive) {
    classes.push('pointer-events-none')
  }

  // COLOR
  classes.push(config.value.color.bg)
  classes.push(config.value.color.text)

  // TRANSITION
  if (config.value.transition) {
    classes.push(config.value.transition.duration)
    classes.push(config.value.transition.ease)
  }

  // ROUNDED
  if (config.value.rounded) {
    classes.push(config.value.rounded)
  }

  // Z-INDEX
  classes.push(config.value.zIndex)

  // WIDTH
  classes.push(config.value.width)

  // TEXT
  classes.push(config.value.text)

  // POSITION
  if (config.value.left) {
    classes.push(
      'right-full',
      'mr-2',
      'top-1/2',
      'transform',
      '-translate-y-1/2',
    )
  }
  else if (config.value.right) {
    classes.push(
      'left-full',
      'ml-2',
      'top-1/2',
      'transform',
      '-translate-y-1/2',
    )
  }
  else if (config.value.bottom) {
    classes.push(
      'top-full',
      'mt-2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
    )
  }
  else if (config.value.top) {
    classes.push(
      'bottom-full',
      'mb-2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
    )
  }

  return classes.join(' ')
})

const pointerClass = computed(() => {
  const classes: string[] = ['absolute', 'text-black', 'h-2', 'w-full']

  // POSITION
  if (config.value.left) {
    classes.push(
      'left-1/2',
      'ml-1',
      '-rotate-90',
      'top-1/2',
      'transform',
      '-translate-y-1/2',
    )
  }
  else if (config.value.right) {
    classes.push(
      'right-1/2',
      'mr-1',
      'rotate-90',
      'top-1/2',
      'transform',
      '-translate-y-1/2',
    )
  }
  else if (config.value.bottom) {
    classes.push('bottom-full', 'rotate-180', 'left-0')
  }
  else if (config.value.top) {
    classes.push('top-full', 'left-0')
  }

  // COLOR
  classes.push(config.value.color.bgPointer)

  return classes.join(' ')
})
</script>
