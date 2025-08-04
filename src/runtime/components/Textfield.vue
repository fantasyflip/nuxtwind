<template>
  <div :class="wrapperClass">
    <div
      v-if="config.prependIcon"
      :class="prependIconClass"
    >
      <slot name="prepend-icon">
        <component
          :is="config.prependIcon"
          v-if="typeof config.prependIcon === 'object'"
        />
      </slot>
    </div>

    <div
      v-if="config.clearable && !config.disabled && !config.loading"
      :class="clearableIconClass"
    >
      <input
        class="cursor-pointer"
        type="button"
        value="X"
        @click="handleReset"
      >
    </div>
    <div
      v-if="config.appendIcon"
      :class="appendIconClass"
    >
      <slot name="append-icon">
        <component
          :is="config.appendIcon"
          v-if="typeof config.appendIcon === 'object'"
        />
      </slot>
    </div>
    <input
      :id="textfieldId"
      ref="textfield"
      :class="inputClass"
      :type="config.type"
      :placeholder="config.placeholder"
      :disabled="config.disabled"
      :value="props.modelValue"
      :autocomplete="autocomplete"
      @input="handleInput"
      @focusin="$emit('focusIn', $event)"
      @focusout="$emit('focusOut', $event)"
    >
    <label
      :for="textfieldId"
      :class="labelClass"
      @click="textfield.value.focus()"
    >
      <slot name="label">{{ config.label }}</slot>
    </label>
    <div
      v-if="
        ((config.hint && config.hint.length > 0)
          || typeof isValid === 'string')
          && !config.disabled
          && !config.loading
      "
      :class="hintClass"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useId } from '#imports'
import type { TextfieldProps } from '../types/props'
import type { TextfieldConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

export interface RequiredTextfieldProps extends TextfieldProps {
  // eslint-disable-next-line vue/no-required-prop-with-default
  modelValue: string
}

const props = withDefaults(defineProps<RequiredTextfieldProps>(), {
  modelValue: '',
  prependIcon: undefined,
  appendIcon: undefined,
  clearable: undefined,
  disabled: undefined,
  loading: undefined,
  rounded: true,
  outlined: false,
  filled: false,
  shadow: true,
  transition: true,
})

// Use computed to make config reactive to prop changes
const config = computed<TextfieldConfig>(() => useComponentConfig('textfield', props))

const textfieldId = useId()

const isValid = ref<boolean | string>(true)

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void
  (e: 'update:validation', id: object): void
  (e: 'focusIn' | 'focusOut' | 'reset'): void
}>()

const textfield = ref(null)

defineExpose({
  textfield,
})

function handleInput(e: Event) {
  // UPDATE MODEL VALUE
  emit('update:modelValue', e.target?.value)

  // VALIDATE INPUT AGAINST RULES
  isValid.value = validate(e.target?.value)

  // EMIT VALIDATION RESULT
  emit('update:validation', {
    isValid: isValid.value === true ? true : false,
    result: isValid.value,
    value: e.target!.value,
    source: {
      name: config.value.label,
      type: 'textfield',
    },
  })
}

const initialModelValue = ref()
onMounted(() => {
  initialModelValue.value = props.modelValue
})

function handleReset() {
  isValid.value = true
  // @ts-expect-error - TS doesn't know about ref
  textfield.value.focus()

  emit('update:modelValue', initialModelValue.value)
  emit('reset')
}

function validate(value: string) {
  if (config.value.rules.length > 0) {
    const rules = config.value.rules
    // go through all rules; return true if all rules are valid; return first error if any rule is invalid
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      if (typeof rule === 'function') {
        const result = rule(value)
        if (result !== true) {
          return result
        }
      }
    }
    return true
  }
  else {
    return true
  }
}

const hint = computed(() => {
  if (isValid.value === true) {
    return config.value.hint
  }
  else {
    return isValid.value
  }
})

const wrapperClass = computed(() => {
  const classes: string[] = []
  classes.push('relative', 'group')

  // DEFAULT
  if (!config.value.outlined && !config.value.filled) {
    classes.push('z-0')
  }

  // DISABLED
  if (config.value.disabled) {
    classes.push('opacity-50', 'cursor-not-allowed')
  }

  // LOADING
  if (config.value.loading) {
    classes.push('cursor-progress', 'animate-pulse')
  }

  // WIDTH
  classes.push(config.value.width)

  return classes.join(' ')
})

const inputClass = computed(() => {
  const classes: string[] = []
  // class='block w-full text-sm text-gray-900 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  classes.push(
    'block',
    'w-full',
    'appearance-none',
    'focus:outline-none',
    'focus:ring-0',
    'peer',
    'placeholder:opacity-0',
    'focus:placeholder:opacity-100',
    'placeholder:transition-opacity',
  )

  // FONT
  classes.push(config.value.font.input)

  // TRANSITION
  if (config.value.transition) {
    classes.push(
      config.value.transition.placeholder.duration,
    )
    classes.push(
      config.value.transition.placeholder.ease,
    )
  }

  // BASIC APPEARANCE

  if (config.value.filled) {
    // FILLED
    classes.push('rounded-t-lg', 'pb-2.5', 'px-2.5', 'pt-5', 'border-0')

    classes.push(config.value.filled)

    // COLOR
    classes.push(config.value.color.bg)

    // ICON
    if (config.value.appendIcon && config.value.clearable) {
      classes.push('pr-12')
    }
    else if (config.value.appendIcon || config.value.clearable) {
      classes.push('pr-8')
    }
    else {
      classes.push('pr-2.5')
    }
    if (config.value.prependIcon) {
      classes.push('pl-8')
    }
    else {
      classes.push('pl-2.5')
    }
  }
  else if (config.value.outlined) {
    // OUTLINED
    classes.push('py-4', 'bg-transparent')
    classes.push(config.value.outlined)

    // ROUNDED
    if (config.value.rounded) {
      classes.push(config.value.rounded)
    }

    // ICON
    if (config.value.appendIcon && config.value.clearable) {
      classes.push('pr-12')
    }
    else if (config.value.appendIcon || config.value.clearable) {
      classes.push('pr-8')
    }
    else {
      classes.push('pr-2.5')
    }
    if (config.value.prependIcon) {
      classes.push('pl-8')
    }
    else {
      classes.push('pl-2.5')
    }
  }
  else {
    // DEFAULT
    classes.push('py-2.5', 'bg-transparent', 'border-0', 'border-b-2')

    // ICON
    if (config.value.appendIcon && config.value.clearable) {
      classes.push('pr-12')
    }
    else if (config.value.appendIcon || config.value.clearable) {
      classes.push('pr-8')
    }
    else {
      classes.push('pr-0')
    }
    if (config.value.prependIcon) {
      classes.push('pl-8')
    }
    else {
      classes.push('pl-0')
    }
  }

  // COLOR
  if (isValid.value === true) {
    classes.push(config.value.color.border)
    classes.push(config.value.color.borderFocus)
  }
  else {
    classes.push(config.value.color.borderError)
    classes.push(
      config.value.color.borderFocusError,
    )
  }

  classes.push(config.value.color.text)
  classes.push(config.value.color.placeholderText)

  // DISABLED
  if (config.value.disabled) {
    classes.push('cursor-not-allowed')
  }

  // LOADING
  if (config.value.loading) {
    classes.push('cursor-progress')
  }

  // SHADOW
  if (config.value.shadow) {
    classes.push(config.value.shadow)
  }

  return classes.join(' ')
})

const labelClass = computed(() => {
  const classes: string[] = []
  classes.push(
    'absolute',
    'transform',
    'scale-75',
    'origin-[0]',
    'peer-placeholder-shown:scale-100',
    'peer-focus:scale-75',
  )

  // FONT
  classes.push(config.value.font.label)

  // TRANSITION
  if (config.value.transition) {
    classes.push(
      config.value.transition.duration,
    )
    classes.push(
      config.value.transition.ease,
    )
  }

  // BASIC APPEARANCE
  if (config.value.filled) {
    // FILLED
    classes.push(
      '-translate-y-4',
      'top-4',
      'peer-focus:top-4',
      'z-10',
      'left-2.5',
      'peer-placeholder-shown:translate-y-0',
      'peer-focus:-translate-y-4',
    )

    // ICON
    if (config.value.prependIcon) {
      classes.push(
        'peer-focus:translate-x-0',
        'peer-placeholder-shown:translate-x-6',
        'peer-placeholder-shown:top-5',
      )
    }
  }
  else if (config.value.outlined) {
    // OUTLINED
    classes.push(
      '-translate-y-4',
      'top-2',
      'z-10',
      'px-2',
      'peer-focus:px-2',
      'peer-placeholder-shown:-translate-y-1/2',
      'peer-placeholder-shown:top-1/2',
      'peer-focus:top-2',
      'peer-focus:-translate-y-4',
      'left-1',
    )

    // COLOR
    classes.push(config.value.color.bg)

    // ICON
    if (config.value.prependIcon) {
      classes.push(
        'peer-focus:translate-x-0',
        'peer-placeholder-shown:translate-x-6',
      )
    }
  }
  else {
    // DEFAULT
    classes.push(
      '-translate-y-6',
      'top-3',
      '-z-10',
      'peer-focus:left-0',
      'peer-placeholder-shown:translate-y-0',
      'peer-focus:-translate-y-6',
    )

    // ICON
    if (config.value.prependIcon) {
      classes.push(
        'peer-focus:translate-x-0',
        'peer-placeholder-shown:translate-x-8',
      )
    }
  }

  // COLOR

  if (isValid.value === true) {
    classes.push(config.value.color.label)
    classes.push(config.value.color.labelFocus)
  }
  else {
    classes.push(config.value.color.error)
  }

  // DISABLED
  if (config.value.disabled) {
    classes.push('cursor-not-allowed')
  }
  else if (config.value.loading) {
    classes.push('cursor-progress')
  }
  else {
    classes.push('cursor-text', 'peer-focus:cursor-default')
  }

  return classes.join(' ')
})

const prependIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  const classes: string[] = []
  classes.push(
    'absolute',
    'inset-y-0',
    'left-0',
    'flex',
    'items-center',
    'pl-2',
    'transition-all',
  )

  // TRANSITION
  if (config.value.transition) {
    classes.push(
      config.value.transition.placeholder.duration,
    )
    classes.push(
      config.value.transition.placeholder.ease,
    )
  }

  if (config.value.filled) {
    classes.push('top-2')
  }

  if (isValid.value === true) {
    classes.push(config.value.color.icon)
    classes.push(config.value.color.iconFocus)
  }
  else {
    classes.push(config.value.color.error)
  }

  // LOADING
  if (config.value.loading) {
    classes.push('animate-pulse')
  }

  return classes.join(' ')
})

const appendIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  const classes: string[] = []
  classes.push(
    'absolute',
    'inset-y-0',
    'right-0',
    'flex',
    'items-center',
    'pr-2',
    'transition-all',
  )

  // TRANSITION
  if (config.value.transition) {
    classes.push(
      config.value.transition.placeholder.duration,
    )
    classes.push(
      config.value.transition.placeholder.ease,
    )
  }

  if (config.value.filled) {
    classes.push('top-2')
  }

  if (isValid.value === true) {
    classes.push(config.value.color.icon)
    classes.push(config.value.color.iconFocus)
  }
  else {
    classes.push(config.value.color.error)
  }

  // LOADING
  if (config.value.loading) {
    classes.push('animate-pulse')
  }

  return classes.join(' ')
})

const clearableIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  const classes: string[] = []
  classes.push(
    'absolute',
    'inset-y-0',
    'flex',
    'items-center',
    'transition-all',
  )

  // APPEND-ICON
  if (config.value.appendIcon) {
    classes.push('right-8')
  }
  else {
    classes.push('right-3')
  }

  // OPACITY
  if (props.modelValue.toString().length > 0 || isValid.value !== true) {
    classes.push('opacity-100')
  }
  else {
    classes.push('opacity-0')
  }

  // TRANSITION
  if (config.value.transition) {
    classes.push(
      config.value.transition.placeholder.duration,
    )
    classes.push(
      config.value.transition.placeholder.ease,
    )
  }

  if (config.value.filled) {
    classes.push('top-2')
  }

  if (isValid.value === true) {
    classes.push(config.value.color.icon)
    classes.push(config.value.color.iconFocus)
  }
  else {
    classes.push(config.value.color.error)
  }

  // LOADING
  if (config.value.loading) {
    classes.push('animate-pulse')
  }

  return classes.join(' ')
})

const hintClass = computed(() => {
  // class="absolute transition-all ease-in-out duration-500 text-xs font-light pl-2 group-focus-within:opacity-100 -translate-y-2 group-focus-within:-translate-y-0 opacity-0"

  const classes = [
    'absolute',
    'font-light',
    'pl-2',
    'group-focus-within:opacity-100',
    'opacity-0',
    'transition-all',
    '-translate-y-2',
    'group-focus-within:-translate-y-0',
  ]

  // FONT
  classes.push(config.value.font.hint)

  if (config.value.transition) {
    classes.push(
      config.value.transition.placeholder.duration,
    )
    classes.push(
      config.value.transition.placeholder.ease,
    )
  }

  if (isValid.value === true) {
    classes.push(config.value.color.hint)
  }
  else {
    classes.push(config.value.color.error)
  }

  return classes.join(' ')
})
</script>
