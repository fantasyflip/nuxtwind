<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Select
          :items="['Foo', 'Bar', 'Boo', 'Far', 'Foo', 'Bar', 'Boo', 'Far']"
          v-model="selectValue"
          label="Select"
          placeholder="Select an item"
          search
          filled
          :append-icon="selectIcon"
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
import MdiMenuDown from "~icons/mdi/menu-down";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let selectValue = ref("");
let selectIcon = markRaw(MdiMenuDown);

//DOCUMENTATION
let componentName = "Select";

let props = [
  {
    name: "items",
    type: "Array",
    default: undefined,
    description: t(
      "pages.component.select.content.documentation.props.items.description"
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
      "pages.component.select.content.documentation.props.color.description",
      { url: useComponentReferUrl("textfield", "prop", "color") }
    ),
  },
  {
    name: "search",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.props.search.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "label") }
    ),
  },
  {
    name: "outlined",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "outlined") }
    ),
  },
  {
    name: "filled",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "filled") }
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.props.disabled.description",
      { url: useComponentReferUrl("textfield", "prop", "disabled") }
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.props.loading.description",
      { url: useComponentReferUrl("textfield", "prop", "loading") }
    ),
  },
  {
    name: "placeholder",
    type: "String",
    default: " ",
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "placeholder") }
    ),
  },
  {
    name: "transition",
    type: "Object, Boolean",
    default: "",
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "transition") }
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "shadow") }
    ),
  },
  {
    name: "appendIcon",
    type: "Object",
    default: null,
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "appendIcon") }
    ),
  },
  {
    name: "prependIcon",
    type: "Object",
    default: null,
    description: t(
      "pages.component.select.content.documentation.props.referComponent.textfield.description",
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
      "pages.component.select.content.documentation.props.width.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "max-h-48",
    description: t(
      "pages.component.select.content.documentation.props.height.description"
    ),
  },
];

let slots = [
  {
    name: "prepend-icon",
    description: t(
      "pages.component.select.content.slots.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "slot", "prepend-icon") }
    ),
  },
  {
    name: "append-icon",
    description: t(
      "pages.component.select.content.slots.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "slot", "append-icon") }
    ),
  },
  {
    name: "label",
    description: t(
      "pages.component.select.content.slots.referComponent.textfield.description",
      {
        url: useComponentReferUrl("textfield", "slot", "label"),
      }
    ),
  },
];

let caveats = [
  {
    name: t("pages.component.select.content.caveats.textfield.title"),
    description: t(
      "pages.component.select.content.caveats.textfield.description",
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
