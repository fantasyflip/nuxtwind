<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Textarea
          width="w-fit"
          v-model="textarea.value"
          :hint="textarea.hint"
          :placeholder="textarea.placeholder"
          :rules="[notEmpty, minChars(5)]"
          :label="textarea.label"
          :color="{
            bg: styleCheckedBoxes[1] ? 'bg-white dark:bg-zinc-900' : '',
          }"
          :filled="styleCheckedBoxes[0]"
          :outlined="styleCheckedBoxes[1]"
          :loading="checkedBoxes[0]"
          :disabled="checkedBoxes[1]"
          :append-icon="checkedBoxes[2] ? textareaIcon : false"
          :prepend-icon="checkedBoxes[3] ? textareaIcon : false"
          :counter="checkedBoxes[4]"
        />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              class="mb-4"
              v-model="textarea.label"
              label="Textarea-Label"
              filled
            />
            <Textfield
              class="mb-4"
              v-model="textarea.placeholder"
              label="Placeholder"
              filled
            />
            <Textfield
              class="mb-4"
              v-model="textarea.hint"
              label="Hint"
              filled
            />
            <Checkboxgroup
              v-model="styleCheckedBoxes"
              :items="styleProps"
              :label="
                $t(
                  'pages.component.textarea.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.textarea.content.playground.checkboxgroup.description'
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

let componentName = "Textarea";

//PLAYGROUND

const textareaIcon = markRaw(MdiMagnify);

let textarea = ref({
  label: "Textarea-Label",
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

let checkedBoxes = ref([false, false, false, true, true]);

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
    label: "Counter",
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
      "pages.component.textarea.content.properties.label.description"
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
      borderFocus:
        "focus:border-primary-800 dark:focus:border-primary-800 focus-within:border-primary-800 dark:focus-within:border-primary-800",
      borderError: "border-red-500",
      borderFocusError: "focus:border-red-500",
    },
    description: t(
      "pages.component.textarea.content.properties.color.description"
    ),
  },
  {
    name: "autocomplete",
    type: "String",
    default: "on",
    description: t(
      "pages.component.textarea.content.properties.autocomplete.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: "rounded-lg",
    description: t(
      "pages.component.textarea.content.properties.rounded.description"
    ),
  },
  {
    name: "prependIcon",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.textarea.content.properties.prependIcon.description"
    ),
  },
  {
    name: "appendIcon",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.textarea.content.properties.appendIcon.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textarea.content.properties.disabled.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textarea.content.properties.loading.description"
    ),
  },
  {
    name: "outlined",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.textarea.content.properties.outlined.description"
    ),
  },
  {
    name: "filled",
    type: "Boolean",
    default: "border-b-2",
    description: t(
      "pages.component.textarea.content.properties.filled.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: "shadow-lg",
    description: t(
      "pages.component.textarea.content.properties.shadow.description"
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
      "pages.component.textarea.content.properties.transition.description"
    ),
  },
  {
    name: "placeholder",
    type: "String",
    default: " ",
    description: t(
      "pages.component.textarea.content.properties.placeholder.description"
    ),
  },
  {
    name: "hint",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.textarea.content.properties.hint.description"
    ),
  },
  {
    name: "counter",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.textarea.content.properties.counter.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "min-h-[40px]",
    description: t(
      "pages.component.textarea.content.properties.height.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.textarea.content.properties.width.description"
    ),
  },
];

let events = [
  {
    name: "update:modelValue",
    structure: "String",
    description: t(
      "pages.component.textarea.content.events.updateModelValue.description"
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
        type: "textarea",
      },
    },
    description: t(
      "pages.component.textarea.content.events.updateValidation.description"
    ),
  },
  {
    name: "focusIn",
    structure: undefined,
    description: t(
      "pages.component.textarea.content.events.focusIn.description"
    ),
  },
  {
    name: "focusOut",
    structure: undefined,
    description: t(
      "pages.component.textarea.content.events.focusOut.description"
    ),
  },
];

let slots = [
  {
    name: "prepend-icon",
    description: t(
      "pages.component.textarea.content.slots.prependIcon.description"
    ),
  },
  {
    name: "append-icon",
    description: t(
      "pages.component.textarea.content.slots.appendIcon.description"
    ),
  },
  {
    name: "label",
    description: t("pages.component.textarea.content.slots.label.description"),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
