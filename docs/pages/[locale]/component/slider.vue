<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div class="w-60">
          <div>{{ slider.value }}</div>
          <div>
            <Slider
              v-model="slider.value"
              :min="slider.min"
              :max="slider.max"
              :label="slider.label"
              :description="slider.description"
            />
          </div>
        </div>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Textfield
              v-model="slider.value"
              class="mb-4"
              label="Slider Value"
              type="number"
              filled
            />
            <Textfield
              v-model="slider.label"
              class="mb-4"
              label="Slider-Label"
              filled
            />
            <Textarea
              v-model="slider.description"
              class="mb-4"
              label="Slider Description"
              filled
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
import Slider from "../../../../module/src/runtime/components/Slider.vue";
import Textfield from "../../../../module/src/runtime/components/Textfield.vue";
import Textarea from "../../../../module/src/runtime/components/Textarea.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let slider = ref({
  value: 30,
  min: 0,
  max: 100,
  label: "Slider",
  description:
    "This is a slider with a very long description to show that this component can handle long descriptions.",
});

//DOCUMENTATION
let componentName = "Slider";

let props = [
  {
    name: "color",
    type: "Object",
    default: {
      description: "text-zinc-400",
      sliderLine: "bg-zinc-600 dark:bg-zinc-600",
      sliderThumb: "#06b6d4",
      sliderThumbDark: "#06b6d4",
      sliderThumbBorder: "#155e75",
      sliderThumbBorderDark: "#155e75",
    },
    description: t(
      "pages.component.slider.content.documentation.properties.color.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.slider.content.documentation.properties.label.description"
    ),
  },
  {
    name: "description",
    type: "String",
    default: "",
    description: t(
      "pages.component.slider.content.documentation.properties.description.description"
    ),
  },
  {
    name: "min",
    type: "Number",
    default: 0,
    description: t(
      "pages.component.slider.content.documentation.properties.min.description"
    ),
  },
  {
    name: "max",
    type: "Number",
    default: 100,
    description: t(
      "pages.component.slider.content.documentation.properties.max.description"
    ),
  },
  {
    name: "thumbSize",
    type: "Number",
    default: 15,
    description: t(
      "pages.component.slider.content.documentation.properties.thumbSize.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.slider.content.documentation.properties.rounded.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: "w-full",
    description: t(
      "pages.component.slider.content.documentation.properties.width.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "h-0.5",
    description: t(
      "pages.component.slider.content.documentation.properties.height.description"
    ),
  },
];

let slots = [
  {
    name: "label",
    description: t(
      "pages.component.slider.content.documentation.slots.label.description"
    ),
  },
  {
    name: "description",
    description: t(
      "pages.component.slider.content.documentation.slots.description.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
