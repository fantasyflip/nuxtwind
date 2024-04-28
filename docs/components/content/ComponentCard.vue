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
            (val) =>
              (reactProps[option.name] =
                option.type === 'number' ? Number(val) : val)
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
        />
      </div>
      <div
        v-for="(slot,index) in componentSlots"
        :key="slot.slot"
        class="flex flex-col gap-0.5 justify-between py-1.5 font-medium bg-gray-50 dark:bg-gray-800 border-r border-r-gray-200 dark:border-r-gray-700"
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
    <!-- COMPONENT -->
    <div class=" p-4 border border-b-0 border-gray-200 dark:border-gray-700 relative " :class="customStyle">
      <component :is="name" v-bind="reactProps">
        <ContentSlot v-if="$slots.default" :use="$slots.default" />

        <template v-for="slot in componentSlots" :key="slot.slot" #[slot.slot]>
          {{ slot.content }}
        </template>
      </component>
    </div>
    <!-- CODE -->
    <ContentRenderer :value="formattedCode" class="[&>div>pre]:!rounded-t-none [&>div>pre]:!mt-0" />
  </div>
</template>

<script setup lang="ts">
import { transformContent } from '@nuxt/content/transformers'
export interface Props {
  customStyle: string;
  name: string;
  componentProps?: any;
  componentSlots:{
    slot: string;
    content: string;
  }[];
  options: [
    {
      type: 'boolean' | 'string' | 'number' | 'array';
      propType: 'boolean' | 'string' | 'number' | 'array';
      name: string;
      default: boolean | string | number;
      options?: {
        val: string | number;
      }[];
    }
  ];
}

const props = withDefaults(defineProps<Props>(), {
  name: 'ComponentCard',
  componentProps: {},
  componentSlots: [],
})

const { $prettier } = useNuxtApp()
const highlighter = useShikiHighlighter()

const extractOptions = (
  options: {
    val: string | number;
  }[]
) => {
  const optionsArray = []
  for (let i = 0; i < options.length; i++) {
    optionsArray.push(options[i].val)
  }

  return optionsArray
}

const reactProps = reactive({ ...props.componentProps })
const reactSlots = reactive({ ...props.componentSlots })

function optionToKebab(str: string) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

const code = computed(()=>{
  const propsStrings: string[] = []

  for(const option of props.options){
    if(reactProps[option.name] != option.default){
      if(option.propType === 'boolean'){
        if(reactProps[option.name] === true){
          propsStrings.push(`${optionToKebab(option.name)}`)
        } else {
          propsStrings.push(`:${optionToKebab(option.name)}="${reactProps[option.name]}"`)
        }
        
      } else if(option.propType === 'number'){
        propsStrings.push(`:${optionToKebab(option.name)}="${reactProps[option.name]}"`)
      } else if(option.propType === 'string'){
        propsStrings.push(`${optionToKebab(option.name)}="${reactProps[option.name]}"`)
      }
    }
  }

  const slotItems = []

  for(const key in reactSlots){
    slotItems.push({slot: reactSlots[key].slot, content: reactSlots[key].content})
  }

  const slotsString: string[] = []

  for(const slot of slotItems){
    if(slot.content){
      slotsString.push(`<template #${slot.slot}>${slot.content}</template>`)
    }
  }
  
   const codeString = `\`\`\`vue
  <template>
    <${props.name} ${propsStrings.join(' ')} ${props.componentSlots.length ? '>': '/>'}

    ${slotsString.join(' ')}

    ${props.componentSlots.length ? '</'+props.name+'>': ''}
  </template>
\`\`\``


return codeString
  
})


const { data: formattedCode } = await useAsyncData(
  'code-formatted-'+ props.name,
  async () => {
    let formatted = ''
    try {
      formatted = await $prettier.format(code.value) || code.value
    } catch (error) {
      formatted = code.value
    }

    return transformContent('content:_markdown.md', formatted, {
      markdown: {
        highlight: {
          highlighter,
          theme: {
            light: 'material-theme-lighter',
            default: 'material-theme',
            dark: 'material-theme-palenight'
          }
        }
      }
    })
  }, { watch: [code] })
</script>
