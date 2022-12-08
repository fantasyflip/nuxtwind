<template>
  <div :class="wrapperClass">
    <div v-if="props.prependIcon" :class="prependIconClass">
      <slot name="icon" />
    </div>
    <input
      id="textfield"
      :class="inputClass"
      :type="props.type"
      :placeholder="placeholder"
      :disabled="props.disabled"
      @input="handleInput"
      :value="props.modelValue"
    />
    <label for="textfield" :class="labelClass">
      <slot name="label">{{ props.label }}</slot>
    </label>
    <div
      v-if="
        props.hint && props.hint.length > 0 && !props.disabled && !props.loading
      "
      :class="hintClass"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script setup>
let isValid = ref(true);
let defaults = {
  color: {
    bg: "bg-zinc-900",
    text: "text-white",
    hint: "text-gray-400",
    error: "text-red-500",
    label: "text-white",
    labelFocus: "peer-focus:text-cyan-600",
    placeholderText: "placeholder:text-gray-600",
    icon: "text-white",
    iconFocus: "group-focus-within:text-cyan-600",
    border: "border-white",
    borderFocus: "focus:border-cyan-800",
    borderError: "border-red-500",
    borderFocusError: "focus:border-red-500",
  },
  rounded: "rounded-lg",
  outlined: "border",
  filled: "border-b-2",
  shadow: "shadow-lg",
  transition: {
    duration: "duration-300",
    ease: "ease-in-out",
    placeholder: {
      duration: "placeholder:duration-500",
      ease: "placeholder:ease-in-out",
    },
  },
};

const props = defineProps({
  modelValue: {},
  color: {
    type: Object,
    default: {
      bg: "bg-zinc-900",
      text: "text-white",
      hint: "text-gray-400",
      error: "text-red-500",
      label: "text-white",
      labelFocus: "peer-focus:text-cyan-600",
      placeholderText: "placeholder:text-gray-600",
      icon: "text-white",
      iconFocus: "group-focus-within:text-cyan-600",
      border: "border-white",
      borderFocus: "focus:border-cyan-800",
      borderError: "border-red-500",
      borderFocusError: "focus:border-red-500",
    },
  },
  label: {
    type: String,
    default: "Label",
  },
  prependIcon: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: [Boolean, String],
    default: true,
  },
  outlined: {
    type: [Boolean, String],
    default: false,
  },
  filled: {
    type: [Boolean, String],
    default: false,
  },
  placeholder: {
    type: String,
    default: " ",
  },
  hint: {
    type: String,
    default: undefined,
  },
  shadow: {
    type: [Boolean, String],
    default: true,
  },
  type: {
    type: String,
    default: "text",
  },
  transition: {
    type: [Boolean, Object],
    default: true,
  },
  width: {
    type: String,
    default: "w-full",
  },
  rules: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["update:modelValue", "update:validation"]);

function handleInput(e) {
  //UPDATE MODEL VALUE
  emit("update:modelValue", e.target.value);

  //VALIDATE INPUT AGAINST RULES
  isValid.value = validate(e.target.value);

  //EMIT VALIDATION RESULT
  emit("update:validation", {
    isValid: isValid.value === true ? true : false,
    result: isValid.value,
    value: e.target.value,
    source: {
      name: props.label,
      type: "textfield",
    },
  });
}

function validate(value) {
  if (props.rules.length > 0) {
    let rules = props.rules;
    //go through all rules; return true if all rules are valid; return first error if any rule is invalid
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (rule(value) !== true) {
        return rule(value);
      }
    }
    return true;
  } else {
    return true;
  }
}

const hint = computed(() => {
  if (isValid.value === true) {
    return props.hint;
  } else {
    return isValid.value;
  }
});

const wrapperClass = computed(() => {
  let classes = [];
  classes.push("relative", "group");

  //DEFAULT
  if (!props.outlined && !props.filled) {
    classes.push("z-0");
  }

  //DISABLED
  if (props.disabled) {
    classes.push("opacity-50", "cursor-not-allowed");
  }

  //LOADING
  if (props.loading) {
    classes.push("cursor-progress", "animate-pulse");
  }

  //WIDTH
  classes.push(props.width || defaults.width);

  return classes.join(" ");
});

const inputClass = computed(() => {
  let classes = [];
  // class='block w-full text-sm text-gray-900 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  classes.push(
    "block",
    "w-full",
    "text-sm",
    "appearance-none",
    "focus:outline-none",
    "focus:ring-0",
    "peer",
    "placeholder:opacity-0",
    "focus:placeholder:opacity-100",
    "placeholder:transition-opacity"
  );

  //TRANSITION
  if (props.transition && typeof props.transition === "object") {
    classes.push(
      props.transition.placeholder.duration ||
        defaults.transition.placeholder.duration
    );
    classes.push(
      props.transition.placeholder.ease || defaults.transition.placeholder.ease
    );
  } else if (props.transition) {
    classes.push(defaults.transition.placeholder.duration);
    classes.push(defaults.transition.placeholder.ease);
  }

  //BASIC APPEARANCE

  if (props.filled) {
    //FILLED
    classes.push("rounded-t-lg", "pb-2.5", "px-2.5", "pt-5", "border-0");

    if (typeof props.filled === "string") {
      classes.push(props.filled);
    } else {
      classes.push(defaults.filled);
    }

    //COLOR
    classes.push(props.color.bg || defaults.color.bg);

    //ICON
    if (props.prependIcon) {
      classes.push("pl-8 pr-2.5");
    } else {
      classes.push("px-2.5");
    }
  } else if (props.outlined) {
    //OUTLINED
    classes.push("py-4", "bg-transparent");
    if (typeof props.outlined === "string") {
      classes.push(props.outlined);
    } else {
      classes.push(defaults.outlined);
    }

    //ROUNDED
    if (props.rounded) {
      if (typeof props.rounded === "string") {
        classes.push(props.rounded);
      } else {
        classes.push(defaults.rounded);
      }
    }

    //ICON
    if (props.prependIcon) {
      classes.push("pl-8 pr-2.5");
    } else {
      classes.push("px-2.5");
    }
  } else {
    //DEFAULT
    classes.push("py-2.5", "bg-transparent", "border-0", "border-b-2");

    //ICON
    if (props.prependIcon) {
      classes.push("pl-8 pr-0");
    } else {
      classes.push("px-0");
    }
  }

  //COLOR
  if (isValid.value === true) {
    classes.push(props.color.border || defaults.color.border);
    classes.push(props.color.borderFocus || defaults.color.borderFocus);
  } else {
    classes.push(props.color.borderError || defaults.color.borderError);
    classes.push(
      props.color.borderFocusError || defaults.color.borderFocusError
    );
  }

  classes.push(props.color.text || defaults.color.text);
  classes.push(props.color.placeholderText || defaults.color.placeholderText);

  //DISABLED
  if (props.disabled) {
    classes.push("cursor-not-allowed");
  }

  //LOADING
  if (props.loading) {
    classes.push("cursor-progress");
  }

  //SHADOW
  if (props.shadow) {
    if (typeof props.shadow === "string") {
      classes.push(props.shadow);
    } else {
      classes.push(defaults.shadow);
    }
  }

  return classes.join(" ");
});

const labelClass = computed(() => {
  let classes = [];
  classes.push(
    "absolute",
    "text-sm",
    "transform",
    "scale-75",
    "origin-[0]",
    "peer-placeholder-shown:scale-100",
    "peer-focus:scale-75"
  );

  //TRANSITION
  if (props.transition && typeof props.transition === "object") {
    classes.push(props.transition.duration || defaults.transition.duration);
    classes.push(props.transition.ease || defaults.transition.ease);
  } else if (props.transition) {
    classes.push(defaults.transition.duration);
    classes.push(defaults.transition.ease);
  }

  //BASIC APPEARANCE
  if (props.filled) {
    //FILLED
    classes.push(
      "-translate-y-4",
      "top-4",
      "peer-focus:top-4",
      "z-10",
      "left-2.5",
      "peer-placeholder-shown:translate-y-0",
      "peer-focus:-translate-y-4"
    );

    //ICON
    if (props.prependIcon) {
      classes.push(
        "peer-focus:translate-x-0",
        "peer-placeholder-shown:translate-x-6",
        "peer-placeholder-shown:top-5"
      );
    }
  } else if (props.outlined) {
    //OUTLINED
    classes.push(
      "-translate-y-4",
      "top-2",
      "z-10",
      "px-2",
      "peer-focus:px-2",
      "peer-placeholder-shown:-translate-y-1/2",
      "peer-placeholder-shown:top-1/2",
      "peer-focus:top-2",
      "peer-focus:-translate-y-4",
      "left-1"
    );

    //COLOR
    classes.push(props.color.bg || defaults.color.bg);

    //ICON
    if (props.prependIcon) {
      classes.push(
        "peer-focus:translate-x-0",
        "peer-placeholder-shown:translate-x-6"
      );
    }
  } else {
    //DEFAULT
    classes.push(
      "-translate-y-6",
      "top-3",
      "-z-10",
      "peer-focus:left-0",
      "peer-placeholder-shown:translate-y-0",
      "peer-focus:-translate-y-6"
    );

    //ICON
    if (props.prependIcon) {
      classes.push(
        "peer-focus:translate-x-0",
        "peer-placeholder-shown:translate-x-8"
      );
    }
  }

  //COLOR
  classes.push(props.color.label || defaults.color.label);
  if (isValid.value === true) {
    classes.push(props.color.labelFocus || defaults.color.labelFocus);
  } else {
    classes.push(props.color.error || defaults.color.error);
  }

  //DISABLED
  if (props.disabled) {
    classes.push("cursor-not-allowed");
  } else if (props.loading) {
    classes.push("cursor-progress");
  } else {
    classes.push("cursor-text", "peer-focus:cursor-default");
  }

  return classes.join(" ");
});

const prependIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-cyan-800 transition-all ease-in-out duration-500"

  let classes = [];
  classes.push(
    "absolute",
    "inset-y-0",
    "left-0",
    "flex",
    "items-center",
    "pl-2",
    "transition-all"
  );

  //TRANSITION
  if (props.transition && typeof props.transition === "object") {
    classes.push(props.transition.duration || defaults.transition.duration);
    classes.push(props.transition.ease || defaults.transition.ease);
  } else if (props.transition) {
    classes.push(defaults.transition.duration);
    classes.push(defaults.transition.ease);
  }

  if (props.filled) {
    classes.push("top-2");
  }

  classes.push(props.color.icon || defaults.color.icon);
  if (isValid.value === true) {
    classes.push(props.color.iconFocus || defaults.color.iconFocus);
  } else {
    classes.push(props.color.error || defaults.color.error);
  }

  //LOADING
  if (props.loading) {
    classes.push("animate-pulse");
  }

  return classes.join(" ");
});

const hintClass = computed(() => {
  // class="absolute transition-all ease-in-out duration-500 text-xs font-light pl-2 group-focus-within:opacity-100 -translate-y-2 group-focus-within:-translate-y-0 opacity-0"

  let classes = [
    "absolute",
    "text-xs",
    "font-light",
    "pl-2",
    "group-focus-within:opacity-100",
    "opacity-0",
    "transition-all",
    "-translate-y-2",
    "group-focus-within:-translate-y-0",
  ];

  classes.push(props.transition.duration || defaults.transition.duration);
  classes.push(props.transition.ease || defaults.transition.ease);
  if (isValid.value === true) {
    classes.push(props.color.hint || defaults.color.hint);
  } else {
    classes.push(props.color.error || defaults.color.error);
  }

  return classes.join(" ");
});
</script>
