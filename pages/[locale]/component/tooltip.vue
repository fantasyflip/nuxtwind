<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <Tooltip
            :top="checkedPositionBoxes[0]"
            :bottom="checkedPositionBoxes[1]"
            :right="checkedPositionBoxes[2]"
            :left="checkedPositionBoxes[3]"
            :rounded="checkedBoxes[0]"
            :interactive="checkedBoxes[1]"
          >
            <Button
              @click="
                useToast({
                  title: '(╯°□°)╯︵ ┻━┻',
                  message: $t(
                    'pages.component.tooltip.content.playground.toast.message'
                  ),
                  autoClose: true,
                  type: 'error',
                })
              "
              >Hover over me!</Button
            >
            <template #tooltip>
              {{ tooltip }}
            </template>
          </Tooltip>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Textfield
              v-model="tooltip"
              class="mb-4"
              label="Tooltip Text"
              filled
            />
            <Checkboxgroup
              v-model="checkedPositionBoxes"
              not-zero
              :items="postitionProps"
              :label="
                $t(
                  'pages.component.tooltip.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.tooltip.content.playground.checkboxgroup.description'
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
          :component-name="componentName"
          :props="props"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import Tooltip from "../../../module/src/runtime/components/Tooltip.vue";
import Button from "../../../module/src/runtime/components/Button.vue";
import Textfield from "../../../module/src/runtime/components/Textfield.vue";
import Checkboxgroup from "../../../module/src/runtime/components/Checkboxgroup.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let tooltip = ref(t("pages.component.tooltip.content.playground.tooltip"));
let checkedPositionBoxes = ref([true, false, false, false]);

let postitionProps = ref([
  {
    label: "Top",
  },
  {
    label: "Bottom",
  },
  {
    label: "Right",
  },
  {
    label: "Left",
  },
]);

let checkedBoxes = ref([true, false]);

let toggleProps = ref([
  {
    label: "Rounded",
  },
  {
    label: "Interactive",
    description: t(
      "pages.component.tooltip.content.playground.checkboxgroup.items.interactive.description"
    ),
  },
]);

let codeExample = computed(() => {
  let html = `<NXW-Tooltip${checkedPositionBoxes.value[0] ? "\n top" : ""}${
    checkedPositionBoxes.value[1] ? "\n bottom" : ""
  }${checkedPositionBoxes.value[2] ? "\n right" : ""}${
    checkedPositionBoxes.value[3] ? "\n left" : ""
  }${checkedBoxes.value[0] ? "\n rounded" : ""}${
    checkedBoxes.value[1] ? "\n interactive" : ""
  }
>
  <Button>Hover over me!</Button>
  <template #tooltip>
    ${tooltip.value}
  </template>
</NXW-Tooltip>`;
  let js = ``;
  return { html, js };
});

//DOCUMENTATION
let componentName = "Tooltip";

let props = [
  {
    name: "interactive",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.tooltip.content.documentation.properties.interactive.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      text: "dark:text-white text-black",
      bg: "bg-primary-800",
      bgPointer: "text-primary-800",
    },
    description: t(
      "pages.component.tooltip.content.documentation.properties.color.description"
    ),
  },
  {
    name: "top",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.tooltip.content.documentation.properties.top.description"
    ),
  },
  {
    name: "bottom",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.tooltip.content.documentation.properties.bottom.description"
    ),
  },
  {
    name: "left",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.tooltip.content.documentation.properties.left.description"
    ),
  },
  {
    name: "right",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.tooltip.content.documentation.properties.right.description"
    ),
  },
  {
    name: "transition",
    type: "Boolean, Object",
    default: true,
    description: t(
      "pages.component.tooltip.content.documentation.properties.transition.description"
    ),
  },
  {
    name: "text",
    type: "String",
    default: "text-xs text-center",
    description: t(
      "pages.component.tooltip.content.documentation.properties.text.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.tooltip.content.documentation.properties.rounded.description"
    ),
  },
  {
    name: "zIndex",
    type: "String",
    default: "z-10",
    description: t(
      "pages.component.tooltip.content.documentation.properties.zIndex.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: "w-fit",
    description: t(
      "pages.component.tooltip.content.documentation.properties.width.description"
    ),
  },
];

let slots = [
  {
    name: "tooltip",
    description: t(
      "pages.component.tooltip.content.documentation.slots.tooltip.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
