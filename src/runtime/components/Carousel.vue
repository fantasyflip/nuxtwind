<template>
  <div
    :id="'currentItem-' + props.modelValue"
    ref="carouselRef"
    :class="wrapperStyleClass"
    @mouseenter="disableAutoPlay"
    @mouseleave="enableAutoPlay"
  >
    <slot />
    <div v-if="!props.hideNavigation">
      <div :class="rightNavigationWrapperStyleClass">
        <Button
          icon
          class="group/button"
          :color="{
            iconHover: 'hover:text-white',
          }"
          ari-label="Next"
          @click="nextItem"
        >
          <div class="relative w-8 h-8 grid place-items-center">
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              class="text-xl z-10"
            >
              <path
                fill="currentColor"
                d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"
              />
            </svg>
            <div :class="backgroundNavigationStyleClass" />
          </div>
        </Button>
      </div>
      <div :class="leftNavigationWrapperStyleClass">
        <Button
          icon
          class="group/button"
          :color="{
            iconHover: 'hover:text-white',
          }"
          ari-label="Previous"
          @click="prevItem"
        >
          <div class="relative w-8 h-8 grid place-items-center">
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              class="text-xl z-10"
            >
              <path
                fill="currentColor"
                d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z"
              />
            </svg>
            <div :class="backgroundNavigationStyleClass" />
          </div>
        </Button>
      </div>
    </div>

    <ol
      v-if="!props.hidePagination"
      :class="paginationWrapperStyleClass"
    >
      <li
        v-for="(item, index) in itemCount"
        :key="index"
      >
        <Button
          icon
          :ari-label="'Carousel-Item ' + (index + 1)"
          @click="$emit('update:modelValue', index + 1)"
        >
          <svg
            v-if="props.modelValue === index + 1"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
          >
            <path
              fill="currentColor"
              d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
            />
          </svg>
        </Button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import Button from './Button.vue'

export interface Props {
  modelValue?: number
  autoPlay?: boolean
  timeout?: number
  disableAutoPlayOnHover?: boolean
  hideNavigation?: boolean
  hidePagination?: boolean
  shadow?: boolean | string
  transition?:
    | boolean
    | {
      duration?: string
      delay?: string
      ease?: string
    }
}

const defaults = {
  shadow: 'shadow-xl',
  transition: {
    duration: 'duration-300',
    delay: 'delay-300',
    ease: 'ease-in-out',
  },
  timeout: 5,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  autoPlay: true,
  timeout: 5,
  disableAutoPlayOnHover: true,
  hideNavigation: false,
  hidePagination: false,
  shadow: true,
  transition: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', id: number): void
}>()

const itemCount = ref(0)
const carouselRef = ref<HTMLElement>()

onMounted(() => {
  if (carouselRef.value) {
    itemCount.value = carouselRef.value.querySelectorAll('.ci').length
  }
})

// next item
const nextItem = () => {
  if (props.modelValue === itemCount.value) {
    emit('update:modelValue', 1)
    return
  }
  emit('update:modelValue', props.modelValue + 1)
}

// prev item
const prevItem = () => {
  if (props.modelValue != 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
  else {
    emit('update:modelValue', itemCount.value)
  }
}

const timeoutMs = computed(() => {
  if (props.timeout <= 0) return defaults.timeout * 1000
  return props.timeout * 1000
})

let interval: NodeJS.Timeout | undefined = undefined
function enableAutoPlay() {
  if (props.disableAutoPlayOnHover && props.autoPlay) {
    interval = setInterval(() => {
      nextItem()
    }, timeoutMs.value)
  }
}
function disableAutoPlay() {
  if (props.disableAutoPlayOnHover && props.autoPlay) {
    clearInterval(interval)
  }
}

onMounted(() => {
  if (props.autoPlay) {
    if (props.disableAutoPlayOnHover) {
      enableAutoPlay()
    }
    else {
      interval = setInterval(() => {
        nextItem()
      }, timeoutMs.value)
    }
  }
})

watch(() => props.autoPlay, () => {
  if (props.autoPlay) {
    if (props.disableAutoPlayOnHover) {
      enableAutoPlay()
    }
    else {
      interval = setInterval(() => {
        nextItem()
      }, timeoutMs.value)
    }
  }
  else {
    clearInterval(interval)
  }
})

watch(() => props.timeout, () => {
  clearInterval(interval)
  if (props.autoPlay) {
    if (props.disableAutoPlayOnHover) {
      enableAutoPlay()
    }
    else {
      interval = setInterval(() => {
        nextItem()
      }, timeoutMs.value)
    }
  }
  else {
    clearInterval(interval)
  }
})

const wrapperStyleClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'carousel',
    'relative',
    'w-full',
    'h-full',
    'group/carousel',
    'overflow-hidden',
  )

  if (props.shadow) {
    if (typeof props.shadow === 'string') {
      classes.push(props.shadow)
    }
    else {
      classes.push(defaults.shadow)
    }
  }

  return classes.join(' ')
})

const rightNavigationWrapperStyleClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'absolute',
    'right-1',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    'translate-x-10',
    'group-hover/carousel:translate-x-0',
  )

  if (typeof props.transition === 'boolean' && props.transition) {
    classes.push('transition-all')
    classes.push(defaults.transition.duration)
    classes.push(defaults.transition.delay)
    classes.push(defaults.transition.ease)
  }
  else if (typeof props.transition === 'object' && props.transition) {
    classes.push('transition-all')
    classes.push(props.transition?.duration || defaults.transition.duration)
    classes.push(props.transition?.delay || defaults.transition.delay)
    classes.push(props.transition?.ease || defaults.transition.ease)
  }

  return classes.join(' ')
})

const leftNavigationWrapperStyleClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'absolute',
    'left-1',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    '-translate-x-10',
    'group-hover/carousel:translate-x-0',
  )

  if (typeof props.transition === 'boolean' && props.transition) {
    classes.push('transition-all')
    classes.push(defaults.transition.duration)
    classes.push(defaults.transition.delay)
    classes.push(defaults.transition.ease)
  }
  else if (typeof props.transition === 'object' && props.transition) {
    classes.push('transition-all')
    classes.push(props.transition?.duration || defaults.transition.duration)
    classes.push(props.transition?.delay || defaults.transition.delay)
    classes.push(props.transition?.ease || defaults.transition.ease)
  }

  return classes.join(' ')
})

const backgroundNavigationStyleClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'w-8',
    'h-8',
    'bg-white',
    'rounded-2xl',
    'absolute',
    'top-0',
    'left-0',
    'group-hover/button:opacity-20',
    'opacity-0',
    'transition-opacity',
  )

  if (typeof props.transition === 'boolean' && props.transition) {
    classes.push('transition-opacity')
    classes.push(defaults.transition.duration)
  }
  else if (typeof props.transition === 'object' && props.transition) {
    classes.push('transition-opacity')
    classes.push(props.transition?.duration || defaults.transition.duration)
  }

  return classes.join(' ')
})

const paginationWrapperStyleClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'absolute',
    '-bottom-3',
    'group-hover/carousel:bottom-2',
    'flex',
    'text-xs',
    'w-full',
    'justify-center',
    'transform',
    'translate-y-10',
    'group-hover/carousel:translate-y-0',
  )

  if (typeof props.transition === 'boolean' && props.transition) {
    classes.push('transition-all')
    classes.push(defaults.transition.duration)
    classes.push(defaults.transition.delay)
    classes.push(defaults.transition.ease)
  }
  else if (typeof props.transition === 'object' && props.transition) {
    classes.push('transition-all')
    classes.push(props.transition?.duration || defaults.transition.duration)
    classes.push(props.transition?.delay || defaults.transition.delay)
    classes.push(props.transition?.ease || defaults.transition.ease)
  }

  return classes.join(' ')
})
</script>

<style scoped></style>
