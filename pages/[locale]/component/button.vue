<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Button </template>
      <template #component>
        <Button
          :color="{
            bg: 'bg-red-500',
            border: 'border-red-500',
          }"
          rounded
          grow
          :link="useLocaleUrl('')"
        ></Button>
      </template>
      <template #playground> Playground </template>
      <template #props>
        <div
          v-for="(prop, index) in props"
          :class="index < props.length - 1 ? 'border-b' : ''"
        >
          <PropDisplay :item="prop" />
        </div>
      </template>
      <template #propertyCount>{{ props.length }}</template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let props = [
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-cyan-900",
      text: "text-white",
      border: "border-white",
      hover: "hover:bg-cyan-800",
    },
    description: t(
      "pages.component.button.content.properties.color.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: "rounded-md",
    description: t(
      "pages.component.button.content.properties.rounded.description"
    ),
  },
  {
    name: "grow",
    type: "Boolean, Object",
    default: {
      delay: "delay-10",
      scale: "hover:scale-110",
    },
    description: t(
      "pages.component.button.content.properties.grow.description"
    ),
  },
  {
    name: "link",
    type: "Object, String",
    default: undefined,
    description: t(
      "pages.component.button.content.properties.link.description"
    ),
  },
  {
    name: "target",
    type: "String",
    default: "_self",
    description: t(
      "pages.component.button.content.properties.target.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.properties.disabled.description"
    ),
  },
  {
    name: "icon",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.properties.icon.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.properties.loading.description"
    ),
  },
  {
    name: "outlined",
    type: "Boolean",
    default: "border-2",
    description: t(
      "pages.component.button.content.properties.outlined.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean",
    default: "shadow-md",
    description: t(
      "pages.component.button.content.properties.shadow.description"
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
      "pages.component.button.content.properties.transition.description"
    ),
  },
  {
    name: "dense",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.button.content.properties.dense.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.button.content.properties.width.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.button.content.properties.height.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
