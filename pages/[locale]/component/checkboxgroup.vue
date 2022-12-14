<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Checkboxgroup
          label="Checkbox-Group"
          description="This is a group of checkboxes."
          :items="checkboxes"
        />
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
let checkboxes = [
  {
    label: "Checkbox 1",
    description: "This is a checkbox.",
  },
  {
    label: "Checkbox 2",
    description: "This is a checkbox.",
  },
  {
    label: "Checkbox 3",
    description: "This is a checkbox.",
  },
];

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
