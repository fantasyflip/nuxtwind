<template>
  <div :class="styleClass">
    <slot>Button</slot>
  </div>
  <div>
    {{ styleClass }}
  </div>
</template>

<script setup>
let defaults = {
  borderRadius: "lg",
  grow: {
    delay: 150,
    scale: 110,
    duration: 300,
  },
  outlined: "2",
  shadow: "md",
};

const props = defineProps({
  color: {
    type: String,
    default: "gray-600",
  },
  borderRadius: {
    type: [Boolean, String],
    default: false,
  },
  grow: {
    type: [Boolean, Object],
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
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
    default: false,
  },
});

const styleClass = computed(() => {
  let styleClass = "";

  //ICON
  if (props.icon) {
    //COLOR
    if (props.color.includes("#")) {
      styleClass += `text-[${props.color}]`;
    } else {
      styleClass += `text-${props.color}`;
    }
  } else {
    //OUTLINED
    if (props.outlined) {
      if (typeof props.outlined === "string") {
        styleClass += ` border-${props.outlined}`;
      } else {
        styleClass += ` border-${defaults.outlined}`;
      }

      //COLOR
      if (props.color.includes("#")) {
        styleClass += ` border-[${props.color}] text-[${props.color}]`;
      } else {
        styleClass += ` border-${props.color} text-${props.color}`;
      }
    } else {
      console.log("not outlined", props.color);
      //COLOR
      if (props.color.includes("#")) {
        styleClass += `bg-[${props.color}]`;
      } else {
        styleClass += `bg-${props.color}`;
      }
    }

    //BORDER RADIUS
    if (
      typeof props.borderRadius === "string" &&
      props.borderRadius.includes("px")
    ) {
      styleClass += ` rounded-[${props.borderRadius}]`;
    } else if (typeof props.borderRadius === "string") {
      styleClass += ` rounded-${props.borderRadius}`;
    } else if (props.borderRadius) {
      styleClass += ` rounded-${defaults.borderRadius}`;
    }

    //LOADING
    if (props.loading) {
      styleClass += ` opacity-50`;
    }
  }

  //DISABLED
  if (props.disabled) {
    styleClass += ` opacity-50 cursor-not-allowed`;
  } else if (!props.loading) {
    styleClass += ` cursor-pointer`;

    //GROW
    if (typeof props.grow === "object") {
      styleClass += ` transition ease-in-out delay-${
        props.grow.delay || defaults.grow.delay
      } hover:scale-${props.grow.scale || defaults.grow.scale} duration-${
        props.grow.duration || defaults.grow.duration
      }`;
    } else if (props.grow) {
      styleClass += ` transition ease-in-out delay-${defaults.grow.delay} hover:scale-${defaults.grow.scale} duration-${defaults.grow.duration}`;
    }
  }

  //SHADOW
  if (typeof props.shadow === "string" && props.shadow.includes("px")) {
    styleClass += ` shadow-[${props.shadow}]`;
  } else if (typeof props.shadow === "string") {
    styleClass += ` shadow-${props.shadow}`;
  } else if (props.shadow) {
    styleClass += ` shadow-${defaults.shadow}`;
  }

  styleClass += ` px-3 py-2`;

  return styleClass;
});
</script>

<style scoped></style>
