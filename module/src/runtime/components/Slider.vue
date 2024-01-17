<template>
  <div>
    <label :for="sliderId" v-if="props.label">
      <slot name="label">{{ props.label }}</slot>
    </label>
    <div v-if="props.description">
      <slot name="description">
        <div
          class="text-sm -mt-1 w-full"
          :class="props.color?.description || defaults.color.description"
        >
          {{ props.description }}
        </div>
      </slot>
    </div>
    <div class="w-full">
      <input
        :id="sliderId"
        :value="modelValue"
        :min="props.min"
        :max="props.max"
        type="range"
        :class="sliderStyleClass"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: number;
  color?: {
    description?: string;
    sliderLine?: string;
    sliderThumb?: string;
    sliderThumbDark?: string;
    sliderThumbBorder?: string;
    sliderThumbBorderDark?: string;
  };
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  thumbSize?: number;
  rounded?: string | boolean;
  width?: string;
  height?: string;
}
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";

function generateId() {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
let sliderId = "";

onMounted(() => {
  sliderId = generateId();
});

let colorMode = ref("dark");
let htmlElement = ref<HTMLElement>();
let observer: MutationObserver;

function getColorMode() {
  // get class of html element
  let htmlClass = document.querySelector("html")!.classList;
  // check if dark mode is enabled
  if (htmlClass.contains("dark")) {
    return "dark";
  } else {
    return "light";
  }
}

onMounted(() => {
  colorMode.value = getColorMode();

  htmlElement.value = document.querySelector("html") as HTMLElement;

  observer = new MutationObserver(() => {
    colorMode.value = getColorMode();
  });

  observer.observe(htmlElement.value, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});

let defaults = {
  color: {
    description: "text-zinc-400",
    sliderLine: "bg-zinc-600 dark:bg-zinc-600",
    sliderThumb: "#06b6d4",
    sliderThumbDark: "#06b6d4",
    sliderThumbBorder: "#155e75",
    sliderThumbBorderDark: "#155e75",
  },
  rounded: "rounded-lg",
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  color: () => {
    return {
      description: "text-zinc-400",
      sliderLine: "bg-zinc-600 dark:bg-zinc-600",
      sliderThumb: "#06b6d4",
      sliderThumbDark: "#06b6d4",
      sliderThumbBorder: "#155e75",
      sliderThumbBorderDark: "#155e75",
    };
  },
  label: "",
  description: "",
  min: 0,
  max: 100,
  thumbSize: 15,
  rounded: true,
  width: "w-full",
  height: "h-0.5",
});

const emit = defineEmits<{
  (e: "update:modelValue", id: number): void;
}>();

if (props.modelValue > props.max) {
  emit("update:modelValue", props.max);
}

if (props.modelValue < props.min) {
  emit("update:modelValue", props.min);
}

function handleInput(e) {
  //UPDATE MODEL VALUE
  emit("update:modelValue", e.target.value);
}

let thumbTooltipPercentage = ref("0%");
let thumbSize = props.thumbSize + "px";
let thumbSizeHover = props.thumbSize * 1.25 + "px";

let modelValueComputed = computed(() => {
  return props.modelValue;
});

watch(
  modelValueComputed,
  (newValue) => {
    let value = newValue;
    if (value > props.max) {
      value = props.max;
      emit("update:modelValue", props.max);
    }

    if (value < props.min) {
      value = props.min;
      emit("update:modelValue", props.min);
    }
    thumbTooltipPercentage.value = (value / props.max) * 100 + "%";
  },
  { immediate: true },
);

const thumbColor = computed(() => {
  if (colorMode.value === "light") {
    return props.color.sliderThumb || defaults.color.sliderThumb;
  } else {
    return props.color.sliderThumbDark || defaults.color.sliderThumbDark;
  }
});

const thumbBorderColor = computed(() => {
  if (colorMode.value === "light") {
    return props.color.sliderThumbBorder || defaults.color.sliderThumbBorder;
  } else {
    return (
      props.color.sliderThumbBorderDark || defaults.color.sliderThumbBorderDark
    );
  }
});

let sliderStyleClass = computed(() => {
  let classes: string[] = [];
  classes.push("slider", "appearance-none", "cursor-pointer");

  if (props.rounded) {
    if (typeof props.rounded === "string") {
      classes.push(props.rounded);
    } else {
      classes.push(defaults.rounded);
    }
  }

  classes.push(props.color?.sliderLine || defaults.color.sliderLine);

  classes.push(props.width);
  classes.push(props.height);
  return classes.join(" ");
});
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: v-bind(thumbSize);
  height: v-bind(thumbSize);
  border-radius: 50%;
  background: radial-gradient(v-bind(thumbColor), v-bind(thumbBorderColor));
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
.slider::-webkit-slider-thumb:hover {
  width: v-bind(thumbSizeHover);
  height: v-bind(thumbSizeHover);
}
</style>
