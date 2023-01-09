<template>
  <div :class="styleClass">
    <NuxtLink v-if="props.link" :to="props.link" class="relative">
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
    </NuxtLink>
    <div v-else class="relative">
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
  </div>
</template>

<script setup>
let defaults = {
  color: {
    bg: "bg-cyan-900 dark:bg-cyan-900",
    text: "dark:text-white text-black",
    border: "dark:border-white border-black",
    hover: "hover:bg-secondary-800 dark:hover:bg-secondary-800",
    iconHover: "hover:text-secondary-800 dark:hover:text-secondary-800",
    loadingCircle: "gray-400",
    loadingCircleDark: "gray-700",
    loadingCircleProgress: "primary-400",
    loadingCircleProgressDark: "primary-400",
    loadingCircleCutout: "before:bg-cyan-900 dark:before:bg-cyan-900",
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

const props = defineProps({
  color: {
    type: Object,
    default() {
      return {
        bg: "bg-cyan-900 dark:bg-cyan-900",
        text: "dark:text-white text-black",
        border: "dark:border-white border-black",
        hover: "hover:bg-secondary-800 dark:hover:bg-secondary-800",
        iconHover: "hover:text-secondary-800 dark:hover:text-secondary-800",
        loadingCircle: "gray-400",
        loadingCircleDark: "gray-700",
        loadingCircleProgress: "primary-400",
        loadingCircleProgressDark: "primary-400",
        loadingCircleCutout: "before:bg-cyan-900 dark:before:bg-cyan-900",
      };
    },
  },
  rounded: {
    type: [Boolean, String],
    default: true,
  },
  grow: {
    type: [Boolean, Object],
    default: false,
  },
  link: {
    type: [Object, String],
    default: null,
  },
  target: {
    type: String,
    default: "_self",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: [Boolean, String],
    default: false,
  },
  shadow: {
    type: [Boolean, String],
    default: true,
  },
  transition: {
    type: [Boolean, Object],
    default: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: undefined,
  },
  height: {
    type: String,
    default: undefined,
  },
});

const styleClass = computed(() => {
  let styleClasses = [];

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
    if (props.grow) {
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
  if (props.transition) {
    styleClasses.push("transition");
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
