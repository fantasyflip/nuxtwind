<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Checkbox
          v-model="checkValue"
          :label="checkValue ? 'Uncheck me!' : 'Check me!'"
          description="This is a chechbox!"
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
let checkValue = ref(true);

//DOCUMENTATION
let componentName = "Checkbox";

let props = [
  {
    name: "color",
    type: "Object",
    default: {
      label: "text-black dark:text-gray-300",
      description: "text-gray-500 dark:text-gray-400",
      iconInactive: "text-gray-500 dark:text-gray-400",
      iconActive: "text-primary-800 dark:text-primary-800",
      hover: "hover:text-secondary-700 dark:hover:text-secondary-700",
    },
    description: t(
      "pages.component.checkbox.content.properties.color.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkbox.content.properties.label.description"
    ),
  },
  {
    name: "description",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkbox.content.properties.description.description"
    ),
  },
  {
    name: "text",
    type: "Object",
    default: {
      label: "text-sm font-medium",
      description: "text-xs font-normal",
    },
    description: t(
      "pages.component.checkbox.content.properties.text.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkbox.content.properties.disabled.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkbox.content.properties.loading.description"
    ),
  },
  {
    name: "radio",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkbox.content.properties.radio.description"
    ),
  },
];

let slots = [
  {
    name: "label",
    description: t("pages.component.checkbox.content.slots.label.description"),
  },
  {
    name: "description",
    description: t(
      "pages.component.checkbox.content.slots.description.description"
    ),
  },
];

let caveats = [
  {
    name: t("pages.component.checkbox.content.caveats.icon.title"),
    description: t(
      "pages.component.checkbox.content.caveats.icon.description",
      {
        url: "https://github.com/antfu/unplugin-icons",
      }
    ),
  },
  {
    name: t("pages.component.checkbox.content.caveats.group.title"),
    description: t(
      "pages.component.checkbox.content.caveats.group.description",
      {
        url: useLocaleUrl("component/checkboxgroup"),
      }
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
