<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <div class="lg:w-[40vw] lg:h-[70vh] w-[80vw] h-[30vh]">
            <Carousel v-model="currentStep">
              <CarouselItem
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
                  />
                </div>
              </CarouselItem>
            </Carousel>
          </div>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center w-full h-full">
          <div class="md:w-2/3 w-full">
            <Slider
              v-model="currentStep"
              :min="1"
              :max="4"
              :label="'Step: ' + currentStep"
            />
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import Carousel from "../../../module/src/runtime/components/Carousel.vue";
import CarouselItem from "../../../module/src/runtime/components/CarouselItem.vue";
import Slider from "../../../module/src/runtime/components/Slider.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Carousel";

//PLAYGROUND

let currentStep = ref(1);

let carouselItems = [
  {
    step: 1,
    image: "https://link.fantasyflip.de/s/f9PhRX",
    alt: "Image of a street in Vienna",
  },
  {
    step: 2,
    image: "https://link.fantasyflip.de/s/t43DMr",
    alt: "Image of food in a plane at the plane window",
  },
  {
    step: 3,
    image: "https://link.fantasyflip.de/s/GMqIyE",
    alt: "Image of the nature of Madeira",
  },
  {
    step: 4,
    image: "https://link.fantasyflip.de/s/Q3Ze8X",
    alt: "Image of a subway station in Vienna",
  },
];

let codeExample = computed(() => {
  let html = `<NXW-Carousel>
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
      />
    </div>
  </NXW-CarouselItem>
</NXW-Carousel>`;
  let js = `let carouselItems = [
  {
    step: 1,
    image: "${carouselItems[0].image}",
    alt: "${carouselItems[0].alt}",
  },
  {
    step: 2,
    image: "${carouselItems[1].image}",
    alt: "${carouselItems[1].alt}",
  },
  {
    step: 3,
    image: "${carouselItems[2].image}",
    alt: "${carouselItems[2].alt}",
  },
  {
    step: 4,
    image: "${carouselItems[3].image}",
    alt: "${carouselItems[3].alt}",
  },
];`;
  return { html, js };
});

//DOCUMENTATION

let props = [
  {
    name: "autoPlay",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.carousel.content.documentation.properties.autoplay.description"
    ),
  },
  {
    name: "timeout",
    type: "Number",
    default: 5000,
    description: t(
      "pages.component.carousel.content.documentation.properties.timeout.description"
    ),
  },
  {
    name: "disableAutoPlayOnHover",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.carousel.content.documentation.properties.disableAutoPlayOnHover.description"
    ),
  },
  {
    name: "hideNavigation",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.carousel.content.documentation.properties.hideNavigation.description"
    ),
  },
  {
    name: "hidePagination",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.carousel.content.documentation.properties.hidePagination.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.carousel.content.documentation.properties.shadow.description"
    ),
  },
  {
    name: "transition",
    type: "Boolean, Object",
    default: true,
    description: t(
      "pages.component.carousel.content.documentation.properties.transition.description"
    ),
  },
];

let slots = [
  {
    name: "default",
    description: t(
      "pages.component.carousel.content.documentation.slots.default.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
