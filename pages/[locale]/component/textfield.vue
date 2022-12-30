<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Textfield
          width="w-fit"
          v-model="textfield.value"
          :hint="textfield.hint"
          :placeholder="textfield.placeholder"
          :rules="[notEmpty, minChars(5)]"
          :label="textfield.label"
          :color="{
            bg: styleCheckedBoxes[1] ? 'bg-white dark:bg-zinc-900' : '',
          }"
          :filled="styleCheckedBoxes[0]"
          :outlined="styleCheckedBoxes[1]"
          :loading="checkedBoxes[0]"
          :disabled="checkedBoxes[1]"
          :append-icon="checkedBoxes[2] ? textfieldIcon : false"
          :prepend-icon="checkedBoxes[3] ? textfieldIcon : false"
        />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              class="mb-4"
              v-model="textfield.label"
              label="Textfield-Label"
              filled
            />
            <Textfield
              class="mb-4"
              v-model="textfield.placeholder"
              label="Placeholder"
              filled
            />
            <Textfield
              class="mb-4"
              v-model="textfield.hint"
              label="Hint"
              filled
            />
            <Checkboxgroup
              v-model="styleCheckedBoxes"
              :items="styleProps"
              :label="
                $t(
                  'pages.component.textfield.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.textfield.content.playground.checkboxgroup.description'
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
          :events="events"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import MdiMagnify from "~icons/mdi/magnify";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Textfield";

//PLAYGROUND

const textfieldIcon = markRaw(MdiMagnify);

let textfield = ref({
  label: "Textfield-Label",
  placeholder: "Placeholder",
  hint: "Hint",
  value: "",
});

let styleCheckedBoxes = ref([false, true, false]);

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

let checkedBoxes = ref([false, false, false, true]);

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
]);

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

//DOCUMENTATION

let props = [
  {
    name: "label",
    type: "String",
    default: "Label",
    description: t(
      "pages.component.textfield.content.documentation.properties.label.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-gray-200 dark:bg-zinc-800",
      text: "text-black dark:text-white",
      hint: "text-gray-600 dark:text-gray-400",
      error: "text-red-500 dark:text-red-500",
      label: "text-black dark:text-white",
      labelFocus: "peer-focus:text-cyan-600",
      placeholderText:
        "placeholder:text-gray-400 dark:placeholder:text-gray-600",
      icon: "text-black dark:text-white",
      iconFocus: "group-focus-within:text-cyan-600",
      border: "border-black dark:border-white",
      borderFocus: "focus:border-primary-800 dark:focus:border-primary-800",
      borderError: "border-red-500",
      borderFocusError: "focus:border-red-500",
    },
    description: t(
      "pages.component.textfield.content.documentation.properties.color.description"
    ),
  },
  {
    name: "autocomplete",
    type: "String",
    default: "on",
    description: t(
      "pages.component.textfield.content.documentation.properties.autocomplete.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: "rounded-lg",
    description: t(
      "pages.component.textfield.content.documentation.properties.rounded.description"
    ),
  },
  {
    name: "prependIcon",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.textfield.content.documentation.properties.prependIcon.description"
    ),
  },
  {
    name: "appendIcon",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.textfield.content.documentation.properties.appendIcon.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textfield.content.documentation.properties.disabled.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textfield.content.documentation.properties.loading.description"
    ),
  },
  {
    name: "outlined",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.textfield.content.documentation.properties.outlined.description"
    ),
  },
  {
    name: "filled",
    type: "Boolean",
    default: "border-b-2",
    description: t(
      "pages.component.textfield.content.documentation.properties.filled.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: "shadow-lg",
    description: t(
      "pages.component.textfield.content.documentation.properties.shadow.description"
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
      "pages.component.textfield.content.documentation.properties.transition.description"
    ),
  },
  {
    name: "placeholder",
    type: "String",
    default: " ",
    description: t(
      "pages.component.textfield.content.documentation.properties.placeholder.description"
    ),
  },
  {
    name: "hint",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.textfield.content.documentation.properties.hint.description"
    ),
  },
  {
    name: "type",
    type: "String",
    default: "text",
    description: t(
      "pages.component.textfield.content.documentation.properties.type.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.textfield.content.documentation.properties.width.description"
    ),
  },
];

let events = [
  {
    name: "update:modelValue",
    structure: "String",
    description: t(
      "pages.component.textfield.content.documentation.events.updateModelValue.description"
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
      "pages.component.textfield.content.documentation.events.updateValidation.description"
    ),
  },
  {
    name: "focusIn",
    structure: undefined,
    description: t(
      "pages.component.textfield.content.documentation.events.focusIn.description"
    ),
  },
  {
    name: "focusOut",
    structure: undefined,
    description: t(
      "pages.component.textfield.content.documentation.events.focusOut.description"
    ),
  },
];

let slots = [
  {
    name: "prepend-icon",
    description: t(
      "pages.component.textfield.content.documentation.slots.prependIcon.description"
    ),
  },
  {
    name: "append-icon",
    description: t(
      "pages.component.textfield.content.documentation.slots.appendIcon.description"
    ),
  },
  {
    name: "label",
    description: t(
      "pages.component.textfield.content.documentation.slots.label.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
