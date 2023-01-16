<template>
  <div :class="props.width">
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
      <div v-for="(item, index) in props.items" :key="item.id" class="pt-2">
        <Checkbox
          v-model="checkboxValues[index]"
          :label="props.generalCheckboxProps?.label || item.label"
          :description="
            props.generalCheckboxProps?.description || item.description
          "
          :color="props.generalCheckboxProps?.color || item.color"
          :text="props.generalCheckboxProps?.text || item.text"
          :disabled="props.disabled || item.disabled"
          :loading="props.loading || item.loading"
          :radio="!props.multiple && !props.noRadio"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Checkbox from "./Checkbox.vue";
import { computed, ref, watch } from "vue";
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
  modelValue: {
    default() {
      return [];
    },
    type: Array,
  },
  items: {
    type: Array,
    default() {
      return [];
    },
  },
  color: {
    type: Object,
    default() {
      return {
        label: "text-primary-800 dark:text-primary-800",
        description: "text-gray-500 dark:text-gray-400",
      };
    },
  },
  text: {
    type: Object,
    default() {
      return {
        label: "text-lg font-medium",
        description: "text-sm",
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
  multiple: {
    type: Boolean,
    default: false,
  },
  noRadio: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "w-full",
  },
  generalCheckboxProps: {
    type: Object,
    default() {
      return {};
    },
  },
  notZero: {
    type: Boolean,
    default: false,
  },
});

let emit = defineEmits(["update:modelValue"]);

let checkboxValues = ref([]);
let savedIndex = ref(-1);
let lastCheckedIndex = ref(-1);

initializeCheckboxes();

//watch for changes of the length of props.items
watch(
  () => props.items.length,
  () => {
    initializeCheckboxes();
  }
);

watch(
  () => props.modelValue,
  (newValues) => {
    checkboxValues.value = newValues;
  },
  { deep: true }
);

watch(
  checkboxValues,
  (newValues) => {
    if (props.multiple) {
      if (props.notZero) {
        let trueCount = newValues.filter((value) => value).length;
        if (trueCount === 1) {
          lastCheckedIndex.value = newValues.findIndex(
            (value) => value === true
          );
        } else if (trueCount === 0) {
          newValues[lastCheckedIndex.value] = true;
        }
      }
      emit("update:modelValue", newValues);
    } else {
      if (savedIndex.value != -1) {
        //count how often true is in the array
        let trueCount = newValues.filter((value) => value).length;
        if (trueCount > 1) {
          //if more than one checkbox is true, set all to false except the one that is not savedIndex
          newValues[savedIndex.value] = false;
          savedIndex.value = checkboxValues.value.findIndex(
            (value) => value === true
          );
        } else if (trueCount === 0 && props.notZero) {
          for (let i = 0; i < newValues.length; i++) {
            if (i != savedIndex.value) {
              newValues[i] = false;
            }
          }
          newValues[savedIndex.value] = true;
        }
        emit("update:modelValue", newValues);
      }
    }
  },
  { deep: true }
);

function initializeCheckboxes() {
  if (props.modelValue) {
    checkboxValues.value = props.modelValue;
    if (checkboxValues.value.length < props.items.length) {
      checkboxValues.value = checkboxValues.value.concat(
        Array(props.items.length - checkboxValues.value.length).fill(false)
      );
      emit("update:modelValue", checkboxValues.value);
    }

    if (!props.multiple) {
      savedIndex.value = checkboxValues.value.findIndex(
        (value) => value === true
      );
      //count hof often true is in the array
      let trueCount = checkboxValues.value.filter((value) => value).length;
      if (trueCount > 1) {
        let values = checkboxValues.value;
        for (let i = 0; i < values.length; i++) {
          if (i != savedIndex.value) {
            values[i] = false;
          }
        }
        checkboxValues.value = values;
      } else if (trueCount == 0 && props.notZero) {
        checkboxValues.value[0] = true;
        savedIndex.value = 0;
      }
    }
  }
}

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
