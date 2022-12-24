<template>
  <div v-if="props.modelValue" :class="overlayClass"></div>
  <div ref="drawer" :class="drawerWrapperClass">
    <slot></slot>
  </div>
</template>

<script setup>
let defaults = {
  color: {
    bg: "bg-white dark:bg-gray-800",
    overlayBg: "bg-black/50",
  },
  expandOnHover: {
    width: "w-12",
    hoverWidth: "hover:w-80",
  },
};

let props = defineProps({
  modelValue: {},
  color: {
    type: Object,
    default: {
      bg: "bg-white dark:bg-zinc-900",
      overlayBg: "bg-black/50",
    },
  },
  fixed: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: String,
    default: "z-[100]",
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  disableOverflow: {
    type: Boolean,
    default: true,
  },
  expandOnHover: {
    type: [Boolean, Object],
    default: false,
  },
  height: {
    type: String,
    default: "h-screen",
  },
  width: {
    type: String,
    default: "md:w-80 w-60",
  },
});

let emit = defineEmits(["update:modelValue"]);

let modelValueComputed = computed(() => {
  return props.modelValue;
});

//watch modelValueComputed
watch(modelValueComputed, (newVal, oldVal) => {
  if (newVal) {
    if (props.disableOverflow) {
      document.body.classList.add("overflow-hidden");
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }
  }
});

const drawer = ref(null);

onClickOutside(drawer, () => {
  emit("update:modelValue", false);
  if (props.disableOverflow) {
    document.body.classList.remove("overflow-hidden");
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  }
});

let overlayClass = computed(() => {
  let classes = [];
  classes.push(
    "h-full",
    "w-full",
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "z-[99]",
    "overflow-hidden"
  );

  if (props.overlay) {
    classes.push(props.color?.overlayBg || defaults.color.overlayBg);
  }

  return classes.join(" ");
});

let drawerWrapperClass = computed(() => {
  let classes = [];

  classes.push(
    "overflow-y-auto",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "transform"
  );
  if (props.expandOnHover) {
    classes.push("overflow-x-hidden");

    if (typeof props.expandOnHover === "object") {
      classes.push(props.expandOnHover?.width || defaults.expandOnHover.width);
      classes.push(
        props.expandOnHover?.hoverWidth || defaults.expandOnHover.hoverWidth
      );
    } else {
      classes.push(
        defaults.expandOnHover.width,
        defaults.expandOnHover.hoverWidth
      );
    }
  } else {
    if (props.modelValue) {
      classes.push("translate-x-0");
    } else {
      classes.push("-translate-x-full");
    }

    classes.push(props.width);
  }

  classes.push(props.color?.bg || defaults.color.bg);

  if (props.fixed) {
    classes.push("fixed");
  }

  classes.push(props.zIndex);

  classes.push(props.height);

  return classes.join(" ");
});
</script>
