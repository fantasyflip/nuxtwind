<template>
  <div
    v-if="props.circular"
    id="circular-progress"
    class="conic-gradient"
    :class="circularStyleClass"
  >
    <div v-if="!props.loading" class="relative w-full h-full">
      <slot name="inner-circle">
        <div
          class="h-full w-full grid place-items-center"
          :class="props.circular.cutout?.text || defaults.circular.cutout.text"
        >
          {{ textProgress }}%
        </div>
      </slot>
    </div>
  </div>
  <div v-else :class="linearWrapperStyleClass">
    <div :class="linearStyleClass" :style="linearProgressStyle" />
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";

const tw = resolveConfig(tailwindConfig);

let colorMode = ref("dark");
let htmlElement = ref(null);
let observer = null;

function getColorMode() {
  // get class of html element
  let htmlClass = document.querySelector("html").classList;
  // check if dark mode is enabled
  if (htmlClass.contains("dark")) {
    return "dark";
  } else {
    return "light";
  }
}

onMounted(() => {
  colorMode.value = getColorMode();

  htmlElement.value = document.querySelector("html");

  observer = new MutationObserver(() => {
    colorMode.value = getColorMode();
  });

  observer.observe(htmlElement.value, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});

let defaults = {
  size: {
    width: "w-full",
    height: "h-1",
  },
  circular: {
    width: "w-10",
    height: "h-10",
    cutout: {
      width: "before:w-[84%]",
      height: "before:h-[84%]",
      text: "text-[70%]",
    },
  },
  color: {
    circle: "gray-200",
    circleDark: "zinc-800",
    circleProgress: "primary-800",
    circleProgressDark: "primary-800",
    circleCutout: "before:bg-white dark:before:bg-zinc-900",
    background: "bg-gray-200 dark:bg-zinc-800",
    firstStrike: "before:bg-primary-800",
    secondStrike: "after:bg-primary-600",
    linearProgress: "bg-primary-800",
    linearProgressHover: "hover:bg-secondary-800",
  },
  loading: false,
  transition: {
    duration: "duration-500",
    ease: "ease-in-out",
  },
  rounded: "rounded-lg",
};

const props = defineProps({
  modelValue: {
    type: Number,
    String,
    default: null,
  },
  size: {
    type: Object,
    default() {
      return {
        width: "w-full",
        height: "h-1",
      };
    },
  },
  color: {
    type: Object,
    default() {
      return {
        circle: "gray-200",
        circleDark: "zinc-800",
        circleProgress: "primary-800",
        circleProgressDark: "primary-800",
        circleCutout: "before:bg-white dark:before:bg-zinc-900",
        background: "bg-gray-200 dark:bg-zinc-800",
        firstStrike: "before:bg-primary-800",
        secondStrike: "after:bg-primary-600",
        linearProgress: "bg-primary-800",
        linearProgressHover: "hover:bg-secondary-800",
      };
    },
  },
  circular: {
    type: [Boolean, Object],
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  initialLoadTime: {
    type: [Number, Boolean],
    default: 100,
  },
  initialLoadTimeType: {
    type: String,
    default: "calc",
    validator(value) {
      return ["calc", "static"].includes(value);
    },
  },
  transition: {
    type: [Boolean, Object],
    default: true,
  },
  rounded: {
    type: [Boolean, String],
    default: true,
  },
});

let initialLoadTime = ref(false);

if (props.initialLoadTime) {
  setTimeout(() => {
    initialLoadTime.value = true;
  }, props.initialLoadTime);
}

let modelValueComputed = computed(() => {
  return props.modelValue;
});

let lastInputValue = 0;

let gradientProgress = ref(lastInputValue);

let textProgress = ref(lastInputValue);

watch(
  modelValueComputed,
  (newValue) => {
    gradientProgress.value = getCircularProgress(newValue);
  },
  { immediate: true }
);

function getCircularProgress(inputValue) {
  let endValue = 0;
  if (inputValue === null && props.loading) {
    endValue = 30;
  } else if (inputValue > 100) {
    endValue = 100;
  } else if (inputValue < 0) {
    endValue = 0;
  } else if (inputValue === undefined) {
    endValue = 0;
  } else {
    endValue = inputValue;
  }

  let progressValue = ref(lastInputValue);
  let speed = 0;
  if (props.initialLoadTime) {
    if (props.initialLoadTimeType === "static") {
      speed = props.initialLoadTime;
    } else {
      speed = props.initialLoadTime / endValue;
    }
  }

  if (lastInputValue < endValue) {
    //increase
    if (speed > 0) {
      let progressInterval = setInterval(() => {
        if (progressValue.value < endValue && inputValue === props.modelValue) {
          progressValue.value++;
          gradientProgress.value = progressValue.value * 3.6 + "deg";
          textProgress.value = progressValue.value;
          lastInputValue = progressValue.value;
        } else {
          clearInterval(progressInterval);
        }
      }, speed);
    } else {
      progressValue.value = endValue;
      gradientProgress.value = progressValue.value * 3.6 + "deg";
      textProgress.value = progressValue.value;
    }
  } else {
    //decresing
    if (speed > 0) {
      let progressInterval = setInterval(() => {
        if (progressValue.value > endValue && inputValue === props.modelValue) {
          progressValue.value--;
          gradientProgress.value = progressValue.value * 3.6 + "deg";
          textProgress.value = progressValue.value;
          lastInputValue = progressValue.value;
        } else {
          clearInterval(progressInterval);
        }
      }, speed);
    } else {
      progressValue.value = endValue;
      gradientProgress.value = progressValue.value * 3.6 + "deg";
      textProgress.value = progressValue.value;
    }
  }
}

const circularColorCss = computed(() => {
  let color = props.color.circle || defaults.color.circle;
  if (colorMode.value == "dark") {
    color = props.color.circleDark || defaults.color.circleDark;
  }
  if (color.includes("-")) {
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  } else {
    return tw.theme.colors[color];
  }
});

const circularColorProgressCss = computed(() => {
  let color = props.color.circleProgress || defaults.color.circleProgress;
  if (colorMode.value == "dark") {
    color = props.color.circleProgressDark || defaults.color.circleProgressDark;
  }
  if (color.includes("-")) {
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  } else {
    return tw.theme.colors[color];
  }
});

const circularStyleClass = computed(() => {
  let classes = [];
  // class="relative w-[250px] h-[250px] rounded-[50%] grid place-items-center before:content-[''] before:absolute before:h-[84%] before:w-[84%] before:bg-zinc-900 before:rounded-[50%]"
  classes.push(
    "relative",
    "rounded-[50%]",
    "grid",
    "place-items-center",
    "before:content-['']",
    "before:absolute",
    "before:rounded-[50%]"
  );

  //SIZE
  classes.push(props.circular.width || defaults.circular.width);
  classes.push(props.circular.height || defaults.circular.height);
  classes.push(props.circular.cutout?.width || defaults.circular.cutout.width);
  classes.push(
    props.circular.cutout?.height || defaults.circular.cutout.height
  );

  //COLOR
  classes.push(props.color.circleCutout || defaults.color.circleCutout);

  //LOADING
  if (props.loading) {
    classes.push("animate-spin");
  }

  return classes.join(" ");
});

const linearWrapperStyleClass = computed(() => {
  let classes = [];

  //COLOR
  classes.push("overflow-hidden");
  classes.push(props.color.background || defaults.color.background);

  //SIZE
  classes.push(props.size.width || defaults.size.width);
  classes.push(props.size.height || defaults.size.height);

  //ROUNDED
  if (props.rounded) {
    if (typeof props.rounded === "string") {
      classes.push(props.rounded);
    } else {
      classes.push(defaults.rounded);
    }
  }

  return classes.join(" ");
});

const linearStyleClass = computed(() => {
  let classes = [];

  classes.push("relative", "w-full", "h-full");

  if (props.loading) {
    // class="relative w-full h-full before:content-[''] before:absolute before:h-full before:bg-red-600 before:animate-indeterminatebefore after:content-[''] after:absolute after:h-full after:bg-red-600 after:animate-indeterminateafter"
    classes.push(
      "before:content-[''] before:absolute before:h-full before:animate-indeterminatebefore after:content-[''] after:absolute after:h-full after:animate-indeterminateafter"
    );

    //COLOR
    classes.push(props.color.secondStrike || defaults.color.secondStrike);
    classes.push(props.color.firstStrike || defaults.color.firstStrike);
  } else {
    //COLOR
    classes.push(props.color.linearProgress || defaults.color.linearProgress);
    classes.push(
      props.color.linearProgressHover || defaults.color.linearProgressHover
    );
    if (props.transition) {
      classes.push("transition-all");
      classes.push(props.transition.duration || defaults.transition.duration);
      classes.push(props.transition.ease || defaults.transition.ease);
    }
  }

  //ROUNDED
  if (props.rounded) {
    if (typeof props.rounded === "string") {
      classes.push(props.rounded);
    } else {
      classes.push(defaults.rounded);
    }
  }

  return classes.join(" ");
});

const linearProgressStyle = computed(() => {
  if (initialLoadTime.value || !props.initialLoadTime) {
    let percent = 0;

    let input = null;
    if (typeof props.modelValue === "number") {
      input = props.modelValue;
    } else if (typeof props.modelValue === "string") {
      input = parseInt(props.modelValue);
    }

    if (input > 100) {
      percent = 100;
    } else if (input < 0) {
      percent = 0;
    } else {
      percent = input;
    }

    return `width: ${percent}%`;
  } else {
    return `width: 0%`;
  }
});
</script>

<style scoped>
.conic-gradient {
  background: conic-gradient(
    v-bind(circularColorProgressCss) v-bind(gradientProgress),
    v-bind(circularColorCss) v-bind(gradientProgress)
  );
}
</style>
