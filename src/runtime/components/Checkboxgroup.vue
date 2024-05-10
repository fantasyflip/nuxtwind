<template>
  <div :class="props.width">
    <div>
      <slot name="group-label">
        <div :class="labelStyleClass">
          {{ props.label }}
        </div>
      </slot>
      <slot name="group-description">
        <div :class="descriptionStyleClass">
          {{ props.description }}
        </div>
      </slot>
    </div>
    <ul>
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="pt-2"
      >
        <Checkbox
          v-model="checkboxValues[index]"
          :label="props.generalCheckboxProps?.label || item.label"
          :description="
            props.generalCheckboxProps?.description || item.description
          "
          :color="props.generalCheckboxProps?.color || item.color"
          :text="props.generalCheckboxProps?.text || item.text"
          :disabled="props.disabled || item.disabled"
          :loading="props.loading || item.loading"
          :radio="!props.multiple && !props.noRadio"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Checkbox from './Checkbox.vue'

export interface Props {
  modelValue: boolean[]
  items?: {
    label?: string
    description?: string
    color?: {
      label?: string
      description?: string
      iconInactive?: string
      iconActive?: string
      hover?: string
    }
    text?: {
      label?: string
      description?: string
    }
    disabled?: boolean
    loading?: boolean
  }[]
  color?: {
    label?: string
    description?: string
  }
  text?: {
    label?: string
    description?: string
  }
  label?: string
  description?: string
  multiple?: boolean
  noRadio?: boolean
  loading?: boolean
  disabled?: boolean
  width?: string
  generalCheckboxProps?: {
    label?: string
    description?: string
    color?: {
      label?: string
      description?: string
      iconInactive?: string
      iconActive?: string
      hover?: string
    }
    text?: {
      label?: string
      description?: string
    }
    disabled?: boolean
    loading?: boolean
  }
  notZero?: boolean
}

const defaults = {
  color: {
    label: 'text-primary-500 dark:text-primary-500',
    description: 'text-gray-500 dark:text-gray-400',
  },
  text: {
    label: 'text-lg font-medium',
    description: 'text-sm',
  },
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return []
  },
  items: () => {
    return []
  },
  color: () => {
    return {
      label: 'text-primary-500 dark:text-primary-500',
      description: 'text-gray-500 dark:text-gray-400',
    }
  },
  text: () => {
    return {
      label: 'text-lg font-medium',
      description: 'text-sm',
    }
  },
  label: '',
  description: '',
  multiple: false,
  noRadio: false,
  loading: false,
  disabled: false,
  width: 'w-full',
  generalCheckboxProps: () => {
    return {}
  },
  notZero: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', id: boolean[]): void
}>()

const checkboxValues = ref<boolean[]>([])
const savedIndex = ref(-1)
const lastCheckedIndex = ref(-1)

initializeCheckboxes()

// watch for changes of the length of props.items
watch(
  () => props.items.length,
  () => {
    initializeCheckboxes()
  },
)

watch(
  () => props.modelValue,
  (newValues) => {
    checkboxValues.value = newValues
  },
  { deep: true },
)

watch(
  checkboxValues,
  (newValues) => {
    if (props.multiple) {
      if (props.notZero) {
        const trueCount = newValues.filter(value => value).length
        if (trueCount === 1) {
          lastCheckedIndex.value = newValues.findIndex(
            value => value === true,
          )
        }
        else if (trueCount === 0) {
          newValues[lastCheckedIndex.value] = true
        }
      }
      emit('update:modelValue', newValues)
    }
    else {
      if (savedIndex.value != -1) {
        // count how often true is in the array
        const trueCount = newValues.filter(value => value).length
        if (trueCount > 1) {
          // if more than one checkbox is true, set all to false except the one that is not savedIndex
          newValues[savedIndex.value] = false
          savedIndex.value = checkboxValues.value.findIndex(
            value => value === true,
          )
        }
        else if (trueCount === 0 && props.notZero) {
          for (let i = 0; i < newValues.length; i++) {
            if (i != savedIndex.value) {
              newValues[i] = false
            }
          }
          newValues[savedIndex.value] = true
        }
        emit('update:modelValue', newValues)
      }
    }
  },
  { deep: true },
)

// if multiple gets changed to false, check if more than one checkbox is true
watch(
  () => props.multiple,
  () => {
    if (!props.multiple) {
      // count how often true is in the array
      const trueCount = checkboxValues.value.filter(value => value).length
      if (trueCount > 1) {
        const values = checkboxValues.value
        for (let i = 0; i < values.length; i++) {
          if (i != savedIndex.value) {
            values[i] = false
          }
        }
        checkboxValues.value = values
      }
    }
  },
)

// if notZero gets changed to true, check if no checkbox is true
watch(
  () => props.notZero,
  () => {
    if (props.notZero) {
      const trueCount = checkboxValues.value.filter(value => value).length
      if (trueCount === 0) {
        checkboxValues.value[0] = true
        savedIndex.value = 0
      }
    }
  },
)

function initializeCheckboxes() {
  if (props.modelValue) {
    checkboxValues.value = props.modelValue
    if (checkboxValues.value.length < props.items.length) {
      checkboxValues.value = checkboxValues.value.concat(
        Array(props.items.length - checkboxValues.value.length).fill(false),
      )
      emit('update:modelValue', checkboxValues.value)
    }

    if (!props.multiple) {
      savedIndex.value = checkboxValues.value.findIndex(
        value => value === true,
      )
      // count hof often true is in the array
      const trueCount = checkboxValues.value.filter(value => value).length
      if (trueCount > 1) {
        const values = checkboxValues.value
        for (let i = 0; i < values.length; i++) {
          if (i != savedIndex.value) {
            values[i] = false
          }
        }
        checkboxValues.value = values
      }
      else if (trueCount == 0 && props.notZero) {
        checkboxValues.value[0] = true
        savedIndex.value = 0
      }
    }
  }
}

const labelStyleClass = computed(() => {
  const classes: string[] = []

  classes.push(props.text?.label || defaults.text.label)

  // COLOR
  classes.push(props.color?.label || defaults.color.label)

  return classes.join(' ')
})

const descriptionStyleClass = computed(() => {
  const classes: string[] = []

  classes.push(props.text?.description || defaults.text.description)

  // COLOR
  classes.push(props.color?.description || defaults.color.description)

  return classes.join(' ')
})
</script>
