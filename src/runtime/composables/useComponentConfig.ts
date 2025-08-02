import type { ButtonProps } from '../types/props'
import type { ButtonConfig } from '../types/merged'
import type { NuxtWindConfig } from '../types/config'
import buttonDefaults from '../defaults/button'
import { useRuntimeConfig } from '#app'

// Generic type mapping for component props to config types
interface ComponentTypeMap {
  Button: {
    Props: ButtonProps
    Config: ButtonConfig
  }
  // Future components can be added here
  // Progress: {
  //   Props: ProgressProps
  //   Config: ProgressConfig
  // }
}

// Define which props are boolean-only vs boolean-or-other for each component
const booleanOnlyProps = {
  Button: new Set(['disabled', 'icon', 'loading', 'dense']),
  // Future components can be added here
} as const

// Deep merge utility function with intelligent boolean handling
// prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge<T extends Record<string, any>>(target: T, source: any, componentName: keyof typeof booleanOnlyProps): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = { ...target }
  const booleanOnlySet = booleanOnlyProps[componentName]

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = result[key]

      // Skip undefined values - keep the default
      if (sourceValue === undefined) {
        continue
      }

      // Handle boolean values based on prop type
      if (typeof sourceValue === 'boolean') {
        if (booleanOnlySet.has(key)) {
          // For boolean-only props, keep the boolean value as is
          result[key] = sourceValue
        }
        else {
          // For boolean-or-other props: false = empty string, true = default
          if (sourceValue === false) {
            result[key] = ''
          }
          else {
            // sourceValue === true, keep the default (targetValue)
            result[key] = targetValue
          }
        }
      }
      else if (
        sourceValue !== null
        && typeof sourceValue === 'object'
        && !Array.isArray(sourceValue)
        && targetValue !== null
        && typeof targetValue === 'object'
        && !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue, componentName)
      }
      else {
        // Direct assignment for strings, numbers, etc.
        result[key] = sourceValue
      }
    }
  }

  return result as T
}

// Component defaults registry
const defaultsRegistry = {
  Button: buttonDefaults,
  // Future components can be added here
  // Progress: progressDefaults,
} as const

export default function useComponentConfig<K extends keyof ComponentTypeMap>(
  componentName: K,
  props: ComponentTypeMap[K]['Props'],
): ComponentTypeMap[K]['Config'] {
  // Get the defaults for the component
  const defaults = defaultsRegistry[componentName] as ComponentTypeMap[K]['Config']

  if (!defaults) {
    throw new Error(`No defaults found for component: ${componentName}`)
  }

  const runtimeConfig = useRuntimeConfig()
  const userConfig = (runtimeConfig.public.nuxtwind || {}) as NuxtWindConfig

  // Get the specific component config from user config using the correct key
  const componentUserConfig = userConfig[componentName] || {}

  // Priority order: defaults (lowest) -> user config (medium) -> props (highest)
  // Step 1: Merge defaults with user config
  const mergedWithUserConfig = deepMerge(defaults, componentUserConfig, componentName)

  // Step 2: Merge result with props (highest priority)
  return deepMerge(mergedWithUserConfig, props || {}, componentName)
}
