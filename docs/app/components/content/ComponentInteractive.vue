<template>
  <div class="my-5">
    <NXW-Button loading>
      Test
    </NXW-Button>
    <div class="relative">
      <div
        v-if="formOptions.length"
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
              container: 'mt-0'
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
      </div>
      <div
        v-if="component"
        class="flex justify-center border border-b-0 border-muted relative p-4 z-[1]"
        :class="[!formOptions.length && 'rounded-t-md']"
      >
        <component
          :is="component"
          v-bind="componentProps"
        >
          <template
            v-for="slot in Object.keys(props.slots || {})"
            :key="slot"
            #[slot]
          >
            {{ props.slots?.[slot] }}
          </template>
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

export interface Props {
  slug?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: { [key: string]: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slots?: { [key: string]: any }
}

const props = defineProps<Props>()

const { $prettier } = useNuxtApp()

const route = useRoute()
const routeName = props.slug ?? route.path.split('/').pop() ?? ''
const camelCaseComponentName = camelCase(routeName)
const componentName = upperFirst(camelCaseComponentName)
const templateName = 'NXW-' + componentName

// TODO: Handle import via alias
const component = defineAsyncComponent(() => import(`../../../../src/runtime/components/${componentName}.vue`))

// Make component props reactive
const componentProps = reactive({
  ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
    return [key, value]
  }))
})

// Helper functions to get and set component props
function getComponentProp(name: string) {
  return get(componentProps, name) ?? undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setComponentProp(name: string, value: any) {
  set(componentProps, name, value)
}

const formOptions = computed(() => {
  return Object.entries(props.props || {}).map(([key, value]) => {
    const optionType = typeof value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let items: any[] | undefined = undefined

    if (optionType === 'boolean') {
      items = [
        { value: true, label: 'true' },
        { value: false, label: 'false' }
      ]
    }

    return {
      label: kebabCase(key),
      name: key,
      value: value,
      type: optionType,
      items: items
    }
  })
})

// Update the code display to reflect current prop values
const codeDisplay = computed(() => {
  let code = `\`\`\`vue
<template>
  <${templateName}`

  // Add props to the template
  for (const [key, value] of Object.entries(componentProps)) {
    if (value === undefined || value === null || value === '') {
      continue
    }

    const name = kebabCase(key)

    if (typeof value === 'boolean') {
      code += value ? ` ${name}` : ` :${name}="false"`
    } else if (typeof value === 'object') {
      code += ` :${name}="${JSON.stringify(value)}"`
    } else {
      code += ` ${typeof value === 'number' ? ':' : ''}${name}="${value}"`
    }
  }

  // Add slots if any
  if (props.slots && Object.keys(props.slots).length > 0) {
    code += `>`
    for (const [key, value] of Object.entries(props.slots)) {
      if (key === 'default') {
        code += value
      } else {
        code += `
    <template #${key}>
      ${value}
    </template>`
      }
    }
    code += `
    </${templateName}>`
  } else {
    code += ' />'
  }

  code += `
</template>
\`\`\``

  return code
})

function getAsyncDataKey() {
  // Use a unique key based on the componentName, current props and slots
  return `formattedCode-${componentName}-${JSON.stringify(componentProps)}-${JSON.stringify(props.slots)}`
}

const { data: formattedCode } = await useAsyncData(
  getAsyncDataKey(),
  async () => {
    let formatted = ''

    try {
      formatted = await $prettier.format(codeDisplay.value, {
        trailingComma: 'none',
        semi: false,
        singleQuote: true,
        printWidth: 100
      })
    } catch (e) {
      console.error('Error formatting code:', e)
      formatted = codeDisplay.value
    }

    return parseMarkdown(formatted)
  },
  { watch: [codeDisplay] } // Watch codeDisplay for changes
)
</script>
