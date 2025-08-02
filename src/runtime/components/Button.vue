<template>
  <NuxtLink
    v-if="config.link"
    :to="config.link"
    :class="styleClass"
    :target="config.target"
    :aria-label="config.ariLabel"
  >
    <div class="relative">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Progress
          v-if="config.loading && !config.icon"
          v-model="loadingProgress"
          :circular="{
            size: config.dense ? 'size-4': 'size-6',
          }"
          loading
          :color="{
            circle: config.color.loadingCircle,
            circleDark: config.color.loadingCircleDark,
            circleProgress: config.color.loadingCircleProgress,
            circleProgressDark: config.color.loadingCircleProgressDark,
            circleCutout: config.color.loadingCircleCutout,
          }"
        />
      </div>
      <div
        :class="{
          'opacity-0 cursor-wait': config.loading,
          'animate-pulse': config.loading && config.icon,
        }"
      >
        <slot>Button</slot>
      </div>
    </div>
  </NuxtLink>
  <button
    v-else
    ref="button"
    :class="styleClass"
    :disabled="config.disabled"
    :type="config.type"
    :aria-label="config.ariLabel"
  >
    <div class="relative">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Progress
          v-if="config.loading && !config.icon"
          v-model="loadingProgress"
          :circular="{
            size: config.dense ? 'size-4': 'size-6',
          }"
          loading
          :color="{
            circle: config.color.loadingCircle,
            circleDark: config.color.loadingCircleDark,
            circleProgress: config.color.loadingCircleProgress,
            circleProgressDark: config.color.loadingCircleProgressDark,
            circleCutout: config.color.loadingCircleCutout,
          }"
        />
      </div>
      <div
        :class="{
          'opacity-0 cursor-wait': config.loading,
          'animate-pulse': config.loading && config.icon,
        }"
      >
        <slot>Button</slot>
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Progress from './Progress.vue'
import type { ButtonProps } from '../types/props'
import type { ButtonConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<ButtonProps>(), {
  rounded: undefined,
  grow: undefined,
  transition: undefined,
  shadow: undefined,
  loading: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<ButtonConfig>(() => useComponentConfig('Button', props))

const button = ref(null)

defineExpose({
  button,
})

const loadingProgress = ref(30)

const styleClass = computed(() => {
  const styleClasses: string[] = []

  // COLOR
  // OUTLINED
  if (config.value.outlined) {
    styleClasses.push(config.value.color.text)
    styleClasses.push(config.value.color.border)
    if (typeof config.value.outlined === 'string') {
      styleClasses.push(config.value.outlined)
    }
  }
  else if (config.value.icon) {
    styleClasses.push(config.value.color.text)
    if (!config.value.disabled && !config.value.loading) {
      styleClasses.push(config.value.color.iconHover)
    }
  }
  else {
    styleClasses.push(config.value.color.bg)
    styleClasses.push(config.value.color.text)
    if (!config.value.disabled && !config.value.loading) {
      styleClasses.push(config.value.color.hover)
    }
  }

  // BORDER RADIUS
  if (config.value.rounded) {
    styleClasses.push(
      config.value.rounded,
    )
  }

  // DISABLED
  if (config.value.disabled) {
    styleClasses.push('opacity-50 cursor-not-allowed')
  }
  else if (!config.value.loading) {
    styleClasses.push('cursor-pointer')
    // GROW
    if (config.value.grow.delay && config.value.grow.scale) {
      styleClasses.push(config.value.grow.delay)
      styleClasses.push(config.value.grow.scale)
    }
  }
  else {
    styleClasses.push('cursor-wait opacity-50')
  }
  if (config.value.disabled) {
    styleClasses.push('opacity-50 cursor-not-allowed')
  }

  // TRANSITION
  if (config.value.transition.duration && config.value.transition.ease) {
    styleClasses.push(config.value.transition.duration)
    styleClasses.push(config.value.transition.ease)
  }

  // SHADOW
  if (config.value.shadow) {
    if (config.value.icon) {
      styleClasses.push('shadow-none')
    }
    else {
      styleClasses.push(
        config.value.shadow,
      )
    }
  }

  // DENSE
  if (config.value.dense) {
    styleClasses.push('py-1 px-2 text-sm min-h-[28px] min-w-[24px]')
  }
  else if (!config.value.icon) {
    styleClasses.push('py-2 px-5 min-h-[40px]')
  }

  // WIDTH
  styleClasses.push(config.value.width)

  // HEIGHT
  if (config.value.height) {
    styleClasses.push(config.value.height)
  }

  styleClasses.push('flex justify-center items-center')

  return styleClasses.join(' ')
})
</script>
