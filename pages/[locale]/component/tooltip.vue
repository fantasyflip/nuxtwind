<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Tooltip
          :top="checkedPositionBoxes[0]"
          :bottom="checkedPositionBoxes[1]"
          :right="checkedPositionBoxes[2]"
          :left="checkedPositionBoxes[3]"
          :rounded="rounded"
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
            <div class="w-full">
              <Checkbox v-model="rounded" label="Rounded" />
            </div>
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
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

let rounded = ref(true);

//DOCUMENTATION
let componentName = "Tooltip";

let props = [
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
    default: "w-full",
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
