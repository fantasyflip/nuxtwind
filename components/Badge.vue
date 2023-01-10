<template>
  <div class="relative">
    <slot></slot>
    <div :class="styleClass">
      <div class="max-w-full truncate">
        <slot name="badge-content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
let defaults = {
  color: {
    bg: "bg-red-500 dark:bg-red-500",
    border: "border-white dark:border-zinc-900",
  },
  border: "border-2",
};

let props = defineProps({
  color: {
    type: Object,
    default() {
      return {
        bg: "bg-red-500 dark:bg-red-500",
        border: "border-white dark:border-zinc-900",
        text: "text-white",
      };
    },
  },
  top: {
    type: Boolean,
    default: true,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: true,
  },
  left: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "text-xs font-bold",
  },
  border: {
    type: [Boolean, String],
    default: true,
  },
  width: {
    type: String,
    default: "min-w-[24px]",
  },
  height: {
    type: String,
    default: "min-h-[24px]",
  },
});

const styleClass = computed(() => {
  let classes = [];
  classes.push(
    "absolute",
    "inline-flex",
    "items-center",
    "justify-center",
    "px-1",
    "rounded-full",
    "max-w-full"
  );

  //COLORS
  classes.push(props.color?.bg || defaults.color.bg);
  classes.push(props.color?.border || defaults.color.border);

  //POSITION
  //Horizontal
  if (props.left) {
    classes.push("-left-2");
  } else if (props.right) {
    classes.push("-right-2");
  } else {
    classes.push("-right-2");
  }

  //Vertical
  if (props.bottom) {
    classes.push("-bottom-2");
  } else if (props.top) {
    classes.push("-top-2");
  } else {
    classes.push("-top-2");
  }

  //TEXT
  classes.push(props.text);

  //BORDER
  if (props.border) {
    if (typeof props.border === "string") {
      classes.push(props.border);
    } else {
      classes.push(defaults.border);
    }
  }

  //WIDTH
  classes.push(props.width);

  //HEIGHT
  classes.push(props.height);

  return classes.join(" ");
});
</script>
