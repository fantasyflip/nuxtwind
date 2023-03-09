<template>
  <div id="select" class="relative" :class="props.width?.textfield">
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
      @click="disabled || loading ? '' : (showSelect = true)"
      @focus-in="(showSelect = true) && saveInput"
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
    <div v-if="showSelect" :class="dropDownStyleCass">
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
  returnProperty?: string;
}
import Textfield from "./Textfield.vue";
import { computed, ref, onMounted } from "vue";
let showSelect = ref(false);
let savedInput = ref("");

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

let selectSearch = ref(props.modelValue || "");

const emit = defineEmits<{
  (e: "update:modelValue", id: string): void;
}>();

const select = ref(null);

defineExpose({
  // // @ts-expect-error - TS doesn't know about ref
  select,
});

onMounted(() => {
  window.addEventListener("click", function (e) {
    if (!document.getElementById("select")!.contains(e.target as Node)) {
      if (!props.items.includes(selectSearch.value)) {
        selectSearch.value = savedInput.value;
      }
      showSelect.value = false;
    }
  });
});

let selectItems = computed(() => {
  if (props.search) {
    if (typeof props.items[0] === "object" && props.displayProperty) {
      let searchItems = props.items.map((item) => {
        //return all items that match the search at the display property
        return item[props.displayProperty!]
          .toLowerCase()
          .includes(selectSearch.value.toLowerCase())
          ? item
          : null;
      });
      searchItems = searchItems.filter((item) => {
        return item !== null;
      });
      return searchItems;
    } else if (typeof props.items[0] === "object" && !props.displayProperty) {
      return "Please provide a displayProperty when using search prop with objects".split(
        " "
      );
    }
    return props.items.filter((item) => {
      return item.toLowerCase().includes(selectSearch.value.toLowerCase());
    });
  } else {
    if (props.displayProperty) {
      return props.items.map((item) => {
        return item[props.displayProperty!];
      });
    }
    return props.items;
  }
});

function saveInput() {
  savedInput.value = selectSearch.value;
}

function setItem(value) {
  selectSearch.value = "";
  if (typeof props.items[0] == "object" && props.displayProperty) {
    selectSearch.value = value[props.displayProperty!];
  } else {
    selectSearch.value = value;
  }

  emit(
    "update:modelValue",
    typeof props.items[0] == "object" && props.returnProperty
      ? value[props.returnProperty]
      : value
  );

  showSelect.value = false;
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
