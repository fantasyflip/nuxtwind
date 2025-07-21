<template>
  <div>
    <ComponentCard
      name="NXW-Carousel"
      :component-props="compProps"
      :options="compOptions"
      :component-slots="compSlots"
      @option-update="handleOptionUpdate"
    >
      <template #custom-component>
        <div class="size-[500px] mx-auto">
          <NXW-Carousel
            v-model="compProps.step"
            :auto-play="compProps['auto-play']"
            :disable-auto-play-on-hover="compProps['disable-auto-play-on-hover']"
            :hide-navigation="compProps['hide-navigation']"
            :hide-pagination="compProps['hide-pagination']"
            :timeout="compProps['timeout']"
            :transition="compProps['transition']"
            @update:model-value="handleStepUpdate"
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
          </NXW-Carousel>
        </div>
      </template>
    </ComponentCard>
  </div>
</template>

<script setup lang="ts">
import ComponentCard from './ComponentCard.vue'

const compProps = ref({
  'auto-play': true,
  'disable-auto-play-on-hover': true,
  'hide-navigation': false,
  'hide-pagination': false,
  'transition': true,
  'timeout': 5,
})

const compOptions = [
  {
    type: 'boolean',
    propType: 'boolean',
    name: 'auto-play',
    default: true,
  },
  {
    type: 'boolean',
    propType: 'boolean',
    name: 'disable-auto-play-on-hover',
    default: true,
  },
  {
    type: 'boolean',
    propType: 'boolean',
    name: 'hide-navigation',
    default: false,
  },
  {
    type: 'boolean',
    propType: 'boolean',
    name: 'hide-pagination',
    default: false,
  },
  {
    type: 'boolean',
    propType: 'boolean',
    name: 'transition',
    default: true,
  },
  {
    type: 'number',
    propType: 'number',
    name: 'timeout',
    default: 5,
  },
]

const compSlots = [
  {
    slot: 'default',
    content: `
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
        `,
    isOption: false,
  },
]

const carouselItems = [
  {
    step: 1,
    image: 'https://link.fantasyflip.de/s/f9PhRX',
    alt: 'Image of a street in Vienna',
  },
  {
    step: 2,
    image: 'https://link.fantasyflip.de/s/t43DMr',
    alt: 'Image of food in a plane at the plane window',
  },
  {
    step: 3,
    image: 'https://link.fantasyflip.de/s/GMqIyE',
    alt: 'Image of the nature of Madeira',
  },
  {
    step: 4,
    image: 'https://link.fantasyflip.de/s/Q3Ze8X',
    alt: 'Image of a subway station in Vienna',
  },
]

function handleOptionUpdate({ name, event, options }) {
  if (options.find(option => option.name === name)) {
    compProps.value[name] = event
  }
}

function handleStepUpdate(step) {
  compProps.value.step = step
}
</script>
