<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <div :class="!checkedBoxes[0] ? 'lg:w-[40vw] w-[70vw]' : ''">
            <Progress
              v-model="progressValue"
              :circular="
                checkedBoxes[0]
                  ? {
                      width: 'w-40',
                      height: 'h-40',
                      cutout: {
                        text: 'text-2xl',
                      },
                    }
                  : false
              "
              :loading="checkedBoxes[1]"
              :rounded="checkedBoxes[2]"
            />
          </div>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              v-model="progressValue"
              class="mb-4"
              :label="
                $t(
                  'pages.component.progress.content.playground.valueText.label'
                )
              "
              type="number"
              filled
            />
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
              :label="
                $t(
                  'pages.component.progress.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.progress.content.playground.checkboxgroup.description'
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
          :configs="configs"
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import Progress from "../../../module/src/runtime/components/Progress.vue";
import Checkboxgroup from "../../../module/src/runtime/components/Checkboxgroup.vue";
import Textfield from "../../../module/src/runtime/components/Textfield.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Progress";

//PLAYGROUND

let progressValue = ref(30);

let checkedBoxes = ref([true, false, false]);

let toggleProps = ref([
  {
    label: "Circular",
  },
  {
    label: "Loading",
  },
  {
    label: "Rounded",
    description: t(
      "pages.component.progress.content.playground.checkboxgroup.items.rounded.description"
    ),
  },
]);

let codeExample = computed(() => {
  let html = `<NXW-Progress
  v-model="progressValue"${checkedBoxes.value[0] ? `\n  circular` : ""}${
    checkedBoxes.value[1] ? `\n  loading` : ""
  }${checkedBoxes.value[2] ? `\n  rounded` : ""}
/>`;
  let js = `let progressValue = ref(${progressValue.value});`;
  return { html, js };
});

//DOCUMENTATION

let props = [
  {
    name: "size",
    type: "Object",
    default: {
      width: "w-full",
      height: "h-1",
    },
    description: t(
      "pages.component.progress.content.documentation.properties.size.description"
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
      firstStrike: "before:bg-primary-800",
      secondStrike: "after:bg-primary-600",
      linearProgress: "bg-primary-800",
      linearProgressHover: "hover:bg-secondary-800",
    },
    description: t(
      "pages.component.progress.content.documentation.properties.color.description"
    ),
  },
  {
    name: "circular",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.progress.content.documentation.properties.circular.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.progress.content.documentation.properties.loading.description"
    ),
  },
  {
    name: "initialLoadTime",
    type: "Number, Boolean",
    default: 100,
    description: t(
      "pages.component.progress.content.documentation.properties.initialLoadTime.description"
    ),
  },
  {
    name: "initialLoadTimeType",
    type: "String",
    default: "calc",
    description: t(
      "pages.component.progress.content.documentation.properties.initialLoadTimeType.description"
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
      "pages.component.progress.content.documentation.properties.rounded.description"
    ),
  },
];

let slots = [
  {
    name: "inner-circle",
    description: t(
      "pages.component.progress.content.documentation.slots.innerCircle.description"
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.progress.content.documentation.caveats.resolveConfig.title"
    ),
    description: t(
      "pages.component.progress.content.documentation.caveats.resolveConfig.description",
      {
        url: "https://tailwindcss.com/docs/configuration#referencing-in-java-script",
      }
    ),
  },
];

let configs = [
  {
    name: t(
      "pages.component.progress.content.documentation.config.linearAnimation.name"
    ),
    description: t(
      "pages.component.progress.content.documentation.config.linearAnimation.description"
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
