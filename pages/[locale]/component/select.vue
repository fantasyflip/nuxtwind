<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Select
          :items="['Foo', 'Bar', 'Boo', 'Far', 'Foo', 'Bar', 'Boo', 'Far']"
          v-model="select.value"
          :label="select.label"
          :placeholder="select.placeholder"
          :filled="styleCheckedBoxes[0]"
          :outlined="styleCheckedBoxes[1]"
          :loading="checkedBoxes[0]"
          :disabled="checkedBoxes[1]"
          :append-icon="checkedBoxes[2] ? selectIcon : null"
          :prepend-icon="checkedBoxes[3] ? selectIcon : null"
          :search="checkedBoxes[4]"
          :color="{
            textfield: {
              bg: styleCheckedBoxes[1] ? 'bg-white dark:bg-zinc-900' : '',
            },
          }"
          :width="{
            textfield: 'w-fit',
          }"
        />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              class="mb-4"
              v-model="select.label"
              label="Select-Label"
              filled
            />
            <Textfield
              class="mb-4"
              v-model="select.placeholder"
              label="Placeholder"
              filled
            />
            <Checkboxgroup
              v-model="styleCheckedBoxes"
              :items="styleProps"
              :label="
                $t(
                  'pages.component.select.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.select.content.playground.checkboxgroup.description'
                )
              "
            />
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
            />
          </div>
        </div>
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
import MdiMenuDown from "~icons/mdi/menu-down";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
const selectIcon = markRaw(MdiMenuDown);

let select = ref({
  label: "Textfield-Label",
  placeholder: "Placeholder",
  value: "",
});

let styleCheckedBoxes = ref([false, false, true]);

let styleProps = ref([
  {
    label: "Filled",
  },
  {
    label: "Outlined",
  },
  {
    label: "Regular",
  },
]);

let checkedBoxes = ref([false, false, true, false, true]);

let toggleProps = ref([
  {
    label: "Loading",
  },
  {
    label: "Disabled",
  },
  {
    label: "Append-Icon",
  },
  {
    label: "Prepend-Icon",
  },
  {
    label: "Search",
  },
]);

//DOCUMENTATION
let componentName = "Select";

let props = [
  {
    name: "items",
    type: "Array",
    default: undefined,
    description: t(
      "pages.component.select.content.documentation.properties.items.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      textfield: {},
      bg: "bg-gray-200 dark:bg-zinc-800",
      text: "text-black dark:text-white",
      border: "border-gray-300 dark:border-zinc-700",
      hover: "hover:bg-primary-700",
    },
    description: t(
      "pages.component.select.content.documentation.properties.color.description",
      { url: useComponentReferUrl("textfield", "prop", "color") }
    ),
  },
  {
    name: "search",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.search.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "label") }
    ),
  },
  {
    name: "outlined",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "outlined") }
    ),
  },
  {
    name: "filled",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "filled") }
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.disabled.description",
      { url: useComponentReferUrl("textfield", "prop", "disabled") }
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.loading.description",
      { url: useComponentReferUrl("textfield", "prop", "loading") }
    ),
  },
  {
    name: "placeholder",
    type: "String",
    default: " ",
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "placeholder") }
    ),
  },
  {
    name: "transition",
    type: "Object, Boolean",
    default: "",
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "transition") }
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "shadow") }
    ),
  },
  {
    name: "appendIcon",
    type: "Object",
    default: null,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "appendIcon") }
    ),
  },
  {
    name: "prependIcon",
    type: "Object",
    default: null,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "prependIcon") }
    ),
  },
  {
    name: "width",
    type: "Object",
    default: {
      textfield: "",
      select: "w-full",
    },
    description: t(
      "pages.component.select.content.documentation.properties.width.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "max-h-48",
    description: t(
      "pages.component.select.content.documentation.properties.height.description"
    ),
  },
];

let slots = [
  {
    name: "prepend-icon",
    description: t(
      "pages.component.select.content.documentation.slots.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "slot", "prepend-icon") }
    ),
  },
  {
    name: "append-icon",
    description: t(
      "pages.component.select.content.documentation.slots.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "slot", "append-icon") }
    ),
  },
  {
    name: "label",
    description: t(
      "pages.component.select.content.documentation.slots.referComponent.textfield.description",
      {
        url: useComponentReferUrl("textfield", "slot", "label"),
      }
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.select.content.documentation.caveats.textfield.title"
    ),
    description: t(
      "pages.component.select.content.documentation.caveats.textfield.description",
      {
        url: useLocaleUrl("component/textfield"),
      }
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
