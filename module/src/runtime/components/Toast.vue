<template>
  <div
    :id="props.id"
    :ref="props.id"
    role="alert"
    :class="toastWrapperStyleClass"
    class="toast-notification"
  >
    <div class="flex items-center p-4">
      <div :class="iconStyleClass">
        <component :is="props.icon" v-if="props.icon" />
        <div v-else>
          <svg
            v-if="props.type === 'info'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2v6Z"
            ></path>
          </svg>
          <!-- <MdiInformationOutline v-if="props.type === 'info'" /> -->
          <svg
            v-else-if="props.type === 'warning'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="M12 2c-.5 0-1 .19-1.41.59l-8 8c-.79.78-.79 2.04 0 2.82l8 8c.78.79 2.04.79 2.82 0l8-8c.79-.78.79-2.04 0-2.82l-8-8C13 2.19 12.5 2 12 2m-1 5h2v6h-2V7m0 8h2v2h-2v-2Z"
            ></path>
          </svg>
          <!-- <MdiAlertRhombus v-else-if="props.type === 'warning'" /> -->
          <svg
            v-else-if="props.type === 'success'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"
            ></path>
          </svg>
          <!-- <MdiCheckCircle v-else-if="props.type === 'success'" /> -->
          <svg
            v-else-if="props.type === 'error'"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-3fc632e9=""
          >
            <path
              fill="currentColor"
              d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68L23 12m-10 5h-2v-2h2v2m0-4h-2V7h2v6Z"
            ></path>
          </svg>
          <!-- <MdiAlertDecagram v-else-if="props.type === 'error'" /> -->
        </div>

        <span class="sr-only">Toast icon</span>
      </div>
      <div class="ml-3 mr-3">
        <div v-if="props.title" class="font-bold">
          {{ props.title }}
        </div>
        <div v-if="props.message" class="text-sm font-normal">
          {{ props.message }}
        </div>
      </div>
      <Button
        class="ml-auto"
        icon
        :color="{
          text: 'text-gray-700 dark:text-gray-300',
          iconHover: 'hover:text-gray-400 dark:hover:text-gray-500',
        }"
        ari-label="Close"
        @click="close()"
      >
        <!-- <MdiClose /> -->
        <svg
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          data-v-3fc632e9=""
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          ></path>
        </svg>
      </Button>
    </div>
    <Progress
      v-if="props.autoClose"
      v-model="progressValue"
      :initial-load-time="false"
      :transition="false"
      :color="{
        background: 'bg-gray-100 dark:bg-zinc-700',
      }"
      rounded="false"
    />
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  id?: string;
  color?: {
    text?: string;
    bg?: string;
    icon?: {
      info?: {
        text?: string;
        bg?: string;
      };
      warning?: {
        text?: string;
        bg?: string;
      };
      error?: {
        text?: string;
        bg?: string;
      };
      success?: {
        text?: string;
        bg?: string;
      };
    };
  };
  autoClose?: boolean;
  duration?: number;
  rounded?: boolean | string;
  type?: string;
  title?: string;
  message?: string;
  shadow?: boolean | string;
  icon?: object;
  width?: string;
}
import Progress from "./Progress.vue";
import Button from "./Button.vue";
import { computed, ref } from "vue";
let defaults = {
  color: {
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
  rounded: "rounded-lg",
  shadow: "shadow-lg",
};

const props = withDefaults(defineProps<Props>(), {
  color: () => {
    return {
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
    };
  },
  autoClose: true,
  duration: 5,
  rounded: true,
  type: "info",
  title: "Toast-Title",
  message: "Toast-Message",
  shadow: true,
  width: "w-full",
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "autoClose"): void;
}>();

let progressValue = ref(100);

if (props.autoClose) {
  let progress = setInterval(() => {
    progressValue.value -= 1;
    if (progressValue.value <= 0) {
      clearInterval(progress);
      close();
      emit("autoClose");
    }
  }, props.duration * 10);
}

const close = () => {
  emit("close");
};

const toastWrapperStyleClass = computed(() => {
  let classes: string[] = [];
  // class="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
  classes.push("overflow-hidden");

  //COLOR
  classes.push(props.color.text || defaults.color.text);
  classes.push(props.color.bg || defaults.color.bg);

  //ROUNDED
  if (typeof props.rounded === "string") {
    classes.push(props.rounded);
  } else if (props.rounded) {
    classes.push(defaults.rounded);
  }

  //WIDTH
  classes.push(props.width);

  //SHADOW
  if (typeof props.shadow === "string") {
    classes.push(props.shadow);
  } else if (props.shadow) {
    classes.push(defaults.shadow);
  }

  return classes.join(" ");
});

const iconStyleClass = computed(() => {
  let classes: string[] = [];
  // class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-green-700"
  classes.push(
    "inline-flex",
    "flex-shrink-0",
    "justify-center",
    "items-center",
    "w-8",
    "h-8",
    "rounded-lg"
  );

  //COLOR
  let iconText = "";
  let iconBg = "";
  if (props.type === "warning") {
    iconText =
      props.color.icon?.warning?.text || defaults.color.icon.warning.text;
    iconBg = props.color.icon?.warning?.bg || defaults.color.icon.warning.bg;
  } else if (props.type === "error") {
    iconText = props.color.icon?.error?.text || defaults.color.icon.error.text;
    iconBg = props.color.icon?.error?.bg || defaults.color.icon.error.bg;
  } else if (props.type === "success") {
    iconText =
      props.color.icon?.success?.text || defaults.color.icon.success.text;
    iconBg = props.color.icon?.success?.bg || defaults.color.icon.success.bg;
  } else {
    iconText = props.color.icon?.info?.text || defaults.color.icon.info.text;
    iconBg = props.color.icon?.info?.bg || defaults.color.icon.info.bg;
  }

  classes.push(iconText);
  classes.push(iconBg);

  return classes.join(" ");
});
</script>

<style scoped>
.toast-notification {
  transition: all 0.3s ease-in-out;
}
</style>
