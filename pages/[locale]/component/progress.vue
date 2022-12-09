<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Progress rounded loading> </Progress>
      </template>
      <template #playground> Playground </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :slots="slots"
          :configs="configs"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Progress";

let props = [
  {
    name: "size",
    type: "Object",
    default: {
      width: "w-full",
      height: "h-1",
    },
    description: t(
      "pages.component.progress.content.properties.size.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      circle: "#e5e7eb",
      circleDark: "#27272a",
      circleProgress: "#155e75",
      circleProgressDark: "#155e75",
      circleCutout: "before:bg-white dark:before:bg-zinc-900",
      background: "bg-gray-200 dark:bg-zinc-800",
      firstStrike: "before:bg-cyan-800",
      secondStrike: "after:bg-cyan-600",
      linearProgress: "bg-cyan-800",
      linearProgressHover: "hover:bg-emerald-700",
    },
    description: t(
      "pages.component.progress.content.properties.color.description"
    ),
  },
  {
    name: "circular",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.progress.content.properties.circular.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.progress.content.properties.loading.description"
    ),
  },
  {
    name: "initialLoadTime",
    type: "Number, Boolean",
    default: 100,
    description: t(
      "pages.component.progress.content.properties.initialLoadTime.description"
    ),
  },
  {
    name: "transition",
    type: "Boolean, Object",
    default: true,
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.progress.content.properties.rounded.description"
    ),
  },
];

let slots = [
  {
    name: "inner-circle",
    description: t(
      "pages.component.progress.content.slots.innerCircle.description"
    ),
  },
];

let configs = [
  {
    name: t("pages.component.progress.content.config.linearAnimation.name"),
    description: t(
      "pages.component.progress.content.config.linearAnimation.description"
    ),
    structure: {
      theme: {
        extend: {
          keyframes: {
            "indeterminate-first": {
              "0%": {
                left: "-100%",
                width: "100%",
              },
              "100%": {
                left: "100%",
                width: "10%",
              },
            },
            "indeterminate-second": {
              "0%": {
                left: "-150%",
                width: "100%",
              },
              "100%": {
                left: "100%",
                width: "10%",
              },
            },
          },
          animation: {
            indeterminatebefore: "indeterminate-first 1.5s infinite ease-out",
            indeterminateafter: "indeterminate-second 1.5s infinite ease-in",
          },
        },
      },
    },
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
