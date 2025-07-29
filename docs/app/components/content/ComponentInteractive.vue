<template>
  <div class="my-5">
    <div class="relative">
      <div
        v-if="formOptions.length || slotOptions.length"
        class="flex flex-wrap items-center gap-2.5 border border-muted border-b-0 relative rounded-t-md px-4 py-2.5 overflow-x-auto"
      >
        <template
          v-for="option in formOptions"
          :key="option.name"
        >
          <UFormField
            :label="option.label"
            size="sm"
            class="inline-flex ring ring-accented rounded-sm"
            :ui="{
              wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-accented',
              label: 'text-muted px-2 py-1.5',
              container: 'mt-0',
            }"
          >
            <USelect
              v-if="option.items?.length"
              :model-value="getComponentProp(option.name)"
              :items="option.items"
              value-key="value"
              color="neutral"
              variant="soft"
              class="rounded-sm rounded-l-none min-w-12"
              :class="[option.name.toLowerCase().endsWith('color') && 'pl-6']"
              :ui="{ itemLeadingChip: 'size-2' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
            <UInput
              v-else
              :type="option.type?.includes('number') && typeof getComponentProp(option.name) === 'number' ? 'number' : 'text'"
              :model-value="getComponentProp(option.name)"
              color="neutral"
              variant="soft"
              :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
          </UFormField>
        </template>
        <template
          v-for="slotOption in slotOptions"
          :key="slotOption.name"
        >
          <UFormField
            :label="`#${slotOption.label}`"
            size="sm"
            class="inline-flex ring ring-accented rounded-sm"
            :ui="{
              wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-accented',
              label: 'text-muted px-2 py-1.5',
              container: 'mt-0',
            }"
          >
            <UInput
              :model-value="getSlotContent(slotOption.name)"
              color="neutral"
              variant="soft"
              :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
              @update:model-value="setSlotContent(slotOption.name, $event)"
            />
          </UFormField>
        </template>
      </div>
      <div
        v-if="component"
        class="w-full border border-b-0 border-muted relative p-4 z-[1]"
        :class="[!formOptions.length && !slotOptions.length && 'rounded-t-md', props.class]"
      >
        <component
          :is="component"
          v-bind="componentProps"
          @update:model-value="handleModelValueUpdate"
        >
          <template
            v-for="slot in Object.keys(allButDefaultSlots)"
            :key="slot"
            #[slot]
          >
            {{ allButDefaultSlots[slot] }}
          </template>
          <template
            v-for="slot in Object.keys(editableSlots)"
            :key="slot"
            #[slot]
          >
            {{ editableSlots[slot] }}
          </template>
          <template v-if="slotComponent">
            <component :is="slotComponent" />
          </template>
          <slot v-if="props.useDefaultSlot" />
        </component>
      </div>
      <MDCRenderer
        v-if="formattedCode"
        :body="formattedCode.body"
        :data="formattedCode.data"
        class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { camelCase, upperFirst, kebabCase } from 'scule'
import { get, set } from '#ui/utils'
import { hash } from 'ohash'

export interface Props {
  slug?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: { [key: string]: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slots?: { [key: string]: any }
  class?: string
  slotComponentSlug?: string
  optionSlots?: { [key: string]: string }
  /** List of props to ignore in selection */
  ignore?: string[]
  /** List of props to externalize in script setup */
  external?: string[]
  useDefaultSlot?: boolean
  defaultSlotCode?: string
  /** List of props to hide in the codeDisplay on the component */
  hide?: string[]
  /** Predefined select options for specific props */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectOptions?: { [key: string]: Array<{ value: any, label: string }> }
}

const props = withDefaults(defineProps<Props>(), {
  slug: undefined,
  props: undefined,
  slots: undefined,
  class: 'flex justify-center',
  slotComponentSlug: undefined,
  optionSlots: undefined,
  ignore: undefined,
  external: undefined,
  useDefaultSlot: false,
  defaultSlotCode: '',
  hide: undefined,
  selectOptions: undefined,
})

const { $prettier } = useNuxtApp()

const route = useRoute()
const routeName = props.slug ?? route.path.split('/').pop() ?? ''
const camelCaseComponentName = camelCase(routeName)
const componentName = upperFirst(camelCaseComponentName)
const templateName = 'NXW-' + componentName

// TODO: Handle import via alias
const component = defineAsyncComponent(() => import(`../../../../src/runtime/components/${componentName}.vue`))

const slotComponent = props.slotComponentSlug
  ? defineAsyncComponent(() => import(`../../../../src/runtime/components/${props.slotComponentSlug}.vue`))
  : undefined

// Make component props reactive
const componentProps = reactive({
  ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
    return [key, value]
  })),
})

// Make editable slots reactive
const editableSlots = reactive({
  ...Object.fromEntries(Object.entries(props.optionSlots || {}).map(([key, value]) => {
    return [key, value]
  })),
})

const allButDefaultSlots = Object.fromEntries(
  Object.entries(props.slots || {}).filter(([key]) => key !== 'default'),
)

// Helper functions to get and set component props
function getComponentProp(name: string) {
  return get(componentProps, name) ?? undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setComponentProp(name: string, value: any) {
  set(componentProps, name, value)
}

// Helper functions to get and set slot content
function getSlotContent(name: string) {
  return get(editableSlots, name) ?? ''
}

function setSlotContent(name: string, value: string) {
  set(editableSlots, name, value)
}

// Handle modelValue updates from the component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleModelValueUpdate(value: any) {
  if ('modelValue' in componentProps) {
    componentProps.modelValue = value
  }
}

const formOptions = computed(() => {
  return Object.entries(props.props || {})
    .filter(([key]) => !props.ignore?.includes(key)) // Filter out ignored props
    .map(([key, value]) => {
      const optionType = typeof value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let items: any[] | undefined = undefined

      // Check if there are predefined select options for this prop
      if (props.selectOptions?.[key]) {
        items = props.selectOptions[key]
      }
      else if (optionType === 'boolean') {
        items = [
          { value: true, label: 'true' },
          { value: false, label: 'false' },
        ]
      }

      return {
        label: kebabCase(key),
        name: key,
        value: value,
        type: optionType,
        items: items,
      }
    })
})

const slotOptions = computed(() => {
  return Object.entries(props.optionSlots || {}).map(([key, value]) => {
    return {
      label: kebabCase(key),
      name: key,
      value: value,
    }
  })
})

// Update the code display to reflect current prop values
const codeDisplay = computed(() => {
  let code = `\`\`\`vue`

  code += `
<template>
  <${templateName}`

  // Add props to the template
  for (const [key, value] of Object.entries(componentProps)) {
    // Skip props that are in the hide list
    if (props.hide?.includes(key)) {
      continue
    }

    // For external props, always include them regardless of value
    // For non-external props, skip if value is empty
    if (!props.external?.includes(key) && (value === undefined || value === null || value === '')) {
      continue
    }

    const name = kebabCase(key)

    // Handle modelValue as v-model
    if (key === 'modelValue') {
      // If modelValue is external, use the ref name instead of the value
      if (props.external?.includes(key)) {
        code += ` v-model="${key}"`
      }
      else {
        code += ` v-model="${value}"`
      }
      continue
    }

    // Handle external props differently (use ref name without quotes)
    if (props.external?.includes(key)) {
      code += ` :${name}="${key}"`
      continue
    }

    // Check if this prop should be treated as a number based on original prop type
    const originalPropOption = formOptions.value.find(option => option.name === key)
    const isNumberProp = originalPropOption?.type === 'number'

    if (typeof value === 'boolean') {
      code += value ? ` ${name}` : ` :${name}="false"`
    }
    else if (typeof value === 'object') {
      code += ` :${name}="${JSON.stringify(value)}"`
    }
    else {
      code += ` ${isNumberProp ? ':' : ''}${name}="${value}"`
    }
  }

  // Add slots if any (including both static slots and editable slots)
  const allSlots = { ...props.slots, ...editableSlots }
  const hasSlots = allSlots && Object.keys(allSlots).length > 0
  const hasDefaultSlotCode = props.useDefaultSlot && props.defaultSlotCode

  if (hasSlots || hasDefaultSlotCode) {
    code += `>`

    // Add default slot code if useDefaultSlot is true and defaultSlotCode is provided
    if (hasDefaultSlotCode) {
      code += `
    ${props.defaultSlotCode}`
    }

    // Add other slots
    for (const [key, value] of Object.entries(allSlots)) {
      if (key === 'default') {
        code += value
      }
      else {
        code += `
    <template #${key}>
      ${value}
    </template>`
      }
    }
    code += `
  </${templateName}>`
  }
  else {
    code += ' />'
  }

  code += `
</template>`

  // Add script setup if external props are defined (after template)
  if (props.external?.length) {
    code += `

<script setup lang="ts">
`
    for (const key of props.external) {
      const value = JSON.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
      code += `const ${key} = ref(${value})
`
    }
    // eslint-disable-next-line no-useless-escape
    code += `<\/script>`
  }

  code += `
\`\`\``

  return code
})

const { data: formattedCode } = await useAsyncData(
  () => `formattedCode-${componentName}-${hash({ props: componentProps, slots: editableSlots })}`,
  async () => {
    let formatted = ''

    try {
      formatted = await $prettier.format(codeDisplay.value, {
        trailingComma: 'none',
        semi: false,
        singleQuote: true,
        printWidth: 100,
      })
    }
    catch (e) {
      console.error('Error formatting code:', e)
      formatted = codeDisplay.value
    }

    return parseMarkdown(formatted)
  },
  { watch: [codeDisplay] }, // Watch codeDisplay for changes
)
</script>
