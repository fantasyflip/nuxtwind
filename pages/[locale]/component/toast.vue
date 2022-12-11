<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Toast
          id="playground"
          width="sm:w-1/2 max-w-4/5"
          :auto-close="false"
        ></Toast>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Textfield
              class="my-3"
              :label="
                $t(
                  'pages.component.toast.content.playground.titleTextfield.label'
                )
              "
              outlined
              :color="{
                bg: 'bg-white dark:bg-zinc-900',
              }"
              :placeholder="
                $t(
                  'pages.component.toast.content.playground.titleTextfield.placeholder'
                )
              "
              v-model="testNotification.title"
              :rules="[notEmpty]"
              :hint="
                $t(
                  'pages.component.toast.content.playground.titleTextfield.hint'
                )
              "
            />
            <Textfield
              class="my-3"
              :label="
                $t(
                  'pages.component.toast.content.playground.messageTextfield.label'
                )
              "
              outlined
              :color="{
                bg: 'bg-white dark:bg-zinc-900',
              }"
              :placeholder="
                $t(
                  'pages.component.toast.content.playground.messageTextfield.placeholder'
                )
              "
              v-model="testNotification.message"
              :rules="[notEmpty]"
              :hint="
                $t(
                  'pages.component.toast.content.playground.messageTextfield.hint'
                )
              "
            />
            <Textfield
              class="my-3"
              :label="
                $t(
                  'pages.component.toast.content.playground.durationTextfield.label'
                )
              "
              outlined
              :color="{
                bg: 'bg-white dark:bg-zinc-900',
              }"
              :placeholder="
                $t(
                  'pages.component.toast.content.playground.durationTextfield.placeholder'
                )
              "
              v-model="testNotification.duration"
              :rules="[notEmpty, isNumber, maxVal(10), minVal(1)]"
              :hint="
                $t(
                  'pages.component.toast.content.playground.durationTextfield.hint'
                )
              "
              type="number"
            />
            <Button
              grow
              @click="
                createNotification({
                  title: testNotification.title,
                  message: testNotification.message,
                  duration: testNotification.duration,
                })
              "
              >Notify</Button
            >
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
const createNotification = inject("create-notification");
let testNotification = ref({
  title: t("pages.component.toast.content.playground.titleTextfield.default"),
  message: t(
    "pages.component.toast.content.playground.messageTextfield.default"
  ),
  duration: 5,
});

function notEmpty(value) {
  if (value === "") {
    return t("pages.component.toast.content.playground.rule.notEmpty");
  }
  return true;
}

function isNumber(value) {
  if (isNaN(value)) {
    return t("pages.component.toast.content.playground.rule.isNumber");
  }
  return true;
}

function maxVal(max) {
  return (value) => {
    if (value > max) {
      return t("pages.component.toast.content.playground.rule.maxVal", { max });
    }
    return true;
  };
}

function minVal(min) {
  return (value) => {
    if (value < min) {
      return t("pages.component.toast.content.playground.rule.maxVal", { min });
    }
    return true;
  };
}

//DOCUMENTATION
let componentName = "Toast";

let props = [
  {
    name: "id",
    type: "String",
    default: undefined,
    description: t(
      "pages.component.toast.content.documentation.props.id.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      text: "text-gray-700 dark:text-gray-300",
      bg: "bg-gray-100 dark:bg-zinc-800",
      icon: {
        info: {
          text: "text-blue-500 dark:text-blue-200",
          bg: "bg-blue-200 dark:bg-blue-800",
        },
        warning: {
          text: "text-yellow-500 dark:text-yellow-200",
          bg: "bg-yellow-200 dark:bg-yellow-800",
        },
        error: {
          text: "text-red-500 dark:text-red-200",
          bg: "bg-red-200 dark:bg-red-800",
        },
        success: {
          text: "text-green-500 dark:text-green-200",
          bg: "bg-green-200 dark:bg-green-800",
        },
      },
    },
    description: t(
      "pages.component.toast.content.properties.color.description"
    ),
  },
  {
    name: "autoClose",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.toast.content.properties.autoClose.description"
    ),
  },
  {
    name: "duration",
    type: "Number",
    default: 5,
    description: t(
      "pages.component.toast.content.properties.duration.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.toast.content.properties.rounded.description"
    ),
  },
  {
    name: "type",
    type: "String",
    default: "info",
    description: t("pages.component.toast.content.properties.type.description"),
  },
  {
    name: "title",
    type: "String",
    default: "Toast-Title",
    description: t(
      "pages.component.toast.content.properties.title.description"
    ),
  },
  {
    name: "message",
    type: "String",
    default: "Toast-Message-Line",
    description: t(
      "pages.component.toast.content.properties.message.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.toast.content.properties.shadow.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: "w-full",
    description: t(
      "pages.component.toast.content.properties.width.description"
    ),
  },
];

let caveats = [
  {
    name: t("pages.component.toast.content.caveats.icon.title"),
    description: t("pages.component.toast.content.caveats.icon.description", {
      url: "https://github.com/antfu/unplugin-icons",
    }),
  },
  {
    name: t("pages.component.toast.content.caveats.button.title"),
    description: t("pages.component.toast.content.caveats.button.description", {
      url: useLocaleUrl("component/button"),
    }),
  },
  {
    name: t("pages.component.toast.content.caveats.progress.title"),
    description: t(
      "pages.component.toast.content.caveats.progress.description",
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
