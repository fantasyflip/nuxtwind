<template>
  <div
    :id="'currentItem-' + props.modelValue"
    :class="wrapperStyleClass"
    @mouseenter="disableAutoPlay"
    @mouseleave="enableAutoPlay"
  >
    <slot />
    <div v-if="!props.hideNavigation">
      <div :class="rightNavigationWrapperStyleClass">
        <Button
          icon
          class="group/button"
          :color="{
            iconHover: 'hover:text-white',
          }"
          @click="nextItem"
        >
          <div class="relative w-8 h-8 grid place-items-center">
            <MdiChevronRight class="text-xl z-10" />
            <div :class="backgroundNavigationStyleClass"></div>
          </div>
        </Button>
      </div>
      <div :class="leftNavigationWrapperStyleClass">
        <Button
          icon
          class="group/button"
          :color="{
            iconHover: 'hover:text-white',
          }"
          @click="prevItem"
        >
          <div class="relative w-8 h-8 grid place-items-center">
            <MdiChevronLeft class="text-xl z-10" />
            <div :class="backgroundNavigationStyleClass"></div>
          </div>
        </Button>
      </div>
    </div>

    <div v-if="!props.hidePagination" :class="paginationWrapperStyleClass">
      <div v-for="(item, index) in itemCount" :key="index">
        <Button icon @click="$emit('update:modelValue', index + 1)">
          <MdiCheckboxBlankCircle v-if="props.modelValue === index + 1" />
          <MdiCheckboxBlankCircleOutline v-else />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MdiChevronRight from "~icons/mdi/chevron-right";
import MdiChevronLeft from "~icons/mdi/chevron-left";
import MdiCheckboxBlankCircleOutline from "~icons/mdi/checkbox-blank-circle-outline";
import MdiCheckboxBlankCircle from "~icons/mdi/checkbox-blank-circle";

let defaults = {
  shadow: "shadow-xl",
  transition: {
    duration: "duration-300",
    delay: "delay-300",
    ease: "ease-in-out",
  },
};

let props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
    required: true,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  timeout: {
    type: Number,
    default: 5000,
  },
  disableAutoPlayOnHover: {
    type: Boolean,
    default: true,
  },
  hideNavigation: {
    type: Boolean,
    default: false,
  },
  hidePagination: {
    type: Boolean,
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
});
let emit = defineEmits(["update:modelValue"]);

let itemCount = ref(0);

onMounted(() => {
  itemCount.value = document.querySelectorAll(".ci").length;
});

// next item
const nextItem = () => {
  if (props.modelValue === itemCount.value) {
    emit("update:modelValue", 1);
    return;
  }
  emit("update:modelValue", props.modelValue + 1);
};

// prev item
const prevItem = () => {
  if (props.modelValue != 1) {
    emit("update:modelValue", props.modelValue - 1);
  } else {
    emit("update:modelValue", itemCount.value);
  }
};

let interval = null;
function enableAutoPlay() {
  if (props.disableAutoPlayOnHover && props.autoPlay) {
    interval = setInterval(() => {
      nextItem();
    }, props.timeout);
  }
}
function disableAutoPlay() {
  if (props.disableAutoPlayOnHover && props.autoPlay) {
    clearInterval(interval);
  }
}
if (props.autoPlay) {
  if (props.disableAutoPlayOnHover) {
    enableAutoPlay();
  } else {
    interval = setInterval(() => {
      nextItem();
    }, props.timeout);
  }
}

const wrapperStyleClass = computed(() => {
  let classes = [];
  classes.push(
    "carousel",
    "relative",
    "w-full",
    "h-full",
    "group/carousel",
    "overflow-hidden"
  );

  if (props.shadow) {
    if (typeof props.shadow === "string") {
      classes.push(props.shadow);
    } else {
      classes.push(defaults.shadow);
    }
  }

  return classes.join(" ");
});

const rightNavigationWrapperStyleClass = computed(() => {
  let classes = [];
  classes.push(
    "absolute",
    "right-1",
    "top-1/2",
    "transform",
    "-translate-y-1/2",
    "translate-x-10",
    "group-hover/carousel:translate-x-0"
  );

  if (props.transition) {
    classes.push("transition-all");
    classes.push(props.transition?.duration || defaults.transition.duration);
    classes.push(props.transition?.delay || defaults.transition.delay);
    classes.push(props.transition?.ease || defaults.transition.ease);
  }

  return classes.join(" ");
});

const leftNavigationWrapperStyleClass = computed(() => {
  let classes = [];
  classes.push(
    "absolute",
    "left-1",
    "top-1/2",
    "transform",
    "-translate-y-1/2",
    "-translate-x-10",
    "group-hover/carousel:translate-x-0"
  );

  if (props.transition) {
    classes.push("transition-all");
    classes.push(props.transition?.duration || defaults.transition.duration);
    classes.push(props.transition?.delay || defaults.transition.delay);
    classes.push(props.transition?.ease || defaults.transition.ease);
  }

  return classes.join(" ");
});

const backgroundNavigationStyleClass = computed(() => {
  let classes = [];
  classes.push(
    "w-8",
    "h-8",
    "bg-white",
    "rounded-2xl",
    "absolute",
    "top-0",
    "left-0",
    "group-hover/button:opacity-20",
    "opacity-0",
    "transition-opacity"
  );

  if (props.transition) {
    classes.push("transition-opacity");
    classes.push(props.transition?.duration || defaults.transition.duration);
  }

  return classes.join(" ");
});

const paginationWrapperStyleClass = computed(() => {
  let classes = [];
  classes.push(
    "absolute",
    "bottom-3",
    "flex",
    "text-xs",
    "w-full",
    "justify-center",
    "transform",
    "translate-y-10",
    "group-hover/carousel:translate-y-0"
  );

  if (props.transition) {
    classes.push("transition-all");
    classes.push(props.transition?.duration || defaults.transition.duration);
    classes.push(props.transition?.delay || defaults.transition.delay);
    classes.push(props.transition?.ease || defaults.transition.ease);
  }

  return classes.join(" ");
});
</script>

<style scoped></style>
