<template>
  <div
    ref="selectWrapper"
    class="relative"
    :class="config.width.textfield"
  >
    <Textfield
      ref="select"
      v-model="selectSearch"
      autocomplete="off"
      :outlined="config.outlined"
      :filled="config.filled"
      :disabled="config.disabled"
      :placeholder="config.placeholder"
      :color="config.color.textfield"
      :loading="config.loading"
      :width="config.width.textfield"
      :label="config.label"
      :transition="config.transition"
      :append-icon="config.appendIcon"
      :prepend-icon="config.prependIcon"
      :clearable="
        config.search && config.clearable && !config.disabled && !config.loading
      "
      :font="config.font"
      @click="config.disabled || config.loading ? '' : (showSelectOptions = true)"
      @focus-in="handleFocusIn"
      @reset="handleReset"
      @keydown="handleKeyDown"
    >
      <template
        v-if="config.prependIcon"
        #prepend-icon
      >
        <slot name="prepend-icon">
          <component :is="config.prependIcon" />
        </slot>
      </template>
      <template
        v-if="config.appendIcon"
        #append-icon
      >
        <slot name="append-icon">
          <component :is="config.appendIcon" />
        </slot>
      </template>
      <template #label>
        <slot name="label" />
      </template>
    </Textfield>
    <div
      v-if="showSelectOptions"
      :class="dropDownStyleCass"
    >
      <div
        v-for="(item, index) in selectItems"
        :key="index"
        :class="itemStyleClass"
        @click.stop="setItem(item)"
      >
        <slot
          v-bind="typeof item == 'object' ? item : { content: item }"
          name="item"
        >
          <div class="p-2">
            {{
              typeof config.items[0] == "object" && config.displayProperty
                ? item[config.displayProperty]
                : item
            }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import Textfield from './Textfield.vue'
import type { SelectProps } from '../types/props'
import type { SelectConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  items: () => [],
  search: undefined,
  markOnFocus: undefined,
  showAllOnFocus: undefined,
  outlined: undefined,
  filled: undefined,
  disabled: undefined,
  loading: undefined,
  transition: undefined,
  shadow: undefined,
  clearable: undefined,
})

// Use computed to make config reactive to prop changes
const config = computed<SelectConfig>(() => useComponentConfig('select', props))

const emit = defineEmits<{
  (e: 'update:modelValue', id: string | object): void
}>()

const select = ref(null)
const selectWrapper = ref(null)

defineExpose({
  // // @ts-expect-error - TS doesn't know about ref
  select,
})

const showSelectOptions = ref(false)
const selectSearch = ref('')
const lastValidItem = ref()

// watch modelValue to update on programmatic change
watch(
  () => props.modelValue,
  (newValue) => {
    setItem(newValue)
  },
)

onMounted(() => {
  // handle initial value
  if (props.modelValue) {
    lastValidItem.value = props.modelValue
    if (typeof props.modelValue == 'object' && config.value.displayProperty) {
      selectSearch.value = props.modelValue[config.value.displayProperty]
    }
    else {
      selectSearch.value = props.modelValue
    }
  }

  // handle click outside of select
  window.addEventListener('click', function (e) {
    if (
      selectWrapper.value
      // @ts-expect-error - TS doesn't know about ref
      && !selectWrapper.value.contains(e.target as Node)
    ) {
      showSelectOptions.value = false

      if (config.value.search) {
        // check if search is valid

        // if input is an object, search through the displayProperty
        if (
          typeof props.modelValue == 'object'
          && config.value.displayProperty
          && props.modelValue[config.value.displayProperty] != selectSearch.value
        ) {
          // invalid search
          emit('update:modelValue', lastValidItem.value)
          selectSearch.value = lastValidItem.value[config.value.displayProperty]
        }
        else if (
          typeof props.modelValue != 'object'
          && props.modelValue != selectSearch.value
        ) {
          // invalid search
          emit('update:modelValue', lastValidItem.value)
          selectSearch.value = lastValidItem.value
        }
      }
    }
  })
})

const showAllItemsNextRun = ref(false)

const selectItems = computed(() => {
  if (!config.value.search || showAllItemsNextRun.value) {
    // no search through items -> just hand over items
    if (typeof config.value.items[0] == 'object' && !config.value.displayProperty) {
      return 'Please provide a displayProperty when using objects as items'.split(
        ' ',
      )
    }
    return config.value.items
  }
  else {
    // search through items -> return items that match search
    // if input is an object, search through the displayProperty
    if (typeof config.value.items[0] == 'object') {
      if (config.value.displayProperty) {
        return config.value.items.filter(item =>
          item[config.value.displayProperty!].toString()
            .toLowerCase()
            .includes(selectSearch.value.toLowerCase()),
        )
      }
      else {
        return 'Please provide a displayProperty when using objects as items'.split(
          ' ',
        )
      }
    }
    else {
      return config.value.items.filter(item =>
        item.toLowerCase().includes(selectSearch.value.toLowerCase()),
      )
    }
  }
})

const initialModelValue = ref()
const nextUpdateIsReset = ref(false)
onMounted(() => {
  initialModelValue.value = props.modelValue
})

function handleReset() {
  nextUpdateIsReset.value = true
  selectSearch.value = ''
  emit('update:modelValue', initialModelValue.value)
  // @ts-expect-error - TS doesn't know about ref
  select.value.textfield.focus()
}

function handleFocusIn(event: FocusEvent) {
  if (config.value.showAllOnFocus) {
    showAllItemsNextRun.value = true
  }
  if (!event.target) return
  if (config.value.markOnFocus) {
    // @ts-expect-error - select exists!
    event.target.select()
  }
  showSelectOptions.value = true
}

function handleKeyDown(event: KeyboardEvent) {
  // if the key is a letter or number, filter items again
  if (config.value.showAllOnFocus && event.key.length == 1) {
    showAllItemsNextRun.value = false
  }
}

function setItem(item: string | object) {
  if (typeof config.value.items[0] == 'object' && config.value.displayProperty) {
    selectSearch.value = item[config.value.displayProperty]
  }
  else {
    selectSearch.value = item
  }

  lastValidItem.value = item
  emit('update:modelValue', item)
  if (nextUpdateIsReset.value) {
    nextUpdateIsReset.value = false
    showSelectOptions.value = true
  }
  else {
    showSelectOptions.value = false
  }
}

const dropDownStyleCass = computed(() => {
  const classes: string[] = []
  // class="overflow-auto w-full max-h-48 z-50 absolute shadow-xl"
  classes.push('overflow-auto', 'z-50', 'absolute')

  // WIDTH
  classes.push(config.value.width.select)

  // HEIGHT
  classes.push(config.value.height)

  // SHADOW
  if (config.value.shadow) {
    classes.push(config.value.shadow)
  }

  // COLOR
  classes.push(config.value.color.bg)

  // search
  if (!config.value.search) {
    if (config.value.outlined) {
      classes.push('top-3', 'max-w-[96%]', 'left-1')
    }
    else if (config.value.filled) {
      classes.push('top-5')
    }
    else {
      classes.push('top-2')
    }
  }

  return classes.join(' ')
})

const itemStyleClass = computed(() => {
  const classes: string[] = []
  // class='border-b'
  classes.push('border-b')

  // WIDTH
  classes.push(config.value.width.select)

  // COLOR
  classes.push(config.value.color.border)
  classes.push(config.value.color.text)
  classes.push(config.value.color.hover)

  return classes.join(' ')
})
</script>
