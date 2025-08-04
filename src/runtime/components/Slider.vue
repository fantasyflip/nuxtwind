<template>
  <div>
    <label
      v-if="config.label || $slots.label"
      :for="sliderId"
      :class="config.color?.label"
    >
      <slot name="label">{{ config.label }}</slot>
    </label>
    <div
      v-if="config.description || $slots.description"
      class="text-sm -mt-1 w-full"
      :class="config.color?.description"
    >
      <slot name="description">
        {{ config.description }}
      </slot>
    </div>
    <div class="w-full">
      <input
        :id="sliderId"
        :value="modelValue"
        :min="config.min"
        :max="config.max"
        :disabled="config.disabled"
        type="range"
        :class="sliderStyleClass"
        @input="handleInput"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useId } from '#imports'
import type { SliderProps } from '../types/props'
import type { SliderConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  rounded: undefined,
  disabled: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<SliderConfig>(() => useComponentConfig('slider', props))

const sliderId = useId()

const colorMode = ref('dark')
const htmlElement = ref<HTMLElement>()
let observer: MutationObserver

function getColorMode() {
  // get class of html element
  const htmlClass = document.querySelector('html')!.classList
  // check if dark mode is enabled
  if (htmlClass.contains('dark')) {
    return 'dark'
  }
  else {
    return 'light'
  }
}

onMounted(() => {
  colorMode.value = getColorMode()

  htmlElement.value = document.querySelector('html') as HTMLElement

  observer = new MutationObserver(() => {
    colorMode.value = getColorMode()
  })

  observer.observe(htmlElement.value, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  observer.disconnect()
})

const emit = defineEmits<{
  (e: 'update:modelValue', id: number): void
}>()

if (props.modelValue > config.value.max) {
  emit('update:modelValue', config.value.max)
}

if (props.modelValue < config.value.min) {
  emit('update:modelValue', config.value.min)
}

function handleInput(e: Event) {
  // Prevent input when disabled
  if (config.value.disabled) {
    return
  }

  // UPDATE MODEL VALUE
  emit('update:modelValue', (e.target as HTMLInputElement)?.valueAsNumber ?? Number((e.target as HTMLInputElement)?.value))
}

const thumbTooltipPercentage = ref('0%')
const thumbSize = config.value.thumbSize + 'px'
const thumbSizeHover = config.value.thumbSize * 1.25 + 'px'

const modelValueComputed = computed(() => {
  return props.modelValue
})

watch(
  modelValueComputed,
  (newValue) => {
    let value = newValue
    if (value > config.value.max) {
      value = config.value.max
      emit('update:modelValue', config.value.max)
    }

    if (value < config.value.min) {
      value = config.value.min
      emit('update:modelValue', config.value.min)
    }
    thumbTooltipPercentage.value = (value / config.value.max) * 100 + '%'
  },
  { immediate: true },
)

const thumbColor = computed(() => {
  if (colorMode.value === 'light') {
    return config.value.color.sliderThumb
  }
  else {
    return config.value.color.sliderThumbDark
  }
})

const thumbBorderColor = computed(() => {
  if (colorMode.value === 'light') {
    return config.value.color.sliderThumbBorder
  }
  else {
    return (
      config.value.color.sliderThumbBorderDark
    )
  }
})

const sliderStyleClass = computed(() => {
  const classes: string[] = []
  classes.push('slider', 'appearance-none')

  // DISABLED
  if (config.value.disabled) {
    classes.push('opacity-50 cursor-not-allowed')
  }
  else {
    classes.push('cursor-pointer')
  }

  if (config.value.rounded) {
    classes.push(config.value.rounded)
  }

  classes.push(config.value.color?.sliderLine)

  classes.push(config.value.width)
  classes.push(config.value.height)
  return classes.join(' ')
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: v-bind(thumbSize);
  height: v-bind(thumbSize);
  border-radius: 50%;
  background: radial-gradient(v-bind(thumbColor), v-bind(thumbBorderColor));
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
.slider::-webkit-slider-thumb:hover {
  width: v-bind(thumbSizeHover);
  height: v-bind(thumbSizeHover);
}

/* Disabled state styling */
.slider:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
  opacity: 0.5;
}
.slider:disabled::-webkit-slider-thumb:hover {
  width: v-bind(thumbSize);
  height: v-bind(thumbSize);
}
</style>
