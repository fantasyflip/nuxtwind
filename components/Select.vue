<template>
  <div class="relative" id="select">
    <Textfield
      @click="disabled || loading ? '' : (showSelect = true)"
      autocomplete="off"
      v-model="selectSearch"
      :outlined="props.outlined"
      :filled="props.filled"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :color="props.color?.textfield || defaults.color.textfield"
      :loading="props.loading"
      :width="props.width?.textfield || defaults.width.textfield"
      :label="props.label"
    />
    <div v-if="showSelect" :class="dropDownStyleCass">
      <ul>
        <li
          class="p-2"
          v-for="(item, index) in selectItems"
          :class="index < selectItems.length - 1 ? itemStyleClass : ''"
          :key="index"
          @click.stop="setItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
let showSelect = ref(false);
let selectSearch = ref(props.modelValue || "");

let defaults = {
  color: {
    textfield: {},
    bg: "bg-gray-200 dark:bg-zinc-800",
    text: "text-black dark:text-white",
    border: "border-gray-300 dark:border-zinc-700",
  },
  width: {
    textfield: "",
    select: "w-full",
  },
  shadow: "shadow-lg",
};

let props = defineProps({
  modelValue: {},
  items: {
    type: Array,
    required: true,
  },
  color: {
    type: Object,
    default: {
      textfield: {},
      bg: "bg-gray-200 dark:bg-zinc-800",
      text: "text-black dark:text-white",
      border: "border-gray-300 dark:border-zinc-700",
      hover: "hover:bg-primary-700",
    },
  },
  label: {
    type: String,
    default: "",
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  filled: {
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
  placeholder: {
    type: String,
    default: " ",
  },
  shadow: {
    type: [Boolean, String],
    default: true,
  },
  width: {
    type: Object,
    default: {
      textfield: "",
      select: "w-full",
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
      showSelect.value = false;
    }
  });
});

let selectItems = computed(() => {
  return props.items.filter((item) => {
    return item.toLowerCase().includes(selectSearch.value.toLowerCase());
  });
});

function setItem(value) {
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
