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
import type { BadgeConfig } from '../types/merged'

const props = withDefaults(defineProps<BadgeProps>(), {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined,
  border: undefined,
})

const config = computed<BadgeConfig>(() => useComponentConfig('badge', props))

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
  classes.push(config.value.color.bg)
  classes.push(config.value.color.border)
  classes.push(config.value.color.text)

  // POSITION
  // Horizontal
  if (config.value.left) {
    classes.push('-left-2')
  }
  else if (config.value.right) {
    classes.push('-right-2')
  }
  else {
    classes.push('-right-2')
  }

  // Vertical
  if (config.value.bottom) {
    classes.push('-bottom-2')
  }
  else if (config.value.top) {
    classes.push('-top-2')
  }
  else {
    classes.push('-top-2')
  }

  // TEXT
  classes.push(config.value.text)

  // BORDER
  if (config.value.border) {
    if (typeof config.value.border === 'string') {
      classes.push(config.value.border)
    }
    else {
      classes.push('border-2')
    }
  }

  // WIDTH
  classes.push(config.value.width)

  // HEIGHT
  classes.push(config.value.height)

  return classes.join(' ')
})
</script>
