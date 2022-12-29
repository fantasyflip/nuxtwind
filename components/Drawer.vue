<template>
  <div v-if="props.modelValue && props.overlay" :class="overlayClass"></div>
  <div
    ref="drawer"
    @mouseenter="hanldeHoverEnter"
    @mouseleave="handleHoverLeave"
    :class="drawerWrapperClass"
  >
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
  transition: {
    duration: "duration-300",
    ease: "ease-in-out",
  },
  border: "border-r dark:border-zinc-700 border-gray-500",
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
  absolute: {
    type: Boolean,
    default: false,
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
  transition: {
    type: [Boolean, Object],
    default: true,
  },
  noMobile: {
    type: Boolean,
    default: false,
  },
  mobileWidth: {
    type: Number,
    default: 768,
  },
  border: {
    type: [Boolean, String],
    default: true,
  },
  right: {
    type: Boolean,
    default: false,
  },
  permanent: {
    type: Boolean,
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

function setDocumentOverflow(type) {
  if (type === "auto") {
    document.body.classList.remove("overflow-hidden");
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  } else if (type === "hidden") {
    document.body.classList.add("overflow-hidden");
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  }
}

let permanentComputed = computed(() => {
  return props.permanent;
});

watch(permanentComputed, (newVal, oldVal) => {
  if (newVal) {
    setDocumentOverflow("auto");
  } else {
    emit("update:modelValue", false);
  }
});

let modelValueComputed = computed(() => {
  return props.modelValue;
});

//watch modelValueComputed
watch(modelValueComputed, (newVal, oldVal) => {
  if (newVal) {
    if (props.disableOverflow && !props.permanent) {
      setDocumentOverflow("hidden");
    }
  }
});

const drawer = ref(null);

onClickOutside(drawer, () => {
  if (!props.permanent) {
    emit("update:modelValue", false);
    if (props.disableOverflow) {
      setDocumentOverflow("auto");
    }
  }
});

let isMobile = ref(false);
onMounted(() => {
  if (window.innerWidth < props.mobileWidth) {
    isMobile.value = true;
  }
  addEventListener("resize", (event) => {
    if (event.target.innerWidth < props.mobileWidth) {
      isMobile.value = true;
    } else {
      isMobile.value = false;
    }
  });
});

function hanldeHoverEnter() {
  if (props.expandOnHover && (!isMobile.value || props.noMobile)) {
    emit("update:modelValue", true);
  }
}

function handleHoverLeave() {
  if (props.expandOnHover && (!isMobile.value || props.noMobile)) {
    emit("update:modelValue", false);
    if (props.disableOverflow && !props.permanent) {
      setDocumentOverflow("auto");
    }
  }
}

let overlayClass = computed(() => {
  let classes = [];
  classes.push(
    "h-full",
    "w-full",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "z-[99]",
    "overflow-hidden"
  );

  if (props.absolute) {
    classes.push("absolute");
  } else if (props.fixed) {
    classes.push("fixed");
  }

  if (props.overlay) {
    classes.push(props.color?.overlayBg || defaults.color.overlayBg);
  }

  return classes.join(" ");
});

let drawerWrapperClass = computed(() => {
  let classes = [];

  classes.push("overflow-y-auto", "transition-all", "transform");

  if (props.expandOnHover && (!isMobile.value || props.noMobile)) {
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
      classes.push(props.width);
    } else {
      classes.push("w-0");
    }
  }

  if (props.transition) {
    if (typeof props.transition === "object") {
      classes.push(props.transition?.duration || defaults.transition.duration);
      classes.push(props.transition?.ease || defaults.transition.ease);
    } else {
      classes.push(defaults.transition.duration, defaults.transition.ease);
    }
  }

  classes.push(props.color?.bg || defaults.color.bg);

  if (props.absolute) {
    classes.push("absolute");
  } else if (props.fixed) {
    classes.push("fixed");
  }

  if (props.border && (props.modelValue || props.expandOnHover)) {
    if (typeof props.border === "string") {
      classes.push(props.border);
    } else {
      classes.push(defaults.border);
    }
  }

  classes.push(props.zIndex);

  classes.push(props.height);

  if (props.right) {
    classes.push("right-0");
  }

  return classes.join(" ");
});
</script>
