<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Textfield </template>
      <template #component>
        <Textfield
          v-model="textfieldValue"
          prepend-icon
          hint="Enter a keyword!"
          outlined
          placeholder="Foo"
        >
          <!-- <template #label>Search</template> -->
          <template #icon>
            <MdiMagnify />
          </template>
        </Textfield>
      </template>
      <template #playground>
        Playground
        {{ textfieldValue }}
      </template>
      <template #props>
        <div
          v-for="(prop, index) in props"
          :class="index < props.length - 1 ? 'border-b' : ''"
        >
          <PropDisplay :item="prop" />
        </div>
      </template>
      <template #propertyCount>{{ props.length }}</template>
      <template #slots>
        <div
          v-for="(slot, index) in slots"
          :class="index < slots.length - 1 ? 'border-b' : ''"
        >
          <SlotDisplay :item="slot" />
        </div>
      </template>
      <template #slotCount>{{ slots.length }}</template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import MdiMagnify from "~icons/mdi/magnify";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

let textfieldValue = ref("");

let props = [
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-zinc-900",
      text: "text-white",
      label: "text-white",
      labelFocus: "peer-focus:text-cyan-600",
      placeholderText: "placeholder:text-gray-600",
      icon: "text-white",
      iconFocus: "group-focus-within:text-cyan-600",
      border: "border-white",
      borderFocus: "focus:border-cyan-800",
    },
    description: t(
      "pages.component.textfield.content.properties.color.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: "rounded-lg",
    description: t(
      "pages.component.textfield.content.properties.rounded.description"
    ),
  },
  {
    name: "prepend-icon",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textfield.content.properties.icon.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textfield.content.properties.disabled.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textfield.content.properties.loading.description"
    ),
  },
  {
    name: "outlined",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.textfield.content.properties.outlined.description"
    ),
  },
  {
    name: "filled",
    type: "Boolean",
    default: "border-b-2",
    description: t(
      "pages.component.textfield.content.properties.filled.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: "shadow-lg",
    description: t(
      "pages.component.textfield.content.properties.shadow.description"
    ),
  },
  {
    name: "transition",
    type: "Object, Boolean",
    default: {
      duration: "duration-300",
      ease: "ease-in-out",
      placeholder: {
        duration: "placeholder:duration-500",
        ease: "placeholder:ease-in-out",
      },
    },
    description: t(
      "pages.component.textfield.content.properties.transition.description"
    ),
  },
  {
    name: "placeholder",
    type: "String",
    default: "",
    description: t(
      "pages.component.textfield.content.properties.placeholder.description"
    ),
  },
  {
    name: "hint",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.textfield.content.properties.hint.description"
    ),
  },
  {
    name: "type",
    type: "String",
    default: "text",
    description: t(
      "pages.component.textfield.content.properties.type.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.textfield.content.properties.width.description"
    ),
  },
];

let slots = [
  {
    name: "icon",
    description: t("pages.component.textfield.content.slots.icon.description"),
  },
  {
    name: "label",
    description: t("pages.component.textfield.content.slots.label.description"),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
