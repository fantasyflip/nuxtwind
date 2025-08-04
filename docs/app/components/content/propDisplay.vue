<template>
  <div class="pb-8">
    <div class="flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <slot unwrap="p" />
        <div class="flex gap-2">
          <div
            v-for="(propType, index) in computedTypes"
            :key="propType"
            class="flex pt-5"
          >
            <div class="text-green-500 dark:text-green-500 font-light">
              {{ propType }}
            </div>
            <div
              v-if="index != computedTypes.length - 1"
              class="pl-1 -mr-1"
            >
              |
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="computedRequired"
        class="text-white/50 font-light"
      >
        required
      </div>
    </div>

    <!-- Debug info (disabled for production) -->
    <div
      v-if="false"
      class="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs"
    >
      <div>Component: {{ componentName }}</div>
      <div>Prop: {{ props.prop }}</div>
      <div>PropInfo: {{ JSON.stringify(propInfo, null, 2) }}</div>
      <div>ComputedDefault: {{ JSON.stringify(computedDefault, null, 2) }}</div>
      <div>ComputedTypes: {{ JSON.stringify(computedTypes, null, 2) }}</div>
      <div>ComputedRequired: {{ computedRequired }}</div>
      <div>HasDefault: {{ hasDefault }}</div>
    </div>

    <div
      class="flex"
      :class="props.defaultTop ? 'flex-col-reverse' : 'flex-col'"
    >
      <ClientOnly>
        <slot
          name="description"
          unwrap="p"
        />
      </ClientOnly>

      <div
        v-if="hasDefault"
        :class="!props.defaultTop ? 'pt-2' : ''"
      >
        <div class="font-semibold">
          Default
        </div>
        <div
          v-if="typeof computedDefault === 'object' && computedDefault !== null"
        >
          <MDCRenderer
            v-if="formattedDefaultCode"
            :body="formattedDefaultCode.body"
            :data="formattedDefaultCode.data"
          />
        </div>
        <div
          v-else
          class="font-light"
          :class="defaultValueClasses"
        >
          {{ computedDefault }}
        </div>
      </div>

      <div
        v-if="unionValues && unionValues.length > 0"
        class="pt-2"
      >
        <div class="font-semibold">
          Possible Values
        </div>
        <div class="flex gap-1 flex-wrap">
          <code
            v-for="value in unionValues"
            :key="value"
            class="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
          >
            {{ value }}
          </code>
        </div>
      </div>

      <div
        v-if="props.example"
        class="pt-4"
      >
        <div class="font-semibold">
          Example
        </div>
        <div
          v-if="typeof props.example == 'object'"
        >
          <slot name="example" />
        </div>
        <div
          v-else
          class="font-light"
          :class="exampleValueClasses"
        >
          {{ props.example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { hash } from 'ohash'

// Import generated prop types
import propTypesData from '../../../generated/prop-types.json'

interface Props {
  // New automatic approach (preferred)
  component?: string
  prop?: string // The actual prop name in camelCase

  // Legacy manual approach (fallback)
  name?: string
  required?: boolean
  types?: string[]
  default?: string | object | boolean | number
  defaultTop?: boolean
  example?: string | object | boolean | number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  types: () => ['string'],
  defaultTop: false,
  default: undefined
})

const route = useRoute()
const { $prettier } = useNuxtApp()

// Auto-detect component from route if not specified
const componentName = computed(() => {
  if (props.component) return props.component

  // Extract from route path (e.g., /components/button -> button)
  const pathParts = route.path.split('/')
  const lastPart = pathParts[pathParts.length - 1]
  return lastPart
})

// Get prop information from extracted types
const propInfo = computed(() => {
  if (!props.prop || !componentName.value) return null

  const componentTypes = propTypesData.types[componentName.value]
  if (!componentTypes) {
    console.warn(`PropDisplay: No types found for component "${componentName.value}"`)
    return null
  }

  const propData = componentTypes[props.prop]
  if (!propData) {
    console.warn(`PropDisplay: No prop "${props.prop}" found for component "${componentName.value}"`)
    console.warn('Available props:', Object.keys(componentTypes))
    return null
  }

  return propData
})

// Get the actual default value from defaults file
const computedDefault = computed(() => {
  // Manual override takes precedence

  if (props.default !== undefined) return props.default

  if (props.prop && componentName.value) {
    const defaults = propTypesData.defaults[componentName.value]
    if (!defaults) {
      console.warn(`PropDisplay: No defaults found for component "${componentName.value}"`)
      return undefined
    }

    // Use direct property access instead of nested property for better reliability
    const defaultValue = defaults[props.prop]
    return defaultValue
  }

  return undefined
})

// Get types from extracted data or fallback to manual
const computedTypes = computed(() => {
  // Manual override takes precedence
  if (props.types && props.types.length > 0 && props.types[0] !== 'string') {
    return props.types
  }

  if (propInfo.value) {
    return propInfo.value.types
  }

  return ['string']
})

// Get union values for literal types
const unionValues = computed(() => {
  return propInfo.value?.unionValues || null
})

// Check if prop is required
const computedRequired = computed(() => {
  // Manual override takes precedence
  if (props.required !== undefined) return props.required

  if (propInfo.value) {
    return propInfo.value.required
  }

  return false
})

// Fixed hasDefault logic
const hasDefault = computed(() => {
  const defaultVal = computedDefault.value
  return defaultVal !== undefined && defaultVal !== null
})

// Style classes for different value types
const defaultValueClasses = computed(() => ({
  'text-green-500 dark:text-green-500': typeof computedDefault.value === 'string',
  'text-red-500 dark:text-red-500': typeof computedDefault.value === 'boolean' && !computedDefault.value,
  'text-orange-500 dark:text-orange-500': typeof computedDefault.value === 'boolean' && computedDefault.value,
  'text-blue-500 dark:text-blue-500': typeof computedDefault.value === 'number'
}))

const exampleValueClasses = computed(() => ({
  'text-green-500 dark:text-green-500': typeof props.example === 'string',
  'text-red-500 dark:text-red-500': typeof props.example === 'boolean' && !props.example,
  'text-orange-500 dark:text-orange-500': typeof props.example === 'boolean' && props.example,
  'text-blue-500 dark:text-blue-500': typeof props.example === 'number'
}))

// Format complex default objects as code
const { data: formattedDefaultCode } = await useAsyncData(
  `formatted-default-${componentName.value}-${props.prop}-${hash(computedDefault.value)}`,
  async () => {
    if (typeof computedDefault.value !== 'object' || computedDefault.value === null) return null

    const code = `\`\`\`ts\n${JSON.stringify(computedDefault.value, null, 2)}\n\`\`\``

    try {
      const formatted = await $prettier.format(code, {
        parser: 'markdown',
        trailingComma: 'none',
        semi: false,
        singleQuote: true
      })
      return parseMarkdown(formatted)
    } catch (e) {
      console.warn('PropDisplay: Error formatting code:', e)
      return parseMarkdown(code)
    }
  },
  { watch: [computedDefault] }
)
</script>
