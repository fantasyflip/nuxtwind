<template>
  <div>
    <ComponentInteractive
      slug="Drawer"
      class="h-72 relative"
      use-default-slot
      :props="combinedProps"
      :default-slot-code="defaultSlotCode"
      :external="props.external"
      :ignore="props.ignore"
      :hide="props.hide"
    >
      <div
        v-for="item in drawerItems"
        :key="item.text"
        class="h-14 w-full cursor-pointer flex items-center px-2 gap-10 hover:bg-primary-400/50 transition-color ease-in-out duration-300"
      >
        <div class="w-12 grid place-items-center">
          <UIcon
            :name="item.icon"
            class="size-7"
          />
        </div>
        <div>
          {{ item.text }}
        </div>
      </div>
    </ComponentInteractive>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: { [key: string]: any }
  /** List of props to ignore in selection */
  ignore?: string[]
  /** List of props to externalize in script setup */
  external?: string[]
  /** List of props to hide in the codeDisplay on the component */
  hide?: string[]
}

const drawerItems = [
  {
    icon: 'i-mdi-home',
    text: 'Home'
  },
  {
    icon: 'i-mdi-account',
    text: 'Profile'
  },
  {
    icon: 'i-mdi-settings',
    text: 'Settings'
  }
]

const customProps = reactive({
  'modelValue': true,
  'height': 'h-full',
  'absolute': true,
  'disable-overflow': false
})

const props = defineProps<Props>()

const combinedProps = computed(() => ({
  ...props.props,
  ...customProps
}))

const defaultSlotCode = `<div
        v-for="item in drawerItems"
        :key="item.text"
        class="h-14 w-full cursor-pointer flex items-center px-2 gap-10 hover:bg-primary-400/50 transition-color ease-in-out duration-300"
      >
        <div class="w-12 grid place-items-center">
          <UIcon
            :name="item.icon"
            class="size-7"
          />
        </div>
        <div>
          {{ item.text }}
        </div>
      </div>`
</script>
