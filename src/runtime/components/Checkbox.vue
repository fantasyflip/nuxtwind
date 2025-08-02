<template>
  <div class="flex">
    <div
      :id="checkboxId"
      :class="iconStyleClass"
    >
      <svg
        v-if="props.modelValue && !config.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(false)"
      >
        <path
          fill="currentColor"
          d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
        />
      </svg>
      <svg
        v-else-if="!props.modelValue && !config.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(true)"
      >
        <path
          fill="currentColor"
          d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14Z"
        />
      </svg>
      <svg
        v-if="props.modelValue && config.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(false)"
      >
        <path
          fill="currentColor"
          d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
        />
      </svg>
      <svg
        v-else-if="!props.modelValue && config.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(true)"
      >
        <path
          fill="currentColor"
          d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
        />
      </svg>
    </div>
    <div
      v-if="config.label || $slots.label"
      :class="labelStyleClass"
    >
      <label
        :for="checkboxId"
        :class="config.loading ? '' : 'cursor-pointer'"
        @click="updateModelValue(!props.modelValue)"
      >
        <slot name="label">{{ config.label }}</slot>
      </label>
      <p
        v-if="config.description || $slots.description"
        id="checkbox-description"
        :class="descriptionStyleClass"
      >
        <slot name="description">
          {{ config.description }}
        </slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useId } from '#imports'
import type { CheckboxProps } from '../types/props'
import type { CheckboxConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<CheckboxProps>(), {
  radio: undefined,
  disabled: undefined,
  loading: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<CheckboxConfig>(() => useComponentConfig('checkbox', props))

const checkboxId = useId()

const emit = defineEmits<{
  (e: 'update:modelValue', id: boolean): void
}>()

function updateModelValue(value: boolean) {
  if (config.value.disabled || config.value.loading) return
  emit('update:modelValue', value)
}

const iconStyleClass = computed(() => {
  const classes: string[] = []
  classes.push('flex', 'items-center', 'h-5')

  // COLOR
  if (props.modelValue) {
    classes.push(config.value.color.iconActive)
  }
  else {
    classes.push(config.value.color.iconInactive)
  }

  // DISABLED && LOADING
  if (config.value.disabled) {
    classes.push('cursor-not-allowed')
    classes.push('opacity-50')
  }
  else if (config.value.loading) {
    classes.push('cursor-wait')
    classes.push('animate-pulse')
  }
  else {
    classes.push('cursor-pointer')
    classes.push(config.value.color.hover)
  }

  return classes.join(' ')
})

const labelStyleClass = computed(() => {
  const classes: string[] = []
  classes.push('ml-2')

  classes.push(config.value.text.label)
  classes.push(config.value.color.label)

  if (config.value.disabled) {
    classes.push('cursor-not-allowed')
    classes.push('opacity-50')
  }
  else if (config.value.loading) {
    classes.push('cursor-wait')
    classes.push('animate-pulse')
  }
  else {
    classes.push('cursor-pointer')
    classes.push(config.value.color.hover)
  }

  return classes.join(' ')
})

const descriptionStyleClass = computed(() => {
  const classes: string[] = []

  classes.push(config.value.text.description)
  classes.push(config.value.color.description)

  return classes.join(' ')
})
</script>
