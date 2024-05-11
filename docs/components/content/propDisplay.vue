<template>
  <div class="pb-8">
    <div class="flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <ContentSlot
          :use="$slots.default"
          unwrap="p"
        />
        <div class="flex gap-2">
          <div
            v-for="(propType, index) in props.types"
            :key="propType"
            class="flex pt-5"
          >
            <div class="text-green-500 dark:text-green-500 font-light">
              {{ propType }}
            </div>
            <div
              v-if="index != props.types.length - 1"
              class="pl-1 -mr-1"
            >
              |
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="props.required"
        class="text-white/50 font-light"
      >
        required
      </div>
    </div>
    <div
      class="flex"
      :class="props.defaultTop ? 'flex-col-reverse' : 'flex-col'"
    >
      <ClientOnly>
        <ContentSlot
          :use="$slots.description"
          unwrap="p"
        />
      </ClientOnly>
      <div
        v-if="props.default || props.types.includes('boolean')"
        :class="!props.defaultTop ? 'pt-2' : ''"
      >
        <div class="font-semibold">
          Default
        </div>
        <ContentRenderer
          v-if="typeof props.default == 'object'"
          :value="formattedObject"
        />
        <div
          v-else
          class="font-light"
          :class="{
            'text-green-500 dark:text-green-500':
              typeof props.default == 'string',
            'text-red-500 dark:text-red-500':
              typeof props.default == 'boolean' && !props.default,
            'text-orange-500 dark:text-orange-500':
              typeof props.default == 'boolean' && props.default,
            'text-blue-500 dark:text-blue-500':
              typeof props.default == 'number',
          }"
        >
          {{ props.default }}
        </div>
      </div>
      <div v-if="props.example">
        <div class="font-semibold">
          Example
        </div>
        <ContentRenderer
          v-if="typeof props.example == 'object'"
          :value="formattedExampleObject"
        />
        <div
          v-else
          class="font-light"
          :class="{
            'text-green-500 dark:text-green-500':
              typeof props.example == 'string',
            'text-red-500 dark:text-red-500':
              typeof props.example == 'boolean' && !props.example,
            'text-orange-500 dark:text-orange-500':
              typeof props.example == 'boolean' && props.example,
            'text-blue-500 dark:text-blue-500':
              typeof props.example == 'number',
          }"
        >
          {{ props.example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { transformContent } from '@nuxt/content/transformers'

export interface Props {
  name: string
  required: boolean
  types: string[]
  default?: string | object | boolean | number
  example?: string | object | boolean | number
  defaultTop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  types: () => {
    return ['string']
  },
  defaultTop: false,
})

const route = useRoute()

const componentName
  = route.params.slug[1].charAt(0).toUpperCase() + route.params.slug[1].slice(1)

const { $prettier } = useNuxtApp()
const highlighter = useShikiHighlighter()

// obj is a key value pair object

interface KeyValue {
  [key: string]: string | KeyValue
}

function getKvPairStrings(obj: KeyValue): string[] {
  const kvPairStrings: string[] = []

  for (const key in obj) {
    if (obj[key] && typeof obj[key] == 'object') {
      const subKvPairStrings: string[] = []
      for (const subKey in obj[key] as KeyValue) {
        subKvPairStrings.push(`${subKey}:'${obj[key][subKey]}'`)
      }
      kvPairStrings.push(`${key}:{${subKvPairStrings.join(', ')}}`)
    }
    else {
      kvPairStrings.push(`${key}:'${obj[key]}'`)
    }
  }

  return kvPairStrings
}

const object = computed(() => {
  if (
    (props.types.includes('object') || props.types.includes('array'))
    && props.default
    && typeof props.default == 'object'
  ) {
    // check if its an array
    if (Array.isArray(props.default)) {
      const arrayItems: string[] = []
      const arrayItemType = typeof props.default[0]

      for (const item of props.default) {
        if (arrayItemType == 'object') {
          arrayItems.push(`{${getKvPairStrings(item).join(', ')}}`)
        }
        else if (arrayItemType == 'string') {
          arrayItems.push(`'${item}'`)
        }
        else if (arrayItemType == 'number') {
          arrayItems.push(`${item}`)
        }
        else if (arrayItemType == 'boolean') {
          arrayItems.push(`${item}`)
        }
      }

      const arrayString = `\`\`\`vue
    <template>
    <NXW-${componentName} :${props.name}="[${arrayItems.join(', ')}]" />
    </template>
    `

      return arrayString
    }
    else {
      const kvPairStrings: string[] = getKvPairStrings(
        props.default as KeyValue,
      )

      const objectString = `\`\`\`vue
    <template>
    <NXW-${componentName} :${props.name}="{${kvPairStrings.join(', ')}}" />
    </template>
    `
      return objectString
    }
  }
  return ''
})

const { data: formattedObject } = await useAsyncData(
  'prop-object-formatted-' + componentName + '-' + props.name,
  async () => {
    if (!object.value) return ''

    let formatted = ''
    try {
      // @ts-expect-error - prettier is not typed
      formatted = (await $prettier.format(object.value)) || object.value
    }
    catch (error) {
      formatted = object.value
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
  },
  { watch: [object] },
)

const exampleObject = computed(() => {
  if (
    (props.types.includes('object') || props.types.includes('array'))
    && props.example
    && typeof props.example == 'object'
  ) {
    // check if its an array
    if (Array.isArray(props.example)) {
      const arrayItems: string[] = []
      const arrayItemType = typeof props.example[0]

      for (const item of props.example) {
        if (arrayItemType == 'object') {
          arrayItems.push(`{${getKvPairStrings(item).join(', ')}}`)
        }
        else if (arrayItemType == 'string') {
          arrayItems.push(`'${item}'`)
        }
        else if (arrayItemType == 'number') {
          arrayItems.push(`${item}`)
        }
        else if (arrayItemType == 'boolean') {
          arrayItems.push(`${item}`)
        }
      }

      const arrayString = `\`\`\`vue
      <template>
      <NXW-${componentName} :${props.name}="[${arrayItems.join(', ')}]" />
      </template>
      `

      return arrayString
    }
    else {
      const kvPairStrings: string[] = getKvPairStrings(
        props.example as KeyValue,
      )

      const objectString = `\`\`\`vue
      <template>
      <NXW-${componentName} :${props.name}="{${kvPairStrings.join(', ')}}" />
      </template>
      `
      return objectString
    }
  }
  return ''
})

const { data: formattedExampleObject } = await useAsyncData(
  'prop-example-object-formatted-' + componentName + '-' + props.name,
  async () => {
    if (!exampleObject.value) return ''

    let formatted = ''
    try {
      // @ts-expect-error - prettier is not typed
      formatted
        = (await $prettier.format(exampleObject.value)) || exampleObject.value
    }
    catch (error) {
      formatted = exampleObject.value
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
  },
  { watch: [exampleObject] },
)
</script>
