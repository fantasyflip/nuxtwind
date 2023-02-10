<template>
  <NuxtLink
    v-if="props.link"
    :to="props.link"
    :class="styleClass"
    :target="props.target"
    :aria-label="props.ariLabel"
  >
    <div class="relative">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Progress
          v-if="props.loading"
          :circular="{
            width: props.dense ? 'w-4' : 'w-6',
            height: props.dense ? 'h-4' : 'h-6',
          }"
          loading
          :color="{
            circle: props.color?.loadingCircle || defaults.color.loadingCircle,
            circleDark:
              props.color?.loadingCircleDark ||
              defaults.color.loadingCircleDark,
            circleProgress:
              props.color?.loadingCircleProgress ||
              defaults.color.loadingCircleProgress,
            circleProgressDark:
              props.color?.loadingCircleProgressDark ||
              defaults.color.loadingCircleProgressDark,
            circleCutout:
              props.color?.loadingCircleCutout ||
              defaults.color.loadingCircleCutout,
          }"
        />
      </div>
      <div :class="props.loading ? 'opacity-0 cursor-wait' : ''">
        <slot>Button</slot>
      </div>
    </div>
  </NuxtLink>
  <button
    v-else
    :class="styleClass"
    :disabled="props.disabled"
    :type="props.type"
    :aria-label="props.ariLabel"
  >
    <div class="relative">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Progress
          v-if="props.loading"
          :circular="{
            width: props.dense ? 'w-4' : 'w-6',
            height: props.dense ? 'h-4' : 'h-6',
          }"
          loading
          :color="{
            circle: props.color?.loadingCircle || defaults.color.loadingCircle,
            circleDark:
              props.color?.loadingCircleDark ||
              defaults.color.loadingCircleDark,
            circleProgress:
              props.color?.loadingCircleProgress ||
              defaults.color.loadingCircleProgress,
            circleProgressDark:
              props.color?.loadingCircleProgressDark ||
              defaults.color.loadingCircleProgressDark,
            circleCutout:
              props.color?.loadingCircleCutout ||
              defaults.color.loadingCircleCutout,
          }"
        />
      </div>
      <div :class="props.loading ? 'opacity-0 cursor-wait' : ''">
        <slot>Button</slot>
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
export interface Props {
  color?: {
    bg?: string;
    text?: string;
    border?: string;
    hover?: string;
    iconHover?: string;
    loadingCircle?: string;
    loadingCircleDark?: string;
    loadingCircleProgress?: string;
    loadingCircleProgressDark?: string;
    loadingCircleCutout?: string;
  };
  rounded?: boolean | string;
  grow?:
    | boolean
    | {
        delay?: string;
        scale?: string;
      };
  link?: object | string;
  target?: string;
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
  outlined?: boolean | string;
  shadow?: boolean | string;
  transition?:
    | boolean
    | {
        duration?: string;
        ease?: string;
      };
  dense?: boolean;
  ariLabel?: string;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
}

import Progress from "./Progress.vue";
import { computed } from "vue";

let defaults = {
  color: {
    bg: "bg-primary-900 dark:bg-primary-900",
    text: "dark:text-white text-black",
    border: "dark:border-white border-black",
    hover: "hover:bg-secondary-800 dark:hover:bg-secondary-800",
    iconHover: "hover:text-secondary-800 dark:hover:text-secondary-800",
    loadingCircle: "gray-400",
    loadingCircleDark: "gray-700",
    loadingCircleProgress: "primary-400",
    loadingCircleProgressDark: "primary-400",
    loadingCircleCutout: "before:bg-primary-900 dark:before:bg-primary-900",
  },
  rounded: "rounded-md",
  grow: {
    delay: "delay-10",
    scale: "hover:scale-105",
  },
  outlined: "border-2",
  shadow: "shadow-md",
  transition: {
    duration: "duration-300",
    ease: "ease-in-out",
  },
  width: "w-fit",
};

const props = withDefaults(defineProps<Props>(), {
  color: () => {
    return {
      bg: "bg-primary-900 dark:bg-primary-900",
      text: "dark:text-white text-black",
      border: "dark:border-white border-black",
      hover: "hover:bg-secondary-800 dark:hover:bg-secondary-800",
      iconHover: "hover:text-secondary-800 dark:hover:text-secondary-800",
      loadingCircle: "gray-400",
      loadingCircleDark: "gray-700",
      loadingCircleProgress: "primary-400",
      loadingCircleProgressDark: "primary-400",
      loadingCircleCutout: "before:bg-primary-900 dark:before:bg-primary-900",
    };
  },
  rounded: true,
  grow: () => {
    return {
      delay: "delay-10",
      scale: "hover:scale-105",
    };
  },
  link: () => {
    return "";
  },
  target: "_self",
  disabled: false,
  icon: false,
  loading: false,
  outlined: false,
  shadow: true,
  transition: () => {
    return {
      duration: "duration-300",
      ease: "ease-in-out",
    };
  },
  dense: false,
  ariLabel: "",
  type: "button",
  width: undefined,
  height: "",
});

const styleClass = computed(() => {
  let styleClasses: string[] = [];

  //COLOR
  //OUTLINED
  if (props.outlined) {
    styleClasses.push(props.color.text || defaults.color.text);
    styleClasses.push(props.color.border || defaults.color.border);
    if (typeof props.outlined === "string") {
      styleClasses.push(props.outlined);
    } else {
      styleClasses.push(defaults.outlined);
    }
  } else if (props.icon) {
    styleClasses.push(props.color.text || defaults.color.text);
    if (!props.disabled && !props.loading) {
      styleClasses.push(props.color.iconHover || defaults.color.iconHover);
    }
  } else {
    styleClasses.push(props.color.bg || defaults.color.bg);
    styleClasses.push(props.color.text || defaults.color.text);
    if (!props.disabled && !props.loading) {
      styleClasses.push(props.color.hover || defaults.color.hover);
    }
  }

  //BORDER RADIUS
  if (props.rounded) {
    styleClasses.push(
      typeof props.rounded === "string" ? props.rounded : defaults.rounded
    );
  }

  //DISABLED
  if (props.disabled) {
    styleClasses.push("opacity-50 cursor-not-allowed");
  } else if (!props.loading) {
    styleClasses.push("cursor-pointer");
    //GROW
    if (typeof props.grow === "boolean" && props.grow) {
      styleClasses.push(defaults.grow.delay);
      styleClasses.push(defaults.grow.scale);
    } else if (typeof props.grow === "object" && props.grow) {
      styleClasses.push(props.grow.delay || defaults.grow.delay);
      styleClasses.push(props.grow.scale || defaults.grow.scale);
    }
  } else {
    styleClasses.push("cursor-wait opacity-50");
  }
  if (props.disabled) {
    styleClasses.push("opacity-50 cursor-not-allowed");
  }

  //TRANSITION
  if (typeof props.transition === "boolean" && props.transition) {
    styleClasses.push(defaults.transition.duration);
    styleClasses.push(defaults.transition.ease);
  } else if (typeof props.grow === "object" && props.transition) {
    styleClasses.push(
      props.transition.duration || defaults.transition.duration
    );
    styleClasses.push(props.transition.ease || defaults.transition.ease);
  }

  //SHADOW
  if (props.shadow) {
    if (props.icon && typeof props.shadow === "boolean") {
      styleClasses.push("shadow-none");
    } else {
      styleClasses.push(
        typeof props.shadow === "string" ? props.shadow : defaults.shadow
      );
    }
  }

  //DENSE
  if (props.dense) {
    styleClasses.push("py-1 px-2 text-sm min-h-[28px] min-w-[24px]");
  } else if (!props.icon) {
    styleClasses.push("py-2 px-5 min-h-[40px]");
  }

  //WIDTH
  styleClasses.push(props.width || defaults.width);

  //HEIGHT
  if (props.height) {
    styleClasses.push(props.height);
  }

  styleClasses.push("flex justify-center items-center");

  return styleClasses.join(" ");
});
</script>
