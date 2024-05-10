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

export interface Props {
  color?: {
    bg?: string
    border?: string
    text?: string
  }
  top?: boolean
  bottom?: boolean
  right?: boolean
  left?: boolean
  text?: string
  border?: boolean | string
  width?: string
  height?: string
}
const defaults = {
  color: {
    bg: 'bg-red-500 dark:bg-red-500',
    border: 'border-white dark:border-zinc-900',
    text: 'text-white dark:text-white',
  },
  border: 'border-2',
}

const props = withDefaults(defineProps<Props>(), {
  color: () => {
    return {
      bg: 'bg-red-500 dark:bg-red-500',
      border: 'border-white dark:border-zinc-900',
      text: 'text-white',
    }
  },
  top: true,
  bottom: false,
  right: true,
  left: false,
  text: 'text-xs font-bold',
  border: true,
  width: 'min-w-[24px]',
  height: 'min-h-[24px]',
})

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
  classes.push(props.color?.bg || defaults.color.bg)
  classes.push(props.color?.border || defaults.color.border)

  // POSITION
  // Horizontal
  if (props.left) {
    classes.push('-left-2')
  }
  else if (props.right) {
    classes.push('-right-2')
  }
  else {
    classes.push('-right-2')
  }

  // Vertical
  if (props.bottom) {
    classes.push('-bottom-2')
  }
  else if (props.top) {
    classes.push('-top-2')
  }
  else {
    classes.push('-top-2')
  }

  // TEXT
  classes.push(props.text)

  // BORDER
  if (props.border) {
    if (typeof props.border === 'string') {
      classes.push(props.border)
    }
    else {
      classes.push(defaults.border)
    }
  }

  // WIDTH
  classes.push(props.width)

  // HEIGHT
  classes.push(props.height)

  return classes.join(' ')
})
</script>
