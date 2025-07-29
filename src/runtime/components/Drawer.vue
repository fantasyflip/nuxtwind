<template>
  <div
    v-if="props.modelValue && props.overlay"
    :class="overlayClass"
  />
  <aside
    v-if="props.modelValue || props.expandOnHover"
    ref="drawer"
    :class="drawerWrapperClass"
    @mouseenter="hanldeHoverEnter"
    @mouseleave="handleHoverLeave"
  >
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

export interface Props {
  // eslint-disable-next-line vue/no-required-prop-with-default
  modelValue: boolean
  color?: {
    bg?: string
    overlayBg?: string
  }
  absolute?: boolean
  fixed?: boolean
  zIndex?: string
  overlay?: boolean
  disableOverflow?: boolean
  expandOnHover?:
    | boolean
    | {
      width?: string
      hoverWidth?: string
    }
  transition?:
    | boolean
    | {
      duration?: string
      ease?: string
    }
  noMobile?: boolean
  mobileWidth?: number
  border?: boolean | string
  right?: boolean
  permanent?: boolean
  height?: string
  width?: string
}
const defaults = {
  color: {
    bg: 'bg-gray-200 dark:bg-zinc-900',
    overlayBg: 'bg-black/50',
  },
  expandOnHover: {
    width: 'w-12',
    hoverWidth: 'hover:w-80',
  },
  transition: {
    duration: 'duration-300',
    ease: 'ease-in-out',
  },
  border: 'border-r dark:border-zinc-700 border-gray-500',
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  color: () => {
    return {
      bg: 'bg-gray-200 dark:bg-zinc-900',
      overlayBg: 'bg-black/50',
    }
  },
  absolute: false,
  fixed: true,
  zIndex: 'z-[100]',
  overlay: true,
  disableOverflow: true,
  expandOnHover: false,
  transition: true,
  noMobile: false,
  mobileWidth: 768,
  border: true,
  right: false,
  permanent: false,
  height: 'h-screen',
  width: 'w-80',
})

const emit = defineEmits<{
  (e: 'update:modelValue', id: boolean): void
}>()

function setDocumentOverflow(type: string) {
  if (type === 'auto') {
    document.body.classList.remove('overflow-hidden')
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
  }
  else if (type === 'hidden') {
    document.body.classList.add('overflow-hidden')
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  }
}

const permanentComputed = computed(() => {
  return props.permanent
})

watch(permanentComputed, (newVal) => {
  if (newVal) {
    setDocumentOverflow('auto')
  }
  else {
    emit('update:modelValue', false)
  }
})

const modelValueComputed = computed(() => {
  return props.modelValue
})

// watch modelValueComputed
watch(modelValueComputed, (newVal) => {
  if (newVal) {
    if (props.disableOverflow && !props.permanent) {
      setDocumentOverflow('hidden')
    }
  }
})

const drawer = ref(null)

onClickOutside(drawer, () => {
  if (!props.permanent) {
    emit('update:modelValue', false)
    if (props.disableOverflow) {
      setDocumentOverflow('auto')
    }
  }
})

const isMobile = ref(false)
onMounted(() => {
  if (window.innerWidth < props.mobileWidth) {
    isMobile.value = true
  }
  addEventListener('resize', (event) => {
    const w = event.target as Window
    if (w.innerWidth < props.mobileWidth) {
      isMobile.value = true
    }
    else {
      isMobile.value = false
    }
  })
})

function hanldeHoverEnter() {
  if (props.expandOnHover && (!isMobile.value || props.noMobile)) {
    emit('update:modelValue', true)
  }
}

function handleHoverLeave() {
  if (props.expandOnHover && (!isMobile.value || props.noMobile)) {
    emit('update:modelValue', false)
    if (props.disableOverflow && !props.permanent) {
      setDocumentOverflow('auto')
    }
  }
}

const overlayClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'h-full',
    'w-full',
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'z-[99]',
    'overflow-hidden',
  )

  if (props.absolute) {
    classes.push('absolute')
  }
  else if (props.fixed) {
    classes.push('fixed')
  }

  if (props.overlay) {
    classes.push(props.color?.overlayBg || defaults.color.overlayBg)
  }

  return classes.join(' ')
})

const drawerWrapperClass = computed(() => {
  const classes: string[] = []

  classes.push('overflow-y-auto', 'transition-all', 'transform')

  if (props.expandOnHover && (!isMobile.value || props.noMobile)) {
    classes.push('overflow-x-hidden')

    if (typeof props.expandOnHover === 'object') {
      classes.push(props.expandOnHover?.width || defaults.expandOnHover.width)
      classes.push(
        props.expandOnHover?.hoverWidth || defaults.expandOnHover.hoverWidth,
      )
    }
    else {
      classes.push(
        defaults.expandOnHover.width,
        defaults.expandOnHover.hoverWidth,
      )
    }
  }
  else {
    if (props.modelValue) {
      classes.push(props.width)
    }
    else {
      classes.push('w-0')
    }
  }

  if (props.transition) {
    if (typeof props.transition === 'object') {
      classes.push(props.transition?.duration || defaults.transition.duration)
      classes.push(props.transition?.ease || defaults.transition.ease)
    }
    else {
      classes.push(defaults.transition.duration, defaults.transition.ease)
    }
  }

  classes.push(props.color?.bg || defaults.color.bg)

  if (props.absolute) {
    classes.push('absolute', 'top-0')
  }
  else if (props.fixed) {
    classes.push('fixed')
  }

  if (props.border && (props.modelValue || props.expandOnHover)) {
    if (typeof props.border === 'string') {
      classes.push(props.border)
    }
    else {
      classes.push(defaults.border)
    }
  }

  classes.push(props.zIndex)

  classes.push(props.height)

  if (props.right) {
    classes.push('right-0')
  }

  return classes.join(' ')
})
</script>
