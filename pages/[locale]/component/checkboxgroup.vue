<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div
          class="max-h-full overflow-auto grid place-items-center m-3 md:w-2/3"
        >
          <Checkboxgroup
            v-model="checkboxgroup.values"
            :label="checkboxgroup.label"
            :description="checkboxgroup.description"
            :items="checkboxes"
            :multiple="checkedBoxes[0]"
            :not-zero="checkedBoxes[1]"
            :disabled="checkedBoxes[2]"
            :loading="checkedBoxes[3]"
          />
        </div>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              v-model="checkboxgroup.label"
              class="mb-4"
              label="Checkbox Label"
              filled
            />
            <Textfield
              v-model="checkboxgroup.description"
              class="mb-4"
              :label="
                $t(
                  'pages.component.checkboxgroup.content.playground.textfieldDescription.label'
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
                  'pages.component.checkboxgroup.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.checkboxgroup.content.playground.checkboxgroup.description'
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
import Checkboxgroup from "../../../module/src/runtime/components/Checkboxgroup.vue";
import Textfield from "../../../module/src/runtime/components/Textfield.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let checkboxgroup = ref({
  values: [false, true, false],
  label: "Checkbox Label",
  description:
    "This is a group of checkboxes. The returned value is an array of booleans.",
});

let checkedBoxes = ref([false, true, false, false]);

let toggleProps = [
  {
    label: "Multiple",
  },
  {
    label: "Not-Zero",
  },
  {
    label: "Disabled",
  },
  {
    label: "Loading",
  },
];

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
      "This is a checkbox with long text.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. In atque quaerat temporibus aspernatur tempora culpa magni quis necessitatibus ducimus, error dolore, dolorem molestias esse nam amet vitae, maxime possimus sunt.",
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
  {
    label: "Checkbox 5",
  },
]);

setTimeout(() => {
  checkboxes.value.push({
    label: "Checkbox 6",
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
      "pages.component.checkboxgroup.content.documentation.properties.color.description"
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
      "pages.component.checkboxgroup.content.documentation.properties.text.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.label.description"
    ),
  },
  {
    name: "description",
    type: "String",
    default: "",
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.description.description"
    ),
  },
  {
    name: "items",
    type: "Array",
    default: [],
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.items.description",
      { url: useComponentReferUrl("checkbox", "properties") }
    ),
  },
  {
    name: "multiple",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.multiple.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.loading.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.disabled.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: "w-full",
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.width.description"
    ),
  },
  {
    name: "generalCheckboxProps",
    type: "Object",
    default: {},
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.generalCheckboxProps.description",
      { url: useComponentReferUrl("checkbox", "properties") }
    ),
  },
  {
    name: "notZero",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.checkboxgroup.content.documentation.properties.notZero.description"
    ),
  },
];

let slots = [
  {
    name: "group-label",
    description: t(
      "pages.component.checkboxgroup.content.documentation.slots.groupLabel.description"
    ),
  },
  {
    name: "group-description",
    description: t(
      "pages.component.checkboxgroup.content.documentation.slots.groupDescription.description"
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.checkboxgroup.content.documentation.caveats.checkbox.title"
    ),
    description: t(
      "pages.component.checkboxgroup.content.documentation.caveats.checkbox.description",
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
