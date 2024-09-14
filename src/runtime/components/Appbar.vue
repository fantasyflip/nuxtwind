<template>
  <nav :class="appbarWrapperClass">
    <div
      v-if="props.navigationIcon"
      :class="navigationIconClass"
    >
      <slot name="navigation-icon">
        <Button
          icon
          :color="{
            text: props.color?.navigationIcon || defaults.color.navigationIcon,
            iconHover:
              props.color?.navigationIconHover
              || defaults.color.navigationIconHover,
          }"
          ari-label="Toggle Drawer"
          @click="emit('navigation-icon-click')"
        >
          <component
            :is="props.navigationIcon"
            v-if="typeof props.navigationIcon === 'object'"
          />
          <!-- <MdiMenu  /> -->
          <svg
            v-else
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
          >
            <path
              fill="currentColor"
              d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
            />
          </svg>
        </Button>
      </slot>
    </div>
    <div :class="props.height">
      <slot>
        <div class="flex w-full h-full justify-center items-center">
          Appbar
        </div>
      </slot>
    </div>
    <ClientOnly>
      <TransitionGroup name="list">
        <div
          v-if="extensionIsActive"
          key="extension"
          :class="props.color?.bg || defaults.color.bg"
          class="w-full"
        >
          <slot name="extension">
            Extension Slot
          </slot>
        </div>
      </TransitionGroup>
    </ClientOnly>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import Button from './Button.vue'

export interface Props {
  color?: {
    bg?: string
    navigationIcon?: string
    navigationIconHover?: string
  }
  fixed?: boolean
  absolute?: boolean
  sticky?: boolean
  bottom?: boolean
  extension?: boolean
  shrinkOnScroll?: boolean
  elevateOnScroll?: boolean
  scrollOffset?: number
  navigationIcon?: boolean | object
  zIndex?: string
  height?: string
}

const defaults = {
  color: {
    bg: 'bg-gray-200 dark:bg-zinc-900',
    navigationIcon: 'text-black dark:text-white',
    navigationIconHover: 'hover:text-primary-700 dark:hover:text-primary-300',
  },
  elevateOnScroll: 'drop-shadow-md',
}

const props = withDefaults(defineProps<Props>(), {
  color: () => {
    return {
      bg: 'bg-gray-200 dark:bg-zinc-900',
      navigationIcon: 'text-black dark:text-white',
      navigationIconHover: 'hover:text-primary-700 dark:hover:text-primary-300',
    }
  },
  fixed: false,
  absolute: false,
  sticky: false,
  bottom: false,
  extension: false,
  shrinkOnScroll: false,
  elevateOnScroll: false,
  scrollOffset: undefined,
  navigationIcon: false,
  zIndex: 'z-10',
  height: 'h-14',
})

const emit = defineEmits(['navigation-icon-click'])

const { y } = useWindowScroll()

const extensionIsActive = computed(() => {
  let extensionState = false
  if (props.extension) {
    if (props.shrinkOnScroll) {
      if (typeof props.scrollOffset === 'number') {
        if (props.scrollOffset <= 0) {
          extensionState = true
        }
      }
      else {
        if (y.value <= 0) {
          extensionState = true
        }
      }
    }
    else {
      extensionState = true
    }
  }

  return extensionState
})

const appbarWrapperClass = computed(() => {
  const classes: string[] = []

  //   if (!props.extension) {
  classes.push(props.height)
  //   }

  classes.push(props.color?.bg || defaults.color.bg)

  if (props.fixed) {
    classes.push('fixed')
  }
  else if (props.absolute) {
    classes.push('absolute')
  }
  else {
    classes.push('relative')
  }

  if (props.sticky) {
    classes.push('sticky')
  }

  if (props.absolute || props.fixed || props.sticky) {
    if (props.bottom && (props.absolute || props.fixed)) {
      classes.push('bottom-0')
    }
    else {
      classes.push('top-0')
    }
    classes.push('left-0')
    classes.push('right-0')
    classes.push(props.zIndex)
  }

  if (props.elevateOnScroll) {
    let shadowClass = 'drop-shadow-none'
    if (props.fixed) {
      if (useWindowScroll().y.value > 0 && useWindowScroll().y.value < 20) {
        shadowClass = 'drop-shadow-sm'
      }
      else if (
        useWindowScroll().y.value > 20
        && useWindowScroll().y.value < 40
      ) {
        shadowClass = 'drop-shadow-md'
      }
      else if (
        useWindowScroll().y.value > 40
        && useWindowScroll().y.value < 80
      ) {
        shadowClass = 'drop-shadow-lg'
      }
      else if (useWindowScroll().y.value > 80) {
        shadowClass = 'drop-shadow-xl'
      }
    }
    else if (props.sticky && props.scrollOffset) {
      if (props.scrollOffset > 0 && props.scrollOffset < 20) {
        shadowClass = 'drop-shadow-sm'
      }
      else if (props.scrollOffset > 20 && props.scrollOffset < 40) {
        shadowClass = 'drop-shadow-md'
      }
      else if (props.scrollOffset > 40 && props.scrollOffset < 80) {
        shadowClass = 'drop-shadow-lg'
      }
      else if (props.scrollOffset > 80) {
        shadowClass = 'drop-shadow-xl'
      }
    }

    classes.push(shadowClass, 'transition-all')
  }

  return classes.join(' ')
})

const navigationIconClass = computed(() => {
  const classes: string[] = []

  classes.push(
    'absolute',
    'text-2xl',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    'left-3',
  )

  classes.push(props.zIndex)

  return classes.join(' ')
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
