<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div class="max-h-full overflow-auto grid place-items-center m-3">
          <Checkboxgroup
            v-model="checkboxValues"
            label="Checkbox-Group"
            :description="
              'This is a group of checkboxes. The returned value is an array of booleans. Current values: ' +
              JSON.stringify(checkboxValues).replace(/,/g, ', ')
            "
            :items="checkboxes"
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

let props = [
  {
    name: "color",
    type: "Object",
    default: {
      label: "text-primary-800 dark:text-primary-800",
      description: "text-gray-500 dark:text-gray-400",
    },
    description: t(
      "pages.component.checkboxgroup.content.properties.color.description"
    ),
  },
  {
    name: "text",
    type: "Object",
    default: {
      label: "text-lg font-medium",
      description: "text-sm",
    },
    description: t(
      "pages.component.checkboxgroup.content.properties.text.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkboxgroup.content.properties.label.description"
    ),
  },
  {
    name: "description",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkboxgroup.content.properties.description.description"
    ),
  },
  {
    name: "items",
    type: "Array",
    default: "[]",
    description: t(
      "pages.component.checkboxgroup.content.properties.items.description",
      { url: useComponentReferUrl("checkbox", "props") }
    ),
  },
  {
    name: "multiple",
    type: "Boolean",
    default: "false",
    description: t(
      "pages.component.checkboxgroup.content.properties.multiple.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
    description: t(
      "pages.component.checkboxgroup.content.properties.loading.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
    description: t(
      "pages.component.checkboxgroup.content.properties.disabled.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: "w-full",
    description: t(
      "pages.component.checkboxgroup.content.properties.width.description"
    ),
  },
  {
    name: "generalCheckboxProps",
    type: "Object",
    default: "{}",
    description: t(
      "pages.component.checkboxgroup.content.properties.generalCheckboxProps.description",
      { url: useComponentReferUrl("checkbox", "props") }
    ),
  },
  {
    name: "notZero",
    type: "Boolean",
    default: "false",
    description: t(
      "pages.component.checkboxgroup.content.properties.notZero.description"
    ),
  },
];

let slots = [
  {
    name: "group-label",
    description: t(
      "pages.component.checkboxgroup.content.slots.groupLabel.description"
    ),
  },
  {
    name: "group-description",
    description: t(
      "pages.component.checkboxgroup.content.slots.groupDescription.description"
    ),
  },
];

let caveats = [
  {
    name: t("pages.component.checkboxgroup.content.caveats.checkbox.title"),
    description: t(
      "pages.component.checkboxgroup.content.caveats.checkbox.description",
      {
        url: useLocaleUrl("component/checkbox"),
      }
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
