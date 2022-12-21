<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Textarea
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
        />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              class="mb-4"
              v-model="textarea.label"
              label="Textfield-Label"
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

let props = [];

let events = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
