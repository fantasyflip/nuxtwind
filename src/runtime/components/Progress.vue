<template>
  <div
    v-if="config.circular"
    id="circular-progress"
    class="conic-gradient"
    :class="circularStyleClass"
  >
    <div
      v-if="!config.loading"
      class="relative w-full h-full"
    >
      <slot name="inner-circle">
        <div
          class="h-full w-full grid place-items-center"
          :class="
            config.circular.cutout.text
          "
        >
          {{ textProgress }}%
        </div>
      </slot>
    </div>
  </div>
  <div
    v-else
    :class="linearWrapperStyleClass"
  >
    <div
      :class="linearStyleClass"
      :style="linearProgressStyle"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { ProgressProps } from '../types/props'
import type { ProgressConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  circular: false,
  loading: undefined,
  initialLoadTime: undefined,
  transition: undefined,
  rounded: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<ProgressConfig>(() => useComponentConfig('progress', props))

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

const initialLoadTimeRef = ref(false)

if (config.value.initialLoadTime) {
  setTimeout(
    () => {
      initialLoadTimeRef.value = true
    },
    config.value.initialLoadTime,
  )
}

const modelValueComputed = computed(() => {
  return props.modelValue
})

let lastInputValue = 0

const gradientProgress = ref<number | string>(lastInputValue)

const textProgress = ref(lastInputValue)

watch(
  modelValueComputed,
  (newValue) => {
    getCircularProgress(newValue)
  },
)

onMounted(() => {
  getCircularProgress(props.modelValue)
})

function getCircularProgress(inputValue: number) {
  let endValue = 0
  if (inputValue === null && config.value.loading) {
    endValue = 30
  }
  else if (inputValue > 100) {
    endValue = 100
  }
  else if (inputValue < 0) {
    endValue = 0
  }
  else if (inputValue === undefined) {
    endValue = 0
  }
  else {
    endValue = inputValue
  }

  const progressValue = ref(lastInputValue)
  let speed = 0
  if (config.value.initialLoadTime) {
    if (config.value.initialLoadTimeType === 'static') {
      speed
        = config.value.initialLoadTime
    }
    else {
      speed
        = config.value.initialLoadTime / endValue
    }
  }

  if (lastInputValue < endValue) {
    // increase
    if (speed > 0) {
      const progressInterval = setInterval(() => {
        if (progressValue.value < endValue && inputValue === props.modelValue) {
          progressValue.value++
          gradientProgress.value = progressValue.value * 3.6 + 'deg'
          textProgress.value = progressValue.value
          lastInputValue = progressValue.value
        }
        else {
          clearInterval(progressInterval)
        }
      }, speed)
    }
    else {
      progressValue.value = endValue
      gradientProgress.value = progressValue.value * 3.6 + 'deg'
      textProgress.value = progressValue.value
    }
  }
  else {
    // decresing
    if (speed > 0) {
      const progressInterval = setInterval(() => {
        if (progressValue.value > endValue && inputValue === props.modelValue) {
          progressValue.value--
          gradientProgress.value = progressValue.value * 3.6 + 'deg'
          textProgress.value = progressValue.value
          lastInputValue = progressValue.value
        }
        else {
          clearInterval(progressInterval)
        }
      }, speed)
    }
    else {
      progressValue.value = endValue
      gradientProgress.value = progressValue.value * 3.6 + 'deg'
      textProgress.value = progressValue.value
    }
  }
}

const circularColorCss = computed(() => {
  if (colorMode.value === 'light') {
    return config.value.color.circle
  }
  else {
    return config.value.color.circleDark
  }
})

const circularColorProgressCss = computed(() => {
  if (colorMode.value === 'light') {
    return config.value.color.circleProgress
  }
  else {
    return config.value.color.circleProgressDark
  }
})

const circularStyleClass = computed(() => {
  const classes: string[] = []
  // class="relative w-[250px] h-[250px] rounded-[50%] grid place-items-center before:content-[''] before:absolute before:h-[84%] before:w-[84%] before:bg-zinc-900 before:rounded-[50%]"
  classes.push(
    'relative',
    'rounded-[50%]',
    'grid',
    'place-items-center',
    'before:content-[\'\']',
    'before:absolute',
    'before:rounded-[50%]',
  )

  // SIZE
  if (config.value.circular) {
    classes.push(config.value.circular.size)
    classes.push(config.value.circular.cutout.size)
  }

  // COLOR
  classes.push(config.value.color.circleCutout)

  // LOADING
  if (config.value.loading) {
    classes.push('animate-spin')
  }

  return classes.join(' ')
})

const linearWrapperStyleClass = computed(() => {
  const classes: string[] = []

  // COLOR
  classes.push('overflow-hidden')
  classes.push(config.value.color.background)

  // SIZE
  classes.push(config.value.size.width)
  classes.push(config.value.size.height)

  // ROUNDED
  if (config.value.rounded) {
    classes.push(config.value.rounded)
  }

  return classes.join(' ')
})

const linearStyleClass = computed(() => {
  const classes: string[] = []

  classes.push('relative', 'w-full', 'h-full')

  if (config.value.loading) {
    // class="relative w-full h-full before:content-[''] before:absolute before:h-full before:bg-red-600 before:animate-indeterminatebefore after:content-[''] after:absolute after:h-full after:bg-red-600 after:animate-indeterminateafter"
    classes.push(
      'before:content-[\'\'] before:absolute before:h-full before:animate-indeterminatebefore after:content-[\'\'] after:absolute after:h-full after:animate-indeterminateafter',
    )

    // COLOR
    classes.push(config.value.color.secondStrike)
    classes.push(config.value.color.firstStrike)
  }
  else {
    // COLOR
    classes.push(config.value.color.linearProgress)
    classes.push(config.value.color.linearProgressHover)
    if (config.value.transition) {
      classes.push('transition-all')

      classes.push(config.value.transition.duration)
      classes.push(config.value.transition.ease)
    }
  }

  // ROUNDED
  if (config.value.rounded) {
    classes.push(config.value.rounded)
  }

  return classes.join(' ')
})

const linearProgressStyle = computed(() => {
  if (initialLoadTimeRef.value || !config.value.initialLoadTime) {
    let percent = 0

    let input: number = 0
    if (typeof props.modelValue === 'number') {
      input = props.modelValue
    }
    else if (typeof props.modelValue === 'string') {
      input = Number.parseInt(props.modelValue)
    }

    if (input > 100) {
      percent = 100
    }
    else if (input < 0) {
      percent = 0
    }
    else {
      percent = input
    }

    if (config.value.loading && props.modelValue <= 0) {
      percent = 30
    }

    return `width: ${percent}%`
  }
  else {
    return `width: 0%`
  }
})
</script>

<style scoped>
.conic-gradient {
  background: conic-gradient(
    v-bind(circularColorProgressCss) v-bind(gradientProgress),
    v-bind(circularColorCss) v-bind(gradientProgress)
  );
}
</style>
