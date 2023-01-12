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
          <MdiInformationOutline v-if="props.type === 'info'" />
          <MdiAlertRhombus v-else-if="props.type === 'warning'" />
          <MdiCheckCircle v-else-if="props.type === 'success'" />
          <MdiAlertDecagram v-else-if="props.type === 'error'" />
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
        @click="close()"
      >
        <MdiClose />
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

<script setup>
import MdiClose from "~icons/mdi/close";
import MdiInformationOutline from "~icons/mdi/information-outline";
import MdiAlertRhombus from "~icons/mdi/alert-rhombus";
import MdiCheckCircle from "~icons/mdi/check-circle";
import MdiAlertDecagram from "~icons/mdi/alert-decagram";

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

const emit = defineEmits(["close", "autoClose"]);

let props = defineProps({
  id: {
    type: String,
    required: true,
  },
  color: {
    type: Object,
    default() {
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
  },
  autoClose: { type: Boolean, default: true },
  duration: { type: Number, default: 5 },
  rounded: {
    type: [Boolean, String],
    default: true,
  },
  type: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "warning", "error", "success"].includes(value);
    },
  },
  title: {
    type: String,
    default: "Toast-Title",
  },
  message: {
    type: String,
    default: "Toast-Message-Line",
  },
  shadow: {
    type: [Boolean, String],
    default: true,
  },
  icon: {
    type: Object,
    default: null,
  },
  width: {
    type: String,
    default: "w-full",
  },
});

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
  let classes = [];
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
  let classes = [];
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
