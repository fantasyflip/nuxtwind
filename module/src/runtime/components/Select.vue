<template>
  <div id="select" class="relative" :class="props.width?.textfield">
    <Textfield
      v-model="selectSearch"
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
      @focus-in="saveInput"
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
      <ul>
        <li
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
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Textfield from "./Textfield.vue";
import { computed, ref, onMounted } from "vue";
let showSelect = ref(false);
let savedInput = ref("");
let selectSearch = ref(props.modelValue || "");

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

let props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    required: true,
  },
  color: {
    type: Object,
    default() {
      return {
        textfield: {},
        bg: "bg-gray-200 dark:bg-zinc-800",
        text: "text-black dark:text-white",
        border: "border-gray-300 dark:border-zinc-700",
        hover: "hover:bg-primary-700",
      };
    },
  },
  search: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  outlined: {
    type: [Boolean, String],
    default: false,
  },
  filled: {
    type: [Boolean, String],
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
  placeholder: {
    type: String,
    default: " ",
  },
  transition: {
    type: [Object, Boolean],
    default: true,
  },
  shadow: {
    type: [Boolean, String],
    default: true,
  },
  appendIcon: {
    type: Object,
    default: null,
  },
  prependIcon: {
    type: Object,
    default: null,
  },
  width: {
    type: Object,
    default() {
      return {
        textfield: "w-full",
        select: "w-full",
      };
    },
  },
  height: {
    type: String,
    default: "max-h-48",
  },
});

let emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  window.addEventListener("click", function (e) {
    if (!document.getElementById("select").contains(e.target)) {
      if (!props.items.includes(selectSearch.value)) {
        selectSearch.value = savedInput.value;
      }
      showSelect.value = false;
    }
  });
});

let selectItems = computed(() => {
  if (props.search) {
    return props.items.filter((item) => {
      return item.toLowerCase().includes(selectSearch.value.toLowerCase());
    });
  } else {
    return props.items;
  }
});

function saveInput() {
  savedInput.value = selectSearch.value;
}

function setItem(value) {
  selectSearch.value = "";
  selectSearch.value = value;
  emit("update:modelValue", value);
  showSelect.value = false;
}

let dropDownStyleCass = computed(() => {
  let classes = [];
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
  let classes = [];
  // class='border-b'
  classes.push("border-b");

  //COLOR
  classes.push(props.color.border || defaults.color.border);
  classes.push(props.color.text || defaults.color.text);
  classes.push(props.color.hover || defaults.color.hover);

  return classes.join(" ");
});
</script>