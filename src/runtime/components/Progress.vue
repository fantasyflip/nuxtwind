<template>
  <div
    v-if="props.circular"
    id="circular-progress"
    class="conic-gradient"
    :class="circularStyleClass"
  >
    <div
      v-if="!props.loading"
      class="relative w-full h-full"
    >
      <slot name="inner-circle">
        <div
          class="h-full w-full grid place-items-center"
          :class="
            typeof props.circular === 'object'
              ? props.circular.cutout?.text
              : defaults.circular.cutout.text
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

export interface Props {
  // eslint-disable-next-line vue/no-required-prop-with-default
  modelValue: number
  size?: {
    width?: string
    height?: string
  }
  color?: {
    circle?: string
    circleDark?: string
    circleProgress?: string
    circleProgressDark?: string
    circleCutout?: string
    background?: string
    firstStrike?: string
    secondStrike?: string
    linearProgress?: string
    linearProgressHover?: string
  }
  circular?:
    | boolean
    | {
      size?: string
      cutout?: {
        size?: string
        text?: string
      }
    }
  loading?: boolean
  initialLoadTime?: number | boolean
  initialLoadTimeType?: 'calc' | 'static'
  transition?:
    | boolean
    | {
      duration?: string
      ease?: string
    }
  rounded?: boolean | string
}

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

const defaults = {
  size: {
    width: 'w-full',
    height: 'h-1',
  },
  circular: {
    size: 'size-20',
    cutout: {
      size: 'before:size-[84%]',
      text: 'text-[70%]',
    },
  },
  color: {
    circle: '#e5e7eb',
    circleDark: '#27272a',
    circleProgress: '#00C16A',
    circleProgressDark: '#00C16A',
    circleCutout: 'before:bg-white dark:before:bg-zinc-900',
    background: 'bg-gray-200 dark:bg-zinc-800',
    firstStrike: 'before:bg-primary-500',
    secondStrike: 'after:bg-primary-600',
    linearProgress: 'bg-primary-500',
    linearProgressHover: 'hover:bg-secondary-500',
  },
  loading: false,
  transition: {
    duration: 'duration-500',
    ease: 'ease-in-out',
  },
  rounded: 'rounded-lg',
  initialLoadTime: 100,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  size: () => {
    return {
      width: 'w-full',
      height: 'h-1',
    }
  },
  color: () => {
    return {
      circle: '#e5e7eb',
      circleDark: '#27272a',
      circleProgress: '#00C16A',
      circleProgressDark: '#00C16A',
      circleCutout: 'before:bg-white dark:before:bg-zinc-900',
      background: 'bg-gray-200 dark:bg-zinc-800',
      firstStrike: 'before:bg-primary-500',
      secondStrike: 'after:bg-primary-600',
      linearProgress: 'bg-primary-500',
      linearProgressHover: 'hover:bg-secondary-500',
    }
  },
  circular: false,
  loading: false,
  initialLoadTime: 100,
  initialLoadTimeType: 'calc',
  transition: true,
  rounded: true,
})

const initialLoadTimeRef = ref(false)

if (props.initialLoadTime) {
  setTimeout(
    () => {
      initialLoadTimeRef.value = true
    },
    typeof props.initialLoadTime === 'number'
      ? props.initialLoadTime
      : defaults.initialLoadTime,
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
  if (inputValue === null && props.loading) {
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
  if (props.initialLoadTime) {
    if (props.initialLoadTimeType === 'static') {
      speed
        = typeof props.initialLoadTime === 'number'
          ? props.initialLoadTime
          : defaults.initialLoadTime
    }
    else {
      speed
        = (typeof props.initialLoadTime === 'number'
          ? props.initialLoadTime
          : defaults.initialLoadTime) / endValue
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
    return props.color.circle || defaults.color.circle
  }
  else {
    return props.color.circleDark || defaults.color.circleDark
  }
})

const circularColorProgressCss = computed(() => {
  if (colorMode.value === 'light') {
    return props.color.circleProgress || defaults.color.circleProgress
  }
  else {
    return props.color.circleProgressDark || defaults.color.circleProgressDark
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
  if (props.circular && typeof props.circular === 'boolean') {
    classes.push(defaults.circular.size)
    classes.push(defaults.circular.cutout.size)
  }
  else if (props.circular && typeof props.circular === 'object') {
    classes.push(props.circular.size || defaults.circular.size)
    classes.push(
      props.circular.cutout?.size || defaults.circular.cutout.size,
    )
  }

  // COLOR
  classes.push(props.color.circleCutout || defaults.color.circleCutout)

  // LOADING
  if (props.loading) {
    classes.push('animate-spin')
  }

  return classes.join(' ')
})

const linearWrapperStyleClass = computed(() => {
  const classes: string[] = []

  // COLOR
  classes.push('overflow-hidden')
  classes.push(props.color.background || defaults.color.background)

  // SIZE
  classes.push(props.size.width || defaults.size.width)
  classes.push(props.size.height || defaults.size.height)

  // ROUNDED
  if (props.rounded) {
    if (typeof props.rounded === 'string') {
      classes.push(props.rounded)
    }
    else {
      classes.push(defaults.rounded)
    }
  }

  return classes.join(' ')
})

const linearStyleClass = computed(() => {
  const classes: string[] = []

  classes.push('relative', 'w-full', 'h-full')

  if (props.loading) {
    // class="relative w-full h-full before:content-[''] before:absolute before:h-full before:bg-red-600 before:animate-indeterminatebefore after:content-[''] after:absolute after:h-full after:bg-red-600 after:animate-indeterminateafter"
    classes.push(
      'before:content-[\'\'] before:absolute before:h-full before:animate-indeterminatebefore after:content-[\'\'] after:absolute after:h-full after:animate-indeterminateafter',
    )

    // COLOR
    classes.push(props.color.secondStrike || defaults.color.secondStrike)
    classes.push(props.color.firstStrike || defaults.color.firstStrike)
  }
  else {
    // COLOR
    classes.push(props.color.linearProgress || defaults.color.linearProgress)
    classes.push(
      props.color.linearProgressHover || defaults.color.linearProgressHover,
    )
    if (props.transition) {
      classes.push('transition-all')
      if (typeof props.transition === 'object') {
        classes.push(props.transition.duration || defaults.transition.duration)
        classes.push(props.transition.ease || defaults.transition.ease)
      }
      else {
        classes.push(defaults.transition.duration)
        classes.push(defaults.transition.ease)
      }
    }
  }

  // ROUNDED
  if (props.rounded) {
    if (typeof props.rounded === 'string') {
      classes.push(props.rounded)
    }
    else {
      classes.push(defaults.rounded)
    }
  }

  return classes.join(' ')
})

const linearProgressStyle = computed(() => {
  if (initialLoadTimeRef.value || !props.initialLoadTime) {
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

    if (props.loading && props.modelValue <= 0) {
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
