<template>
  <div>
    <!-- SETTINGS -->
    <div
      class="relative flex border border-gray-200 dark:border-gray-700 rounded-t-md overflow-hidden "
    >
      <div
        v-for="option in options"
        :key="option.name"
        class="flex flex-col gap-0.5 justify-between py-1.5 font-medium bg-gray-50 dark:bg-gray-800 border-r border-r-gray-200 dark:border-r-gray-700"
      >
        <div v-if="!option.htmlOnly">
          <label
            :for="`prop-${option.name}`"
            class="block text-xs px-2.5 font-medium text-gray-400 dark:text-gray-500 -my-px"
          >{{ option.name }}</label>
          <UCheckbox
            v-if="option.type.startsWith('boolean')"
            v-model="reactProps[option.name]"
            :name="`prop-${option.name}`"
            tabindex="-1"
            class="justify-center"
            @update:model-value="emitOptionsUpdate(option.name, $event)"
          />
          <UInput
            v-else-if="option.type === 'string' || option.type === 'number'"
            :model-value="reactProps[option.name]"
            :type="option.type === 'number' ? 'number' : 'text'"
            :name="`prop-${option.name}`"
            variant="none"
            autocomplete="off"
            input-class="py-0"
            tabindex="-1"
            @update:model-value="
              (val) => {
                handleInputUpdate(val, option)
              }
            "
          />
          <USelectMenu
            v-else-if="option.options.length"
            v-model="reactProps[option.name]"
            :options="extractOptions(option.options)"
            :name="`prop-${option.name}`"
            variant="none"
            class="inline-flex"
            :ui-menu="{ width: 'w-32 !-mt-px', rounded: 'rounded-t-none' }"
            select-class="py-0"
            tabindex="-1"
            :popper="{ strategy: 'fixed', placement: 'bottom-start' }"
            @update:model-value="emitOptionsUpdate(option.name, $event)"
          />
        </div>
      </div>
      <div
        v-for="(slot, index) in componentSlots"
        :key="slot.slot"
        class="flex flex-col gap-0.5 justify-between py-1.5 font-medium bg-gray-50 dark:bg-gray-800 "
      >
        <div
          v-if="slot.isOption"
          class="border-r border-r-gray-200 dark:border-r-gray-700"
        >
          <label
            :for="`prop-${slot.slot}`"
            class="block text-xs px-2.5 font-medium text-gray-400 dark:text-gray-500 -my-px"
          >{{ slot.slot }}-slot</label>
          <UInput
            v-model="reactSlots[index].content"
            type="text"
            :name="`slot-${slot.slot}`"
            variant="none"
            autocomplete="off"
            input-class="py-0"
            tabindex="-1"
          />
        </div>
      </div>
    </div>
    <!-- COMPONENT -->
    <div
      class=" p-4 border border-b-0 border-gray-200 dark:border-gray-700 relative not-prose"
      :class="customStyle"
    >
      <slot name="custom-component">
        <component
          :is="name"
          v-bind="reactProps"
        >
          <ContentSlot
            v-if="slotComponent"
            :use="$slots.default"
          >
            <component
              :is="slotComponent.tag"
              :class="slotComponent.class"
            />
          </ContentSlot>
          <ContentSlot
            v-else-if="$slots.default"
            :use="$slots.default"
          />

          <template
            v-for="slot in componentSlots"
            :key="slot.slot"
            #[slot.slot]
          >
            {{ slot.content }}
          </template>
        </component>
      </slot>
    </div>

    <!-- CODE -->
    <ContentRenderer
      :value="formattedCode"
      class="[&>div>pre]:!rounded-t-none [&>div>pre]:!mt-0"
    />
  </div>
</template>

<script setup lang="ts">
import { transformContent } from '@nuxt/content/transformers'

export interface Props {
  customStyle?: string
  name?: string
  slotComponent?: {
    tag: string
    class: string
  }
  componentProps?: {
    name: string
    type: 'boolean' | 'string' | 'number' | 'array' | unknown
    propType: 'boolean' | 'string' | 'number' | 'array'
    default: boolean | string | number | unknown
  }[]
  componentSlots?: {
    slot: string
    content: string
    isOption: boolean
  }[]
  options: [
    {
      type: 'boolean' | 'string' | 'number' | 'array'
      propType: 'boolean' | 'string' | 'number' | 'array'
      name: string
      default: boolean | string | number
      options?: {
        val: string | number
      }[]
      htmlOnly?: boolean
    },
  ]
}

const props = withDefaults(defineProps<Props>(), {
  name: 'ComponentCard',
  componentProps: () => [],
  componentSlots: () => [],
})

const emits = defineEmits(['option-update'])

const { $prettier } = useNuxtApp()
const highlighter = useShikiHighlighter()

const extractOptions = (
  options: {
    val: string | number
  }[],
) => {
  const optionsArray = []
  for (let i = 0; i < options.length; i++) {
    optionsArray.push(options[i].val)
  }

  return optionsArray
}

const reactProps = reactive({ ...props.componentProps })
const reactSlots = reactive({ ...props.componentSlots })

function emitOptionsUpdate(name: string, event: unknown) {
  emits('option-update', { name, event, options: props.options })
}

function handleInputUpdate(value: unknown, option: { name: string, type: string }) {
  reactProps[option.name] = option.type === 'number' ? Number(value) : value
  emitOptionsUpdate(option.name, value)
}

function optionToKebab(str: string) {
  // eslint-disable-next-line regexp/no-useless-assertions
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

const codeToRender = computed(() => {
  const propsStrings: string[] = []

  for (const option of props.options) {
    if (option.name === 'modelValue') {
      propsStrings.push(`v-model="${option.default}"`)
    }
    else if (reactProps[option.name] != option.default) {
      if (option.propType === 'boolean') {
        if (reactProps[option.name] === true) {
          propsStrings.push(`${optionToKebab(option.name)}`)
        }
        else {
          propsStrings.push(`:${optionToKebab(option.name)}="${reactProps[option.name]}"`)
        }
      }
      else if (option.propType === 'number') {
        propsStrings.push(`:${optionToKebab(option.name)}="${reactProps[option.name]}"`)
      }
      else if (option.propType === 'string') {
        propsStrings.push(`${optionToKebab(option.name)}="${reactProps[option.name]}"`)
      }
    }
  }

  const slotItems = []

  for (const key in reactSlots) {
    slotItems.push({ slot: reactSlots[key].slot, content: reactSlots[key].content })
  }

  const slotsString: string[] = []

  for (const slot of slotItems) {
    if (slot.slot === 'default') {
      slotsString.push(slot.content)
    }
    else
      if (slot.content) {
        slotsString.push(`<template #${slot.slot}>${slot.content}</template>`)
      }
  }

  const codeString = `
    <${props.name} ${propsStrings.join(' ')} ${props.componentSlots.length ? '>' : '/>'}

    ${props.slotComponent ? `<${props.slotComponent.tag} ${props.slotComponent.class ? `class="${props.slotComponent.class}"` : ''} />` : ''}
    ${slotsString.join(' ')}

    ${props.componentSlots.length ? '</' + props.name + '>' : ''}
  `

  return codeString
})

const codeDisplay = computed(() => {
  return `\`\`\`vue
  <template>
    ${codeToRender.value}
  </template>
  \`\`\``
})

const { data: formattedCode } = await useAsyncData(
  'code-formatted-' + props.name,
  async () => {
    let formatted = ''
    try {
      // @ts-expect-error - prettier is not typed
      formatted = await $prettier.format(codeDisplay.value) || codeDisplay.value
    }
    catch (error) {
      formatted = codeDisplay.value
      console.error('Error formatting code:', error)
    }

    return transformContent('content:_markdown.md', formatted, {
      markdown: {
        highlight: {
          highlighter,
          theme: {
            light: 'material-theme-lighter',
            default: 'material-theme',
            dark: 'material-theme-palenight',
          },
        },
      },
    })
  }, { watch: [codeDisplay] })
</script>
