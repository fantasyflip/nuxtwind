<template>
  <div :class="contentWrapperClass">
    <slot>Hover over me!</slot>
    <div :class="tooltipWrapperClass">
      <slot name="tooltip">Tooltip</slot>
      <svg
        :class="pointerClass"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  color?: {
    text?: string;
    bg?: string;
    bgPointer?: string;
  };
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  transition?:
    | boolean
    | {
        duration?: string;
        ease?: string;
      };
  text?: string;
  rounded?: boolean | string;
  zIndex?: string;
  interactive?: boolean;
  width?: string;
}
import { computed } from "vue";
let defaults = {
  color: {
    text: "dark:text-white text-black",
    bg: "bg-primary-800",
    bgPointer: "bg-primary-800",
  },
  transition: {
    duration: "duration-300",
    ease: "ease-in-out",
  },
  rounded: "rounded-lg",
};

const props = withDefaults(defineProps<Props>(), {
  color: () => {
    return {
      text: "dark:text-white text-black",
      bg: "bg-primary-800",
      bgPointer: "text-primary-800",
    };
  },
  top: true,
  bottom: false,
  left: false,
  right: false,
  transition: true,
  text: "text-xs text-center",
  rounded: true,
  zIndex: "z-10",
  interactive: false,
  width: "w-fit",
});

let contentWrapperClass = computed(() => {
  let classes = ["group", "cursor-pointer", "relative", "inline-block"];

  return classes.join(" ");
});

let tooltipWrapperClass = computed(() => {
  let classes: string[] = [
    "transition-opacity",
    "opacity-0",
    "py-2",
    "absolute",
    "group-hover:opacity-100",
    "px-3",
  ];

  if (!props.interactive) {
    classes.push("pointer-events-none");
  }

  classes.push(props.color?.bg || defaults.color.bg);
  classes.push(props.color?.text || defaults.color.text);

  if (props.transition) {
    if (typeof props.transition === "object") {
      classes.push(props.transition?.duration || defaults.transition.duration);
      classes.push(props.transition?.ease || defaults.transition.ease);
    } else {
      classes.push(defaults.transition.duration);
      classes.push(defaults.transition.ease);
    }
  }

  if (props.rounded) {
    if (typeof props.rounded === "string") {
      classes.push(props.rounded);
    } else {
      classes.push(defaults.rounded);
    }
  }

  classes.push(props.zIndex);
  classes.push(props.width);

  classes.push(props.text);

  if (props.left) {
    classes.push(
      "right-full",
      "mr-2",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
    );
  } else if (props.right) {
    classes.push(
      "left-full",
      "ml-2",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
    );
  } else if (props.bottom) {
    classes.push(
      "top-full",
      "mt-2",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
    );
  } else if (props.top) {
    classes.push(
      "bottom-full",
      "mb-2",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
    );
  }

  return classes.join(" ");
});

let pointerClass = computed(() => {
  let classes: string[] = ["absolute", "text-black", "h-2", "w-full"];

  if (props.left) {
    classes.push(
      "left-1/2",
      "ml-1",
      "-rotate-90",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
    );
  } else if (props.right) {
    classes.push(
      "right-1/2",
      "mr-1",
      "rotate-90",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
    );
  } else if (props.bottom) {
    classes.push("bottom-full", "rotate-180", "left-0");
  } else if (props.top) {
    classes.push("top-full", "left-0");
  }

  classes.push(props.color?.bgPointer || defaults.color.bgPointer);

  return classes.join(" ");
});
</script>
