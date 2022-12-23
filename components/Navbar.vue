<template>
  <div :class="navbarWrapperClass">
    <div :class="props.height">
      <slot> Navigation-Bar </slot>
    </div>
    <TransitionGroup name="list">
      <!-- TODO fix z index issue  -->
      <div
        key="extension"
        v-if="extensionIsActive"
        :class="props.color?.bg || defaults.color.bg"
        class="w-full"
      >
        <slot name="extension"> Extension Slot </slot>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
let defaults = {
  color: {
    bg: "bg-white dark:bg-zinc-900",
  },
  elevateOnScroll: "drop-shadow-md",
};

let props = defineProps({
  color: {
    type: Object,
    default: {
      bg: "bg-white dark:bg-zinc-900",
    },
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  absolute: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  extension: {
    type: Boolean,
    default: false,
  },
  shrinkOnScroll: {
    type: Boolean,
    default: false,
  },
  elevateOnScroll: {
    type: Boolean,
    default: false,
  },
  scrollOffset: {
    type: Number,
    default: null,
  },
  height: {
    type: String,
    default: "h-14",
  },
});

let { y } = useWindowScroll();

let extensionIsActive = computed(() => {
  let extensionState = false;

  if (props.extension) {
    if (props.shrinkOnScroll) {
      if (props.scrollOffset) {
        if (props.scrollOffset <= 0) {
          extensionState = true;
        }
      } else {
        if (y.value <= 0) {
          extensionState = true;
        }
      }
    } else {
      extensionState = true;
    }
  }

  return extensionState;
});

let navbarWrapperClass = computed(() => {
  let classes = [];

  //   if (!props.extension) {
  classes.push(props.height);
  //   }

  classes.push(props.color?.bg || defaults.color.bg);

  if (props.fixed) {
    classes.push("fixed");
  }

  if (props.absolute) {
    classes.push("absolute");
  }

  if (props.sticky) {
    classes.push("sticky");
  }

  if (props.absolute || props.fixed || props.sticky) {
    if (props.bottom) {
      classes.push("bottom-0");
    } else {
      classes.push("top-0");
    }
    classes.push("left-0");
    classes.push("right-0");
    classes.push("z-50");
  }

  if (props.elevateOnScroll) {
    let shadowClass = "drop-shadow-none";
    if (props.fixed) {
      if (useWindowScroll().y.value > 0 && useWindowScroll().y.value < 20) {
        shadowClass = "drop-shadow-sm";
      } else if (
        useWindowScroll().y.value > 20 &&
        useWindowScroll().y.value < 40
      ) {
        shadowClass = "drop-shadow-md";
      } else if (
        useWindowScroll().y.value > 40 &&
        useWindowScroll().y.value < 80
      ) {
        shadowClass = "drop-shadow-lg";
      } else if (useWindowScroll().y.value > 80) {
        shadowClass = "drop-shadow-xl";
      }
    } else if (props.sticky && props.scrollOffset) {
      if (props.scrollOffset > 0 && props.scrollOffset < 20) {
        shadowClass = "drop-shadow-sm";
      } else if (props.scrollOffset > 20 && props.scrollOffset < 40) {
        shadowClass = "drop-shadow-md";
      } else if (props.scrollOffset > 40 && props.scrollOffset < 80) {
        shadowClass = "drop-shadow-lg";
      } else if (props.scrollOffset > 80) {
        shadowClass = "drop-shadow-xl";
      }
    }

    classes.push(shadowClass, "transition-all");
  }

  return classes.join(" ");
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
