<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Toast
          id="playground"
          width="sm:w-1/2 max-w-4/5"
          :title="testNotification.title"
          :message="testNotification.message"
          :auto-close="testNotification.autoClose"
          :type="testNotification.type"
        ></Toast>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Textfield
              v-model="testNotification.title"
              class="mb-4"
              :label="
                $t(
                  'pages.component.toast.content.playground.titleTextfield.label'
                )
              "
              filled
              :placeholder="
                $t(
                  'pages.component.toast.content.playground.titleTextfield.placeholder'
                )
              "
              :rules="[notEmpty]"
              :hint="
                $t(
                  'pages.component.toast.content.playground.titleTextfield.hint'
                )
              "
            />
            <Textfield
              v-model="testNotification.message"
              class="mb-4"
              :label="
                $t(
                  'pages.component.toast.content.playground.messageTextfield.label'
                )
              "
              filled
              :placeholder="
                $t(
                  'pages.component.toast.content.playground.messageTextfield.placeholder'
                )
              "
              :rules="[notEmpty]"
              :hint="
                $t(
                  'pages.component.toast.content.playground.messageTextfield.hint'
                )
              "
            />
            <Select
              v-model="testNotification.type"
              filled
              label="Type"
              :items="toastTypes"
              class="mb-4"
            />
            <Textfield
              v-model="testNotification.duration"
              class="mb-4"
              :label="
                $t(
                  'pages.component.toast.content.playground.durationTextfield.label'
                )
              "
              filled
              :placeholder="
                $t(
                  'pages.component.toast.content.playground.durationTextfield.placeholder'
                )
              "
              :rules="[notEmpty, isNumber, maxVal(10), minVal(1)]"
              :hint="
                $t(
                  'pages.component.toast.content.playground.durationTextfield.hint'
                )
              "
              type="number"
            />
            <Checkbox
              v-model="testNotification.autoClose"
              class="mb-4"
              label="Auto-Close"
            />
            <Button
              grow
              @click="
                useToast(
                  {
                    title: testNotification.title,
                    message: testNotification.message,
                    duration: testNotification.duration,
                    autoClose: testNotification.autoClose,
                    type: testNotification.type,
                  },
                  true
                )
              "
              >Notify</Button
            >
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :caveats="caveats"
          :events="events"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import Toast from "../../../module/src/runtime/components/Toast.vue";
import Textfield from "../../../module/src/runtime/components/Textfield.vue";
import Select from "../../../module/src/runtime/components/Select.vue";
import Checkbox from "../../../module/src/runtime/components/Checkbox.vue";
import Button from "../../../module/src/runtime/components/Button.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let toastTypes = ["info", "warning", "error", "success"];
let testNotification = ref({
  title: t("pages.component.toast.content.playground.titleTextfield.default"),
  message: t(
    "pages.component.toast.content.playground.messageTextfield.default"
  ),
  duration: 5,
  autoClose: false,
  type: "info",
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
      "pages.component.toast.content.documentation.properties.id.description"
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
      "pages.component.toast.content.documentation.properties.color.description"
    ),
  },
  {
    name: "autoClose",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.toast.content.documentation.properties.autoClose.description"
    ),
  },
  {
    name: "duration",
    type: "Number",
    default: 5,
    description: t(
      "pages.component.toast.content.documentation.properties.duration.description"
    ),
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.toast.content.documentation.properties.rounded.description"
    ),
  },
  {
    name: "type",
    type: "String",
    default: "info",
    description: t(
      "pages.component.toast.content.documentation.properties.type.description"
    ),
  },
  {
    name: "title",
    type: "String",
    default: "Toast-Title",
    description: t(
      "pages.component.toast.content.documentation.properties.title.description"
    ),
  },
  {
    name: "message",
    type: "String",
    default: "Toast-Message-Line",
    description: t(
      "pages.component.toast.content.documentation.properties.message.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.toast.content.documentation.properties.shadow.description"
    ),
  },
  {
    name: "width",
    type: "String",
    default: "w-full",
    description: t(
      "pages.component.toast.content.documentation.properties.width.description"
    ),
  },
];

let caveats = [
  {
    name: t("pages.component.toast.content.documentation.caveats.icon.title"),
    description: t(
      "pages.component.toast.content.documentation.caveats.icon.description",
      {
        url: "https://github.com/antfu/unplugin-icons",
      }
    ),
  },
  {
    name: t("pages.component.toast.content.documentation.caveats.button.title"),
    description: t(
      "pages.component.toast.content.documentation.caveats.button.description",
      {
        url: useLocaleUrl("component/button"),
      }
    ),
  },
  {
    name: t(
      "pages.component.toast.content.documentation.caveats.progress.title"
    ),
    description: t(
      "pages.component.toast.content.documentation.caveats.progress.description",
      {
        url: useLocaleUrl("component/progress"),
      }
    ),
  },
];

let events = [
  {
    name: "close",
    description: t(
      "pages.component.toast.content.documentation.events.close.description"
    ),
  },
  {
    name: "autoClose",
    description: t(
      "pages.component.toast.content.documentation.events.autoClose.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
