<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div class="w-full h-full">
          <Carousel v-model="currentStep">
            <CarouselItem :step="1">
              <div class="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1666030809086-f21069785386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                  class="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem :step="2">
              <div class="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1666030947602-007c26ea5767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
                  class="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem :step="3">
              <div class="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1666030947611-f3347f7cf325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                  class="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem :step="4">
              <div class="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1666030853685-48f68d402dfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                  class="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          </Carousel>
        </div>
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
