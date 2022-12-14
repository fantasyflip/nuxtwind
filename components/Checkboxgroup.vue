<template>
  <div>
    <div>
      <slot name="group-label">
        <div :class="labelStyleClass">
          {{ props.label }}
        </div>
      </slot>
      <slot name="group-description">
        <div :class="descriptionStyleClass">
          {{ props.description }}
        </div>
      </slot>
    </div>
    <div>
      <slot name="group-items">
        <div v-for="(item, index) in props.items" :key="item.id">
          <Checkbox
            :label="item.label"
            :description="item.description"
            :color="item.color"
            :text="item.text"
            :disabled="item.disabled"
            :loading="item.loading"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
let defaults = {
  color: {
    label: "text-primary-800 dark:text-primary-800",
    description: "text-gray-500 dark:text-gray-400",
  },
  text: {
    label: "text-lg font-medium",
    description: "text-sm",
  },
};
let props = defineProps({
  modelValue: {},
  items: {
    type: Array,
    default: [],
  },
  color: {
    type: Object,
    default: {
      label: "text-primary-800 dark:text-primary-800",
      description: "text-gray-500 dark:text-gray-400",
    },
  },
  text: {
    type: Object,
    default: {
      label: "text-lg font-medium",
      description: "text-sm",
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
  multiple: {
    type: Boolean,
    default: false,
  },
});

let labelStyleClass = computed(() => {
  let classes = [];

  classes.push(props.text?.label || defaults.text.label);

  //COLOR
  classes.push(props.color?.label || defaults.color.label);

  return classes.join(" ");
});

let descriptionStyleClass = computed(() => {
  let classes = [];

  classes.push(props.text?.description || defaults.text.description);

  //COLOR
  classes.push(props.color?.description || defaults.color.description);

  return classes.join(" ");
});
</script>
