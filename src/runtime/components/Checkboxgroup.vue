<template>
  <div :class="config.width">
    <div>
      <div :class="labelStyleClass">
        <slot name="group-label">
          {{ config.label }}
        </slot>
      </div>
      <div :class="descriptionStyleClass">
        <slot name="group-description">
          {{ config.description }}
        </slot>
      </div>
    </div>
    <ul>
      <li
        v-for="(item, index) in config.items"
        :key="index"
        class="pt-2"
      >
        <Checkbox
          v-model="checkboxValues[index]"
          :label="config.generalCheckboxProps?.label || item.label"
          :description="
            config.generalCheckboxProps?.description || item.description
          "
          :color="config.generalCheckboxProps?.color || item.color"
          :text="config.generalCheckboxProps?.text || item.text"
          :disabled="config.disabled || item.disabled"
          :loading="config.loading || item.loading"
          :radio="!config.multiple && !config.noRadio"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Checkbox from './Checkbox.vue'
import type { CheckboxgroupProps } from '../types/props'
import type { CheckboxgroupConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

interface Props extends CheckboxgroupProps {
  // eslint-disable-next-line vue/no-required-prop-with-default
  modelValue: boolean[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  items: undefined,
  multiple: undefined,
  noRadio: undefined,
  loading: undefined,
  disabled: undefined,
  notZero: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<CheckboxgroupConfig>(() => useComponentConfig('checkboxgroup', props))

const emit = defineEmits<{
  (e: 'update:modelValue', id: boolean[]): void
}>()

const checkboxValues = ref<boolean[]>([])
const savedIndex = ref(-1)
const lastCheckedIndex = ref(-1)

initializeCheckboxes()

// watch for changes of the length of config.items
watch(
  () => config.value.items.length,
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
    if (config.value.multiple) {
      if (config.value.notZero) {
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
        else if (trueCount === 0 && config.value.notZero) {
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
  () => config.value.multiple,
  () => {
    if (!config.value.multiple) {
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
  () => config.value.notZero,
  () => {
    if (config.value.notZero) {
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
    if (checkboxValues.value.length < config.value.items.length) {
      checkboxValues.value = checkboxValues.value.concat(
        Array(config.value.items.length - checkboxValues.value.length).fill(false),
      )
      emit('update:modelValue', checkboxValues.value)
    }

    if (!config.value.multiple) {
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
      else if (trueCount == 0 && config.value.notZero) {
        checkboxValues.value[0] = true
        savedIndex.value = 0
      }
    }
  }
}

const labelStyleClass = computed(() => {
  const classes: string[] = []

  classes.push(config.value.text.label)
  classes.push(config.value.color.label)

  return classes.join(' ')
})

const descriptionStyleClass = computed(() => {
  const classes: string[] = []

  classes.push(config.value.text.description)
  classes.push(config.value.color.description)

  return classes.join(' ')
})
</script>
