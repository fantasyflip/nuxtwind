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
        <DocumentationDisplay :component-name="componentName" :props="props" />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
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

let props = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
