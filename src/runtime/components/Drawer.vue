<template>
  <div
    v-if="props.modelValue && config.overlay"
    :class="overlayClass"
  />
  <aside
    v-if="props.modelValue || config.expandOnHover"
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
import type { DrawerProps } from '../types/props'
import type { DrawerConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

export interface RequiredDrawerProps extends DrawerProps {
  // eslint-disable-next-line vue/no-required-prop-with-default
  modelValue: boolean
}

const props = withDefaults(defineProps<RequiredDrawerProps>(), {
  modelValue: false,
  expandOnHover: undefined,
  transition: undefined,
  border: undefined,
  absolute: undefined,
  fixed: undefined,
  overlay: undefined,
  disableOverflow: undefined,
  noMobile: undefined,
  right: undefined,
  permanent: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<DrawerConfig>(() => useComponentConfig('drawer', props))

console.log('Drawer config:', config.value)

const emit = defineEmits<{
  (e: 'update:modelValue', id: boolean): void
}>()

function setDocumentOverflow(type: string) {
  if (type === 'auto') {
    document.body.classList.remove('overflow-hidden')
    document.getElementsByTagName('html')[0]!.style.overflow = 'auto'
  }
  else if (type === 'hidden') {
    document.body.classList.add('overflow-hidden')
    document.getElementsByTagName('html')[0]!.style.overflow = 'hidden'
  }
}

const permanentComputed = computed(() => {
  return config.value.permanent
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
    if (config.value.disableOverflow && !config.value.permanent) {
      setDocumentOverflow('hidden')
    }
  }
})

const drawer = ref(null)

onClickOutside(drawer, () => {
  if (!config.value.permanent) {
    emit('update:modelValue', false)
    if (config.value.disableOverflow) {
      setDocumentOverflow('auto')
    }
  }
})

const isMobile = ref(false)
onMounted(() => {
  if (window.innerWidth < config.value.mobileWidth) {
    isMobile.value = true
  }
  addEventListener('resize', (event) => {
    const w = event.target as Window
    if (w.innerWidth < config.value.mobileWidth) {
      isMobile.value = true
    }
    else {
      isMobile.value = false
    }
  })
})

function hanldeHoverEnter() {
  if (config.value.expandOnHover && (!isMobile.value || config.value.noMobile)) {
    emit('update:modelValue', true)
  }
}

function handleHoverLeave() {
  if (config.value.expandOnHover && (!isMobile.value || config.value.noMobile)) {
    emit('update:modelValue', false)
    if (config.value.disableOverflow && !config.value.permanent) {
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

  if (config.value.absolute) {
    classes.push('absolute')
  }
  else if (config.value.fixed) {
    classes.push('fixed')
  }

  if (config.value.overlay) {
    classes.push(config.value.color.overlayBg)
  }

  return classes.join(' ')
})

const drawerWrapperClass = computed(() => {
  const classes: string[] = []

  classes.push('overflow-y-auto', 'transition-all', 'transform')

  if (config.value.expandOnHover && (!isMobile.value || config.value.noMobile)) {
    classes.push('overflow-x-hidden')

    if (typeof props.expandOnHover === 'object') {
      classes.push(props.expandOnHover?.width || config.value.expandOnHover.width)
      classes.push(
        props.expandOnHover?.hoverWidth || config.value.expandOnHover.hoverWidth,
      )
    }
    else {
      classes.push(
        config.value.expandOnHover.width,
        config.value.expandOnHover.hoverWidth,
      )
    }
  }
  else {
    if (props.modelValue) {
      classes.push(config.value.width)
    }
    else {
      classes.push('w-0')
    }
  }

  if (config.value.transition) {
    classes.push(config.value.transition.duration, config.value.transition.ease)
  }

  classes.push(config.value.color.bg)

  if (config.value.absolute) {
    classes.push('absolute', 'top-0')
  }
  else if (config.value.fixed) {
    classes.push('fixed')
  }

  if (config.value.border && (props.modelValue || config.value.expandOnHover)) {
    classes.push(config.value.border)
  }

  classes.push(config.value.zIndex)

  classes.push(config.value.height)

  if (config.value.right) {
    classes.push('right-0')
  }

  return classes.join(' ')
})
</script>
