<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div class="max-h-full overflow-auto grid place-items-center">
          <Checkboxgroup
            v-model="checkboxValues"
            label="Checkbox-Group"
            :description="
              'This is a group of checkboxes. The returned value is an array of booleans. Current values: ' +
              JSON.stringify(checkboxValues).replace(/,/g, ', ')
            "
            :items="checkboxes"
            width="w-1/2"
            multiple
          />
        </div>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">Playground</div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :slots="slots"
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let checkboxValues = ref([false, true, false]);
let checkboxes = ref([
  {
    label: "Checkbox 1",
    description: "This is a checkbox with customized color.",
    color: {
      label: "text-secondary-800 dark:text-secondary-800",
      description: "text-gray-500 dark:text-gray-400",
    },
  },
  {
    label: "Checkbox 2",
    description:
      "This is a checkbox with long text. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur possimus odit est nulla! Culpa amet veritatis, voluptatum, ipsum possimus, adipisci dolorem itaque maxime reprehenderit magnam sit similique id? Ipsum, voluptas! Odit in aspernatur debitis quibusdam magni id non enim voluptatibus optio ea et unde molestias reprehenderit fuga, ipsum nihil modi quis. Laborum accusamus ad repellendus sit architecto explicabo ea numquam.",
  },
  {
    label: "Checkbox 3",
    description: "This is a looading checkbox.",
    loading: true,
  },
  {
    label: "Checkbox 4",
    description: "This is a disabled checkbox.",
    disabled: true,
  },
]);

setTimeout(() => {
  checkboxes.value.push({
    label: "Checkbox 5",
    description:
      "This is a checkbox that appears 3s after page load, showing that the component is reactive.",
  });
}, 3000);

//DOCUMENTATION
let componentName = "Checkboxgroup";

let props = [];

let slots = [];

let caveats = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
