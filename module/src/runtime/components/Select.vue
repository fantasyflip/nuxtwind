<template>
  <div ref="selectWrapper" class="relative" :class="props.width?.textfield">
    <Textfield
      v-model="selectSearch"
      ref="select"
      autocomplete="off"
      :outlined="props.outlined"
      :filled="props.filled"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :color="props.color?.textfield || defaults.color.textfield"
      :loading="props.loading"
      :width="props.width?.textfield || defaults.width.textfield"
      :label="props.label"
      :transition="props.transition"
      :append-icon="props.appendIcon"
      :prepend-icon="props.prependIcon"
      @click="disabled || loading ? '' : (showSelectOptions = true)"
      @focus-in="showSelectOptions = true"
    >
      <template v-if="props.prependIcon" #prepend-icon>
        <slot name="prepend-icon">
          <component :is="props.prependIcon" />
        </slot>
      </template>
      <template v-if="props.appendIcon" #append-icon>
        <slot name="append-icon">
          <component :is="props.appendIcon" />
        </slot>
      </template>
      <template #label> <slot name="label"></slot> </template>
    </Textfield>
    <div v-if="showSelectOptions" :class="dropDownStyleCass">
      <option
        v-for="(item, index) in selectItems"
        :key="index"
        class="p-2"
        :class="
          index < selectItems.length - 1
            ? itemStyleClass
            : props.color?.hover || defaults.color.hover
        "
        @click.stop="setItem(item)"
      >
        {{
          typeof props.items[0] == "object" && props.displayProperty
            ? item[props.displayProperty]
            : item
        }}
      </option>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: any;
  items: any[];
  color?: {
    textfield?: {
      bg?: string;
      text?: string;
      hint?: string;
      error?: string;
      label?: string;
      labelFocus?: string;
      placeholderText?: string;
      icon?: string;
      iconFocus?: string;
      border?: string;
      borderFocus?: string;
      borderError?: string;
      borderFocusError?: string;
    };
    bg?: string;
    text?: string;
    border?: string;
    hover?: string;
  };
  search?: boolean;
  label?: string;
  outlined?: boolean | string;
  filled?: boolean | string;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  transition?:
    | boolean
    | {
        duration?: string;
        ease?: string;
        placeholder?: {
          duration?: string;
          ease?: string;
        };
      };
  shadow?: boolean | string;
  appendIcon?: object;
  prependIcon?: object;
  width?: {
    textfield?: string;
    select?: string;
  };
  height?: string;
  displayProperty?: string;
}
import Textfield from "./Textfield.vue";
import { computed, ref, onMounted, watch } from "vue";

let defaults = {
  color: {
    textfield: {},
    bg: "bg-gray-200 dark:bg-zinc-800",
    text: "text-black dark:text-white",
    border: "border-gray-300 dark:border-zinc-700",
    hover: "hover:bg-primary-700",
  },
  width: {
    textfield: "",
    select: "w-full",
  },
  shadow: "shadow-lg",
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  items: () => {
    return [];
  },
  color: () => {
    return {
      textfield: {},
      bg: "bg-gray-200 dark:bg-zinc-800",
      text: "text-black dark:text-white",
      border: "border-gray-300 dark:border-zinc-700",
      hover: "hover:bg-primary-700",
    };
  },
  search: false,
  label: "",
  outlined: false,
  filled: false,
  disabled: false,
  loading: false,
  placeholder: "",
  transition: true,
  shadow: true,
  appendIcon: undefined,
  prependIcon: undefined,
  width: () => {
    return {
      textfield: "w-full",
      select: "w-full",
    };
  },
  height: "max-h-48",
});

const emit = defineEmits<{
  (e: "update:modelValue", id: any): void;
}>();

const select = ref(null);
const selectWrapper = ref(null);

defineExpose({
  // // @ts-expect-error - TS doesn't know about ref
  select,
});

let showSelectOptions = ref(false);
let selectSearch = ref("");
let lastValidItem = ref();

//watch modelValue to update on programmatic change
watch(
  () => props.modelValue,
  (newValue) => {
    setItem(newValue);
  }
);

onMounted(() => {
  //handle initial value
  if (props.modelValue) {
    lastValidItem.value = props.modelValue;
    if (typeof props.modelValue == "object" && props.displayProperty) {
      selectSearch.value = props.modelValue[props.displayProperty];
    } else {
      selectSearch.value = props.modelValue;
    }
  }

  //handle click outside of select
  window.addEventListener("click", function (e) {
    if (
      selectWrapper.value &&
      // @ts-expect-error - TS doesn't know about ref
      !selectWrapper.value.contains(e.target as Node)
    ) {
      showSelectOptions.value = false;

      if (props.search) {
        //check if search is valid

        //if input is an object, search through the displayProperty
        if (
          typeof props.modelValue == "object" &&
          props.displayProperty &&
          props.modelValue[props.displayProperty] != selectSearch.value
        ) {
          //invalid search
          emit("update:modelValue", lastValidItem.value);
          selectSearch.value = lastValidItem.value[props.displayProperty];
        } else if (
          typeof props.modelValue != "object" &&
          props.modelValue != selectSearch.value
        ) {
          //invalid search
          emit("update:modelValue", lastValidItem.value);
          selectSearch.value = lastValidItem.value;
        }
      }
    }
  });
});

const selectItems = computed(() => {
  if (!props.search) {
    //no search through items -> just hand over items
    if (typeof props.items[0] == "object" && !props.displayProperty) {
      return "Please provide a displayProperty when using objects as items".split(
        " "
      );
    }
    return props.items;
  } else {
    //search through items -> return items that match search
    //if input is an object, search through the displayProperty
    if (typeof props.items[0] == "object") {
      if (props.displayProperty) {
        return props.items.filter((item) =>
          item[props.displayProperty!]
            .toLowerCase()
            .includes(selectSearch.value.toLowerCase())
        );
      } else {
        return "Please provide a displayProperty when using objects as items".split(
          " "
        );
      }
    } else {
      return props.items.filter((item) =>
        item.toLowerCase().includes(selectSearch.value.toLowerCase())
      );
    }
  }
});

function setItem(item: any) {
  if (typeof props.items[0] == "object" && props.displayProperty) {
    selectSearch.value = item[props.displayProperty];
  } else {
    selectSearch.value = item;
  }
  lastValidItem.value = item;
  emit("update:modelValue", item);
  showSelectOptions.value = false;
}

let dropDownStyleCass = computed(() => {
  let classes: string[] = [];
  // class="overflow-auto w-full max-h-48 z-50 absolute shadow-xl"
  classes.push("overflow-auto", "z-50", "absolute");

  //WIDTH
  classes.push(props.width.select || defaults.width.select);

  //HEIGHT
  classes.push(props.height);

  //SHADOW
  if (props.shadow && typeof props.shadow === "string") {
    classes.push(props.shadow);
  } else if (props.shadow) {
    classes.push(defaults.shadow);
  }

  //COLOR
  classes.push(props.color.bg || defaults.color.bg);

  //search
  if (!props.search) {
    if (props.outlined) {
      classes.push("top-3", "max-w-[96%]", "left-1");
    } else if (props.filled) {
      classes.push("top-5");
    } else {
      classes.push("top-2");
    }
  }

  return classes.join(" ");
});

let itemStyleClass = computed(() => {
  let classes: string[] = [];
  // class='border-b'
  classes.push("border-b");

  //COLOR
  classes.push(props.color.border || defaults.color.border);
  classes.push(props.color.text || defaults.color.text);
  classes.push(props.color.hover || defaults.color.hover);

  return classes.join(" ");
});
</script>
