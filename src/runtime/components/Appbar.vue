<template>
  <nav :class="appbarWrapperClass">
    <div
      v-if="config.navigationIcon"
      :class="navigationIconClass"
    >
      <slot name="navigation-icon">
        <Button
          icon
          :color="{
            text: config.color.navigationIcon,
            iconHover: config.color.navigationIconHover,
          }"
          ari-label="Toggle Drawer"
          @click="emit('navigation-icon-click')"
        >
          <component
            :is="config.navigationIcon"
            v-if="typeof config.navigationIcon === 'object'"
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
    <div :class="config.height">
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
          :class="config.color.bg"
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
import type { AppbarProps } from '../types/props'
import type { AppbarConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<AppbarProps>(), {
  fixed: undefined,
  absolute: undefined,
  sticky: undefined,
  bottom: undefined,
  extension: undefined,
  shrinkOnScroll: undefined,
  elevateOnScroll: undefined,
  navigationIcon: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<AppbarConfig>(() => useComponentConfig('appbar', props))

const emit = defineEmits(['navigation-icon-click'])

const { y } = useWindowScroll()

const extensionIsActive = computed(() => {
  let extensionState = false
  if (config.value.extension) {
    if (config.value.shrinkOnScroll) {
      if (typeof config.value.scrollOffset === 'number') {
        if (config.value.scrollOffset <= 0) {
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

  classes.push(config.value.height)
  classes.push(config.value.color.bg)

  if (config.value.fixed) {
    classes.push('fixed')
  }
  else if (config.value.absolute) {
    classes.push('absolute')
  }
  else {
    classes.push('relative')
  }

  if (config.value.sticky) {
    classes.push('sticky')
  }

  if (config.value.absolute || config.value.fixed || config.value.sticky) {
    if (config.value.bottom && (config.value.absolute || config.value.fixed)) {
      classes.push('bottom-0')
    }
    else {
      classes.push('top-0')
    }
    classes.push('left-0')
    classes.push('right-0')
    classes.push(config.value.zIndex)
  }

  if (config.value.elevateOnScroll) {
    let shadowClass = 'drop-shadow-none'
    if (config.value.fixed) {
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
    else if (config.value.sticky && config.value.scrollOffset) {
      if (config.value.scrollOffset > 0 && config.value.scrollOffset < 20) {
        shadowClass = 'drop-shadow-sm'
      }
      else if (config.value.scrollOffset > 20 && config.value.scrollOffset < 40) {
        shadowClass = 'drop-shadow-md'
      }
      else if (config.value.scrollOffset > 40 && config.value.scrollOffset < 80) {
        shadowClass = 'drop-shadow-lg'
      }
      else if (config.value.scrollOffset > 80) {
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

  classes.push(config.value.zIndex)

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
