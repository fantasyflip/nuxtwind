<template>
  <div class="flex">
    <div :id="checkboxId" :class="iconStyleClass">
      <!-- <MdiCheckboxMarked
        v-if="modelValue && !props.radio"
        @click="updateModelValue(false)"
      /> -->
      <svg
        v-if="modelValue && !props.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(false)"
      >
        <path
          fill="currentColor"
          d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
        ></path>
      </svg>
      <!-- <MdiCheckboxBlankOutline /> -->
      <svg
        v-else-if="!modelValue && !props.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(true)"
      >
        <path
          fill="currentColor"
          d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14Z"
        ></path>
      </svg>
      <!-- <MdiCheckboxMarkedCircle
        v-if="modelValue && props.radio"
        @click="updateModelValue(false)"
      /> -->
      <svg
        v-if="modelValue && props.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(false)"
      >
        <path
          fill="currentColor"
          d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
        ></path>
      </svg>
      <!-- <MdiCheckboxBlankCircleOutline
        v-else-if="!modelValue && props.radio"
        @click="updateModelValue(true)"
      /> -->
      <svg
        v-else-if="!modelValue && props.radio"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        @click="updateModelValue(true)"
      >
        <path
          fill="currentColor"
          d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
        ></path>
      </svg>
    </div>
    <div v-if="props.label" :class="labelStyleClass">
      <label
        :for="checkboxId"
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

<script lang="ts" setup>
export interface Props {
  modelValue?: boolean;
  color?: {
    label?: string;
    description?: string;
    iconInactive?: string;
    iconActive?: string;
    hover?: string;
  };
  text?: {
    label?: string;
    description?: string;
  };
  label?: string;
  description?: string;
  radio?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
import { computed } from "vue";
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

let checkboxId = "";

onMounted(() => {
  checkboxId = generateId();
});

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

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  color: () => {
    return {
      label: "text-black dark:text-gray-300",
      description: "text-gray-500 dark:text-gray-400",
      iconInactive: "text-gray-500 dark:text-gray-400",
      iconActive: "text-primary-800 dark:text-primary-800",
      hover: "hover:text-secondary-700 dark:hover:text-secondary-700",
    };
  },
  text: () => {
    return {
      label: "text-sm font-medium",
      description: "text-xs font-normal",
    };
  },
  label: "",
  description: "",
  radio: false,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", id: boolean): void;
}>();

function updateModelValue(value) {
  if (props.disabled || props.loading) return;
  emit("update:modelValue", value);
}

let iconStyleClass = computed(() => {
  let classes: string[] = [];
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
  let classes: string[] = [];
  classes.push("ml-2");

  classes.push(props.text?.label || defaults.text.label);

  classes.push(props.color?.label || defaults.color.label);

  return classes.join(" ");
});

let descriptionStyleClass = computed(() => {
  let classes: string[] = [];

  classes.push(props.text?.description || defaults.text.description);

  classes.push(props.color?.description || defaults.color.description);

  return classes.join(" ");
});
</script>
