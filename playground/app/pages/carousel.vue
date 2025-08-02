<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="size-[500px]">
      <NXW-Carousel v-model="carouselValue">
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
  </div>
</template>

<script setup lang="ts">
const carouselValue = ref(1)
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
</script>
