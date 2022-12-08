<template>
  <div v-if="props.circular" role="status">
    <svg
      aria-hidden="true"
      :class="styleClass"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>

  <div v-else :class="styleClass">
    <div :class="linearStyleClass" :style="linearProgressStyle" />
  </div>
</template>

<script setup>
let defaults = {
  size: {
    width: "w-full",
    height: "h-1",
  },
  circular: {
    width: "w-10",
    height: "h-10",
  },
  color: {
    fill: "fill-cyan-800",
    circle: "text-zinc-800",
    background: "bg-zinc-800",
    firstStrike: "before:bg-cyan-800",
    secondStrike: "after:bg-cyan-600",
    linearProgress: "bg-cyan-800",
    linearProgressHover: "hover:bg-emerald-700",
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
      fill: "fill-cyan-800",
      circle: "text-zinc-800",
      background: "bg-zinc-800",
      firstStrike: "before:bg-cyan-800",
      secondStrike: "after:bg-cyan-600",
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
  initialLoadTimeout: {
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

let loadTimeoutOver = ref(false);

if (props.initialLoadTimeout) {
  setTimeout(() => {
    loadTimeoutOver.value = true;
  }, props.initialLoadTimeout);
}

const styleClass = computed(() => {
  let classes = [];

  if (props.circular) {
    if (props.loading) {
      classes.push("animate-spin");
    }

    //COLOR
    classes.push(props.color.circle || defaults.color.circle);
    classes.push(props.color.fill || defaults.color.fill);

    //SIZE
    classes.push(props.circular.width || defaults.circular.width);
    classes.push(props.circular.height || defaults.circular.height);
  } else {
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
  if (loadTimeoutOver.value || !props.initialLoadTimeout) {
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
