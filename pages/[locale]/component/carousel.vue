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
                  <img :src="item.image" class="w-full h-full object-cover" />
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
  },
  {
    step: 2,
    image: "https://link.fantasyflip.de/s/t43DMr",
  },
  {
    step: 3,
    image: "https://link.fantasyflip.de/s/GMqIyE",
  },
  {
    step: 4,
    image: "https://link.fantasyflip.de/s/Q3Ze8X",
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
      <img :src="item.image" class="w-full h-full object-cover" />
    </div>
  </NXW-CarouselItem>
</NXW-Carousel>`;
  let js = `let carouselItems = [
  {
    step: 1,
    image: "https://link.fantasyflip.de/s/f9PhRX",
  },
  {
    step: 2,
    image: "https://link.fantasyflip.de/s/t43DMr",
  },
  {
    step: 3,
    image: "https://link.fantasyflip.de/s/GMqIyE",
  },
  {
    step: 4,
    image: "https://link.fantasyflip.de/s/Q3Ze8X",
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
