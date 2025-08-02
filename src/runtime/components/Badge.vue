<template>
  <div class="relative w-fit">
    <slot />
    <div :class="styleClass">
      <div class="max-w-full truncate">
        <slot name="badge-content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { BadgeProps } from '../types/props'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<BadgeProps>(), {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined,
  border: undefined,
})

const config = useComponentConfig('badge', props)

const styleClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'absolute',
    'inline-flex',
    'items-center',
    'justify-center',
    'px-1',
    'rounded-full',
    'max-w-full',
  )

  // COLORS
  classes.push(config.color.bg)
  classes.push(config.color.border)
  classes.push(config.color.text)

  // POSITION
  // Horizontal
  if (config.left) {
    classes.push('-left-2')
  }
  else if (config.right) {
    classes.push('-right-2')
  }
  else {
    classes.push('-right-2')
  }

  // Vertical
  if (config.bottom) {
    classes.push('-bottom-2')
  }
  else if (config.top) {
    classes.push('-top-2')
  }
  else {
    classes.push('-top-2')
  }

  // TEXT
  classes.push(config.text)

  // BORDER
  if (config.border) {
    if (typeof config.border === 'string') {
      classes.push(config.border)
    }
    else {
      classes.push('border-2')
    }
  }

  // WIDTH
  classes.push(config.width)

  // HEIGHT
  classes.push(config.height)

  return classes.join(' ')
})
</script>
