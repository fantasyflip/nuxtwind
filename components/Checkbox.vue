<template>
  <div class="flex">
    <div id="checkbox" :class="iconStyleClass">
      <MdiCheckboxMarked
        v-if="modelValue && !props.radio"
        @click="updateModelValue(false)"
      />
      <MdiCheckboxBlankOutline
        v-else-if="!modelValue && !props.radio"
        @click="updateModelValue(true)"
      />
      <MdiCheckboxMarkedCircle
        v-if="modelValue && props.radio"
        @click="updateModelValue(false)"
      />
      <MdiCheckboxBlankCircleOutline
        v-else-if="!modelValue && props.radio"
        @click="updateModelValue(true)"
      />
    </div>
    <div v-if="props.label" :class="labelStyleClass">
      <label
        for="checkbox"
        :class="props.disabled || props.loading ? '' : 'cursor-pointer'"
        @click="updateModelValue(!props.modelValue)"
      >
        <slot name="label">{{ label }}</slot>
      </label>
      <p
        v-if="description"
        id="checkbox-description"
        :class="descriptionStyleClass"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup>
import MdiCheckboxBlankOutline from "~icons/mdi/checkbox-blank-outline";
import MdiCheckboxMarked from "~icons/mdi/checkbox-marked";
import MdiCheckboxBlankCircleOutline from "~icons/mdi/checkbox-blank-circle-outline";
import MdiCheckboxMarkedCircle from "~icons/mdi/checkbox-marked-circle";

let defaults = {
  color: {
    label: "text-black dark:text-gray-300",
    description: "text-gray-500 dark:text-gray-400",
    iconInactive: "text-gray-500 dark:text-gray-400",
    iconActive: "text-primary-800 dark:text-primary-800",
    hover: "hover:text-secondary-700 dark:hover:text-secondary-700",
  },
  text: {
    label: "text-sm font-medium",
    description: "text-xs font-normal",
  },
};

let props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Object,
    default() {
      return {
        label: "text-black dark:text-gray-300",
        description: "text-gray-500 dark:text-gray-400",
        iconInactive: "text-gray-500 dark:text-gray-400",
        iconActive: "text-primary-800 dark:text-primary-800",
        hover: "hover:text-secondary-700 dark:hover:text-secondary-700",
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
  text: {
    type: Object,
    default() {
      return {
        label: "text-sm font-medium",
        description: "text-xs font-normal",
      };
    },
  },
  radio: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

let emit = defineEmits(["update:modelValue"]);

function updateModelValue(value) {
  if (props.disabled || props.loading) return;
  emit("update:modelValue", value);
}

let iconStyleClass = computed(() => {
  let classes = [];
  classes.push("flex", "items-center", "h-5");

  //COLOR

  if (props.modelValue) {
    classes.push(props.color?.iconActive || defaults.color.iconActive);
  } else {
    classes.push(props.color?.iconInactive || defaults.color.iconInactive);
  }

  //DISABLED && LOADING
  if (props.disabled) {
    classes.push("cursor-not-allowed");
    classes.push("opacity-50");
  } else if (props.loading) {
    classes.push("cursor-wait");
    classes.push("animate-pulse");
  } else {
    classes.push("cursor-pointer");
    classes.push(props.color?.hover || defaults.color.hover);
  }

  return classes.join(" ");
});

let labelStyleClass = computed(() => {
  let classes = [];
  classes.push("ml-2");

  classes.push(props.text?.label || defaults.text.label);

  classes.push(props.color?.label || defaults.color.label);

  return classes.join(" ");
});

let descriptionStyleClass = computed(() => {
  let classes = [];

  classes.push(props.text?.description || defaults.text.description);

  classes.push(props.color?.description || defaults.color.description);

  return classes.join(" ");
});
</script>
