<template>
  <div>
    <ComponentInteractive
      slug="Carousel"
      class="size-[500px] mx-auto"
      use-default-slot
      :props="combinedProps"
      :default-slot-code="defaultSlotCode"
      :external="props.external"
      :ignore="props.ignore"
      :hide="props.hide"
    >
      <NXW-CarouselItem
        v-for="item in carouselItems"
        :key="item.step"
        :step="item.step"
      >
        <div class="w-full h-full">
          <img
            :src="item.image"
            class="w-full h-full object-cover"
            loading="lazy"
            width="100%"
            height="100%"
            :alt="item.alt"
          >
        </div>
      </NXW-CarouselItem>
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
const carouselItems = [
  {
    step: 1,
    image: 'https://link.fantasyflip.de/s/f9PhRX',
    alt: 'Image of a street in Vienna'
  },
  {
    step: 2,
    image: 'https://link.fantasyflip.de/s/t43DMr',
    alt: 'Image of food in a plane at the plane window'
  },
  {
    step: 3,
    image: 'https://link.fantasyflip.de/s/GMqIyE',
    alt: 'Image of the nature of Madeira'
  },
  {
    step: 4,
    image: 'https://link.fantasyflip.de/s/Q3Ze8X',
    alt: 'Image of a subway station in Vienna'
  }
]

const customProps = {
  modelValue: 1,
  items: carouselItems
}

const props = defineProps<Props>()

const combinedProps = {
  ...props.props,
  ...customProps
}

const defaultSlotCode = `<NXW-CarouselItem
        v-for="item in items"
        :key="item.step"
        :step="item.step"
      >
        <div class="w-full h-full">
          <img
            :src="item.image"
            class="w-full h-full object-cover"
            loading="lazy"
            width="100%"
            height="100%"
            :alt="item.alt"
          >
        </div>
      </NXW-CarouselItem>`
</script>
