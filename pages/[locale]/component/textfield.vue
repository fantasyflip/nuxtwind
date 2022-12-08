<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Textfield </template>
      <template #component>
        <Textfield
          v-model="textfieldValue"
          prepend-icon
          hint="Enter a keyword!"
          placeholder="Foo"
          :rules="[notEmpty, minChars(5)]"
          label="Search"
          :loading="loading"
        >
          <template #icon>
            <MdiMagnify />
          </template>
        </Textfield>
      </template>
      <template #playground>
        <div class="flex justify-center items-center h-full">
          <!-- TODO Fix padding -->
          <Button width="w-1/3" rounded grow @click="loading = !loading"
            >Toggle Loading</Button
          >
        </div>
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
      <template #events>
        <div
          v-for="(event, index) in events"
          :class="index < events.length - 1 ? 'border-b' : ''"
        >
          <EventDisplay :item="event" />
        </div>
      </template>
      <template #eventCount>{{ events.length }}</template>
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

let loading = ref(false);

let notEmpty = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

let minChars = (min) => (value) => {
  if (value.length < min) {
    return `This field must be at least ${min} characters`;
  }
  return true;
};

let props = [
  {
    name: "label",
    type: "String",
    default: "Label",
    description: t(
      "pages.component.textfield.content.properties.label.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-zinc-900",
      text: "text-white",
      hint: "text-gray-400",
      error: "text-red-500",
      label: "text-white",
      labelFocus: "peer-focus:text-cyan-600",
      placeholderText: "placeholder:text-gray-600",
      icon: "text-white",
      iconFocus: "group-focus-within:text-cyan-600",
      border: "border-white",
      borderFocus: "focus:border-cyan-800",
      borderError: "border-red-500",
      borderFocusError: "focus:border-red-500",
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
    default: " ",
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

let events = [
  {
    name: "update:modelValue",
    structure: "String",
    description: t(
      "pages.component.textfield.content.events.updateModelValue.description"
    ),
  },
  {
    name: "update:validation",
    structure: {
      isValid: "Boolean",
      result: "String / Boolean",
      value: "String",
      source: {
        name: "String",
        type: "textfield",
      },
    },
    description: t(
      "pages.component.textfield.content.events.updateValidation.description"
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
