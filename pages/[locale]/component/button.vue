<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <Button
            target="_blank"
            :dense="checkedBoxes[0]"
            :disabled="checkedBoxes[1]"
            :loading="checkedBoxes[2]"
            :grow="checkedBoxes[3]"
            :rounded="checkedBoxes[4]"
          >
            {{ buttonLabel }}
          </Button>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center w-full h-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              v-model="buttonLabel"
              class="mb-4"
              label="Button-Label"
              filled
            />
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
              :label="
                $t(
                  'pages.component.button.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.button.content.playground.checkboxgroup.description'
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
<script lang="ts" setup>
import Button from "../../../module/src/runtime/components/Button.vue";
import Checkboxgroup from "../../../module/src/runtime/components/Checkboxgroup.vue";
import Textfield from "../../../module/src/runtime/components/Textfield.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Button";

//PLAYGROUND

let checkedBoxes = ref([false, false, false, true, true]);

let toggleProps = ref([
  {
    label: "Dense",
  },
  {
    label: "Disabled",
  },
  {
    label: "Loading",
  },
  {
    label: "Grow",
    description: t(
      "pages.component.button.content.playground.checkboxgroup.items.grow.description"
    ),
  },
  {
    label: "Rounded",
  },
]);

let buttonLabel = ref("Click me!");
buttonLabel.value = t(
  "pages.component.button.content.playground.textfield.initialValue"
);

let codeExample = computed(() => {
  let html = `<NXW-Button${checkedBoxes.value[0] ? "\n dense" : ""}${
    checkedBoxes.value[1] ? "\n disabled" : ""
  }${checkedBoxes.value[2] ? "\n loading" : ""}${
    checkedBoxes.value[3] ? "\n grow" : ""
  }${checkedBoxes.value[4] ? "\n rounded" : ""}>
  ${buttonLabel.value}
</NXW-Button>`;
  let js = "";
  return { html, js };
});

//DOCUMENTATION

let props = [
  {
    name: "ariLabel",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.button.content.documentation.properties.ariLabel.description"
    ),
  },
  {
    name: "type",
    type: "String",
    default: "button",
    description: t(
      "pages.component.button.content.documentation.properties.type.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-cyan-900 dark:bg-cyan-900",
      text: "dark:text-white text-black",
      border: "dark:border-white border-black",
      hover: "hover:bg-secondary-800 dark:hover:bg-secondary-800",
      iconHover: "hover:text-secondary-800 dark:hover:text-secondary-800",
      loadingCircle: "gray-400",
      loadingCircleDark: "gray-700",
      loadingCircleProgress: "primary-400",
      loadingCircleProgressDark: "primary-400",
      loadingCircleCutout: "before:bg-cyan-900 dark:before:bg-cyan-900",
    },
    description: t(
      "pages.component.button.content.documentation.properties.color.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: "rounded-md",
    description: t(
      "pages.component.button.content.documentation.properties.rounded.description"
    ),
  },
  {
    name: "grow",
    type: "Boolean, Object",
    default: {
      delay: "delay-10",
      scale: "hover:scale-105",
    },
    description: t(
      "pages.component.button.content.documentation.properties.grow.description"
    ),
  },
  {
    name: "link",
    type: "Object, String",
    default: undefined,
    description: t(
      "pages.component.button.content.documentation.properties.link.description"
    ),
  },
  {
    name: "target",
    type: "String",
    default: "_self",
    description: t(
      "pages.component.button.content.documentation.properties.target.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.documentation.properties.disabled.description"
    ),
  },
  {
    name: "icon",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.documentation.properties.icon.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.documentation.properties.loading.description"
    ),
  },
  {
    name: "outlined",
    type: "Boolean",
    default: "border-2",
    description: t(
      "pages.component.button.content.documentation.properties.outlined.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean",
    default: "shadow-md",
    description: t(
      "pages.component.button.content.documentation.properties.shadow.description"
    ),
  },
  {
    name: "transition",
    type: "Object, Boolean",
    default: {
      duration: "duration-300",
      ease: "ease-in-out",
    },
    description: t(
      "pages.component.button.content.documentation.properties.transition.description"
    ),
  },
  {
    name: "dense",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.documentation.properties.dense.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.button.content.documentation.properties.width.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "w-fit",
    description: t(
      "pages.component.button.content.documentation.properties.height.description"
    ),
  },
];

let slots = [
  {
    name: "default",
    description: t(
      "pages.component.button.content.documentation.slots.default.description"
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.button.content.documentation.caveats.progress.title"
    ),
    description: t(
      "pages.component.button.content.documentation.caveats.progress.description",
      {
        url: useLocaleUrl("component/progress"),
      }
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
