<template>
  <div
    :id="config.id"
    :ref="config.id"
    role="alert"
    :class="toastWrapperStyleClass"
    class="toast-notification"
  >
    <div class="flex items-center p-4">
      <div :class="iconStyleClass">
        <component
          :is="config.icon"
          v-if="config.icon"
        />
        <div v-else>
          <svg
            v-if="config.type === 'info'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2v6Z"
            />
          </svg>
          <svg
            v-else-if="config.type === 'warning'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="M12 2c-.5 0-1 .19-1.41.59l-8 8c-.79.78-.79 2.04 0 2.82l8 8c.78.79 2.04.79 2.82 0l8-8c.79-.78.79-2.04 0-2.82l-8-8C13 2.19 12.5 2 12 2m-1 5h2v6h-2V7m0 8h2v2h-2v-2Z"
            />
          </svg>
          <svg
            v-else-if="config.type === 'success'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"
            />
          </svg>
          <svg
            v-else-if="config.type === 'error'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68L23 12m-10 5h-2v-2h2v2m0-4h-2V7h2v6Z"
            />
          </svg>
        </div>

        <span class="sr-only">Toast icon</span>
      </div>
      <div class="ml-3 mr-3">
        <div
          v-if="config.title"
          class="font-bold"
        >
          {{ config.title }}
        </div>
        <div
          v-if="config.message"
          class="text-sm font-normal"
        >
          {{ config.message }}
        </div>
      </div>
      <Button
        class="ml-auto"
        icon
        :color="{
          text: 'text-gray-700 dark:text-gray-300',
          iconHover: 'hover:text-gray-400 dark:hover:text-gray-500',
        }"
        ari-label="Close"
        @click="close()"
      >
        <svg
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          data-v-3fc632e9=""
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
      </Button>
    </div>
    <Progress
      v-if="config.autoClose"
      v-model="progressValue"
      :initial-load-time="false"
      :transition="false"
      :color="config.color.progress"
      rounded="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import type { ToastProps } from '../types/props'
import type { ToastConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'
import Progress from './Progress.vue'
import Button from './Button.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  autoClose: undefined,
  rounded: true,
  shadow: true,
  icon: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<ToastConfig>(() => useComponentConfig('toast', props))

const emit = defineEmits<{
  (e: 'close' | 'autoClose'): void
}>()

const progressValue = ref(100)

onMounted(() => {
  if (config.value.autoClose) {
    const progress = setInterval(() => {
      progressValue.value -= 1
      if (progressValue.value <= 0) {
        clearInterval(progress)
        close()
        emit('autoClose')
      }
    }, config.value.duration * 10)
  }
})

watch(() => config.value.autoClose, () => {
  if (config.value.autoClose) {
    const progress = setInterval(() => {
      progressValue.value -= 1
      if (progressValue.value <= 0) {
        clearInterval(progress)
        close()
        emit('autoClose')
      }
    }, config.value.duration * 10)
  }
})

const close = () => {
  emit('close')
}

const toastWrapperStyleClass = computed(() => {
  const classes: string[] = []
  // class="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
  classes.push('overflow-hidden')

  // COLOR
  classes.push(config.value.color.text)
  classes.push(config.value.color.bg)

  // ROUNDED
  if (config.value.rounded) {
    classes.push(config.value.rounded)
  }

  // WIDTH
  classes.push(config.value.width)

  // SHADOW
  if (config.value.shadow) {
    classes.push(config.value.shadow)
  }

  return classes.join(' ')
})

const iconStyleClass = computed(() => {
  const classes: string[] = []
  // class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-green-700"
  classes.push(
    'inline-flex',
    'flex-shrink-0',
    'justify-center',
    'items-center',
    'w-8',
    'h-8',
    'rounded-lg',
  )

  // COLOR
  let iconText = ''
  let iconBg = ''
  if (config.value.type === 'warning') {
    iconText = config.value.color.icon.warning.text
    iconBg = config.value.color.icon.warning.bg
  }
  else if (config.value.type === 'error') {
    iconText = config.value.color.icon.error.text
    iconBg = config.value.color.icon.error.bg
  }
  else if (config.value.type === 'success') {
    iconText = config.value.color.icon.success.text
    iconBg = config.value.color.icon.success.bg
  }
  else {
    iconText = config.value.color.icon.info.text
    iconBg = config.value.color.icon.info.bg
  }

  classes.push(iconText)
  classes.push(iconBg)

  return classes.join(' ')
})
</script>

<style scoped>
.toast-notification {
  transition: all 0.3s ease-in-out;
}
</style>
