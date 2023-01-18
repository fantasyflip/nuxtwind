<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Checkbox
          v-model="checkbox.value"
          :label="checkbox.label"
          :description="checkbox.description"
          :disabled="checkedBoxes[0]"
          :loading="checkedBoxes[1]"
          :radio="checkedBoxes[2]"
        />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              v-model="checkbox.label"
              class="mb-4"
              label="Checkbox Label"
              filled
            />
            <Textfield
              v-model="checkbox.description"
              class="mb-4"
              :label="
                $t(
                  'pages.component.checkbox.content.playground.textfieldDescription.label'
                )
              "
              filled
            />
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
              :label="
                $t(
                  'pages.component.checkbox.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.checkbox.content.playground.checkboxgroup.description'
                )
              "
            />
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :slots="slots"
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import Checkbox from "../../../../module/src/runtime/components/Checkbox.vue";
import Checkboxgroup from "../../../../module/src/runtime/components/Checkboxgroup.vue";
import Textfield from "../../../../module/src/runtime/components/Textfield.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let checkbox = ref({
  value: false,
  label: "Checkbox Label",
  description: "Checkbox Description",
});

let checkedBoxes = ref([false, false, false]);

let toggleProps = [
  {
    label: "Disabled",
  },
  {
    label: "Loading",
  },
  {
    label: "Radio",
  },
];

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
      "pages.component.checkbox.content.documentation.properties.color.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkbox.content.documentation.properties.label.description"
    ),
  },
  {
    name: "description",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkbox.content.documentation.properties.description.description"
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
      "pages.component.checkbox.content.documentation.properties.text.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkbox.content.documentation.properties.disabled.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkbox.content.documentation.properties.loading.description"
    ),
  },
  {
    name: "radio",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkbox.content.documentation.properties.radio.description"
    ),
  },
];

let slots = [
  {
    name: "label",
    description: t(
      "pages.component.checkbox.content.documentation.slots.label.description"
    ),
  },
  {
    name: "description",
    description: t(
      "pages.component.checkbox.content.documentation.slots.description.description"
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.checkbox.content.documentation.caveats.icon.title"
    ),
    description: t(
      "pages.component.checkbox.content.documentation.caveats.icon.description",
      {
        url: "https://github.com/antfu/unplugin-icons",
      }
    ),
  },
  {
    name: t(
      "pages.component.checkbox.content.documentation.caveats.group.title"
    ),
    description: t(
      "pages.component.checkbox.content.documentation.caveats.group.description",
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
