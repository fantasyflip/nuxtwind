<template>
  <div
    id="circular-progress"
    v-if="props.circular"
    class="conic-gradient"
    :class="circularStyleClass"
  >
    <div v-if="!props.loading" class="relative w-full h-full">
      <slot name="inner-circle">
        <div
          class="h-full w-full grid place-items-center"
          :class="props.circular.cutout?.text || defaults.circular.cutout.text"
        >
          {{ progressValue }}%
        </div>
      </slot>
    </div>
  </div>
  <div v-else :class="linearWrapperStyleClass">
    <div :class="linearStyleClass" :style="linearProgressStyle" />
  </div>
</template>

<script setup>
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

const tw = resolveConfig(tailwindConfig);

const colorMode = useColorMode();
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
  },
  size: {
    type: Object,
    default: {
      width: "w-full",
      height: "h-1",
    },
  },
  color: {
    type: Object,
    default: {
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

let progressValue = ref(0);
let endValue = ref(0);

if (props.modelValue === undefined && props.loading) {
  endValue.value = 30;
} else if (props.modelValue > 100) {
  endValue.value = 100;
} else if (props.modelValue < 0) {
  endValue.value = 0;
} else if (props.modelValue === undefined) {
  endValue.value = 0;
} else {
  endValue.value = props.modelValue;
}

if (props.initialLoadTime && endValue.value > 0) {
  let speed = props.initialLoadTime / endValue.value;

  let progress = setInterval(() => {
    progressValue.value++;
    if (progressValue.value == endValue.value) {
      clearInterval(progress);
    }
  }, speed);
} else {
  progressValue.value = endValue.value;
}

const gradientProgress = computed(() => {
  return progressValue.value * 3.6 + "deg";
});

const circularColorCss = computed(() => {
  if (colorMode.value == "dark") {
    let color = props.color.circleDark || defaults.color.circleDark;
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  } else {
    let color = props.color.circle || defaults.color.circle;
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  }
});

const circularColorProgressCss = computed(() => {
  if (colorMode.value == "dark") {
    let color =
      props.color.circleProgressDark || defaults.color.circleProgressDark;
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
  } else {
    let color = props.color.circleProgress || defaults.color.circleProgress;
    let colorSegments = color.split("-");
    return tw.theme.colors[colorSegments[0]][colorSegments[1]];
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
    classes.push("transition-all");
    classes.push(props.transition.duration || defaults.transition.duration);
    classes.push(props.transition.ease || defaults.transition.ease);
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
