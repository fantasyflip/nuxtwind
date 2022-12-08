<template>
  <div :class="styleClass">
    <NuxtLink v-if="props.link" :to="props.link" :target="props.target">
      <slot>Link-Button</slot>
    </NuxtLink>

    <slot v-else>Button</slot>
  </div>
</template>

<script setup>
//TODO Add automatic growth with child elements instead of full width
//TODO reduce default growth
let defaults = {
  color: {
    bg: "bg-cyan-900",
    text: "text-white",
    border: "border-white",
    hover: "hover:bg-cyan-800",
  },
  rounded: "rounded-md",
  grow: {
    delay: "delay-10",
    scale: "hover:scale-110",
  },
  outlined: "border-2",
  shadow: "shadow-md",
  transition: {
    duration: "duration-300",
    ease: "ease-in-out",
  },
};

const props = defineProps({
  color: {
    type: Object,
    default: {
      bg: "bg-cyan-900",
      text: "text-white",
      border: "border-white",
      hover: "hover:bg-cyan-800",
    },
  },
  rounded: {
    type: [Boolean, String],
    default: false,
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
  if (props.color) {
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
        styleClasses.push(props.color.hover || defaults.color.hover);
      }
    } else {
      styleClasses.push(props.color.bg || defaults.color.bg);
      styleClasses.push(props.color.text || defaults.color.text);
      if (!props.disabled && !props.loading) {
        styleClasses.push(props.color.hover || defaults.color.hover);
      }
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
    styleClasses.push("opacity-50");
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
    styleClasses.push("py-1 px-2 text-sm");
  } else if (!props.icon) {
    styleClasses.push("py-2 px-5");
  }

  //WIDTH
  if (props.width) {
    styleClasses.push(props.width);
  }

  //HEIGHT
  if (props.height) {
    styleClasses.push(props.height);
  }

  styleClasses.push("flex justify-center items-center");

  return styleClasses.join(" ");
});
</script>
