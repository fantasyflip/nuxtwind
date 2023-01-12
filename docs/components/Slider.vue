<template>
  <div>
    <div v-if="props.label">
      <slot name="label">{{ props.label }}</slot>
    </div>
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
        id="slider"
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

<script setup>
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

const tw = resolveConfig(tailwindConfig);

const colorMode = useColorMode();

let defaults = {
  color: {
    description: "text-zinc-400",
    sliderLine: "bg-zinc-600 dark:bg-zinc-600",
    sliderThumb: "primary-500",
    sliderThumbDark: "primary-500",
    sliderThumbBorder: "primary-800",
    sliderThumbBorderDark: "primary-800",
  },
  rounded: "rounded-lg",
};

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  color: {
    type: Object,
    default() {
      return {
        description: "text-zinc-400",
        sliderLine: "bg-zinc-600 dark:bg-zinc-600",
        sliderThumb: "primary-500",
        sliderThumbDark: "primary-500",
        sliderThumbBorder: "primary-800",
        sliderThumbBorderDark: "primary-800",
      };
    },
  },
  label: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  thumbSize: {
    type: Number,
    default: 15,
  },
  rounded: {
    type: [Boolean, String],
    default: true,
  },
  width: {
    type: String,
    default: "w-full",
  },
  height: {
    type: String,
    default: "h-0.5",
  },
});

const emit = defineEmits(["update:modelValue"]);

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
  { immediate: true }
);

const thumbColor = computed(() => {
  let color = props.color.sliderThumb || defaults.color.sliderThumb;
  if (colorMode.value == "dark") {
    color = props.color.sliderThumbDark || defaults.color.sliderThumbDark;
  }
  if (color.includes("-")) {
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  } else {
    return tw.theme.colors[color];
  }
});

const thumbBorderColor = computed(() => {
  let color = props.color.sliderThumbBorder || defaults.color.sliderThumbBorder;
  if (colorMode.value == "dark") {
    color =
      props.color.sliderThumbBorderDark || defaults.color.sliderThumbBorderDark;
  }
  if (color.includes("-")) {
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  } else {
    return tw.theme.colors[color];
  }
});

let sliderStyleClass = computed(() => {
  let classes = [];
  classes.push("appearance-none", "cursor-pointer");

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
#slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: v-bind(thumbSize);
  height: v-bind(thumbSize);
  border-radius: 50%;
  background: radial-gradient(v-bind(thumbColor), v-bind(thumbBorderColor));
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
#slider::-webkit-slider-thumb:hover {
  width: v-bind(thumbSizeHover);
  height: v-bind(thumbSizeHover);
}
</style>
