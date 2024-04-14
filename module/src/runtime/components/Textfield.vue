<template>
  <div :class="wrapperClass">
    <div v-if="props.prependIcon" :class="prependIconClass">
      <slot name="prepend-icon">
        <component
          :is="props.prependIcon"
          v-if="typeof props.prependIcon === 'object'"
        />
      </slot>
    </div>

    <div
      :class="clearableIconClass"
      v-if="props.clearable && !props.disabled && !props.loading"
    >
      <input
        class="cursor-pointer"
        type="button"
        @click="handleReset"
        value="X"
      />
    </div>
    <div v-if="props.appendIcon" :class="appendIconClass">
      <slot name="append-icon">
        <component
          :is="props.appendIcon"
          v-if="typeof props.appendIcon === 'object'"
        />
      </slot>
    </div>
    <input
      ref="textfield"
      :id="textfieldId"
      :class="inputClass"
      :type="props.type"
      :placeholder="placeholder"
      :disabled="props.disabled"
      :value="props.modelValue"
      :autocomplete="autocomplete"
      @input="handleInput"
      @focusin="$emit('focusIn', $event)"
      @focusout="$emit('focusOut', $event)"
    />
    <label
      :for="textfieldId"
      :class="labelClass"
      @click="textfield.value.focus()"
    >
      <slot name="label">{{ props.label }}</slot>
    </label>
    <div
      v-if="
        ((props.hint && props.hint.length > 0) ||
          typeof isValid === 'string') &&
        !props.disabled &&
        !props.loading
      "
      :class="hintClass"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: string | number;
  color?: {
    bg?: string;
    text?: string;
    hint?: string;
    error?: string;
    label?: string;
    labelFocus?: string;
    placeholderText?: string;
    icon?: string;
    iconFocus?: string;
    border?: string;
    borderFocus?: string;
    borderError?: string;
    borderFocusError?: string;
  };
  label?: string;
  autocomplete?: string;
  prependIcon?: boolean | object;
  appendIcon?: boolean | object;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  rounded?: boolean | string;
  outlined?: boolean | string;
  filled?: boolean | string;
  placeholder?: string;
  hint?: string;
  shadow?: boolean | string;
  type?: string;
  transition?:
    | boolean
    | {
        duration?: string;
        ease?: string;
        placeholder?: {
          duration?: string;
          ease?: string;
        };
      };
  width?: string;
  rules?: { (data: any): boolean | string }[];
}
import { computed, ref, onMounted } from "vue";

let textfieldId = useId();

function handleLabelClick() {
  console.log("label clicked");

  // @ts-expect-error - TS doesn't know about ref
  textfield.value.focus();
}

let isValid = ref<boolean | string>(true);
let defaults = {
  color: {
    bg: "bg-gray-200 dark:bg-zinc-800",
    text: "text-black dark:text-white",
    hint: "text-gray-600 dark:text-gray-400",
    error: "text-red-500 dark:text-red-500",
    label: "text-black dark:text-white",
    labelFocus: "peer-focus:text-primary-600",
    placeholderText: "placeholder:text-gray-400 dark:placeholder:text-gray-600",
    icon: "text-black dark:text-white",
    iconFocus: "group-focus-within:text-primary-600",
    border: "border-black dark:border-white",
    borderFocus: "focus:border-primary-800 dark:focus:border-primary-800",
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

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  color: () => {
    return {
      bg: "bg-gray-200 dark:bg-zinc-800",
      text: "text-black dark:text-white",
      hint: "text-gray-600 dark:text-gray-400",
      error: "text-red-500 dark:text-red-500",
      label: "text-black dark:text-white",
      labelFocus: "peer-focus:text-primary-600",
      placeholderText:
        "placeholder:text-gray-400 dark:placeholder:text-gray-600",
      icon: "text-black dark:text-white",
      iconFocus: "group-focus-within:text-primary-600",
      border: "border-black dark:border-white",
      borderFocus: "focus:border-primary-800 dark:focus:border-primary-800",
      borderError: "border-red-500",
      borderFocusError: "focus:border-red-500",
    };
  },
  label: "Label",
  autocomplete: "on",
  prependIcon: false,
  appendIcon: false,
  clearable: false,
  disabled: false,
  loading: false,
  rounded: true,
  outlined: false,
  filled: false,
  placeholder: " ",
  hint: "",
  shadow: true,
  type: "text",
  transition: true,
  width: "w-full",
  rules: () => [],
});

const emit = defineEmits<{
  (e: "update:modelValue", id: string): void;
  (e: "update:validation", id: object): void;
  (e: "focusIn", event: FocusEvent): void;
  (e: "focusOut", event: FocusEvent): void;
  (e: "reset"): void;
}>();

const textfield = ref(null);

defineExpose({
  textfield,
});

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

let initialModelValue = ref();
onMounted(() => {
  initialModelValue.value = props.modelValue;
});

function handleReset() {
  isValid.value = true;
  // @ts-expect-error - TS doesn't know about ref
  textfield.value.focus();

  emit("update:modelValue", initialModelValue.value);
  emit("reset");
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
  let classes: string[] = [];
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
  classes.push(props.width);

  return classes.join(" ");
});

const inputClass = computed(() => {
  let classes: string[] = [];
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
    "placeholder:transition-opacity",
  );

  //TRANSITION
  if (props.transition && typeof props.transition === "object") {
    classes.push(
      props.transition.placeholder?.duration ||
        defaults.transition.placeholder.duration,
    );
    classes.push(
      props.transition.placeholder?.ease ||
        defaults.transition.placeholder.ease,
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
    if (props.appendIcon && props.clearable) {
      classes.push("pr-12");
    } else if (props.appendIcon || props.clearable) {
      classes.push("pr-8");
    } else {
      classes.push("pr-2.5");
    }
    if (props.prependIcon) {
      classes.push("pl-8");
    } else {
      classes.push("pl-2.5");
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
    if (props.appendIcon && props.clearable) {
      classes.push("pr-12");
    } else if (props.appendIcon || props.clearable) {
      classes.push("pr-8");
    } else {
      classes.push("pr-2.5");
    }
    if (props.prependIcon) {
      classes.push("pl-8");
    } else {
      classes.push("pl-2.5");
    }
  } else {
    //DEFAULT
    classes.push("py-2.5", "bg-transparent", "border-0", "border-b-2");

    //ICON
    if (props.appendIcon && props.clearable) {
      classes.push("pr-12");
    } else if (props.appendIcon || props.clearable) {
      classes.push("pr-8");
    } else {
      classes.push("pr-0");
    }
    if (props.prependIcon) {
      classes.push("pl-8");
    } else {
      classes.push("pl-0");
    }
  }

  //COLOR
  if (isValid.value === true) {
    classes.push(props.color.border || defaults.color.border);
    classes.push(props.color.borderFocus || defaults.color.borderFocus);
  } else {
    classes.push(props.color.borderError || defaults.color.borderError);
    classes.push(
      props.color.borderFocusError || defaults.color.borderFocusError,
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
  let classes: string[] = [];
  classes.push(
    "absolute",
    "text-sm",
    "transform",
    "scale-75",
    "origin-[0]",
    "peer-placeholder-shown:scale-100",
    "peer-focus:scale-75",
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
      "peer-focus:-translate-y-4",
    );

    //ICON
    if (props.prependIcon) {
      classes.push(
        "peer-focus:translate-x-0",
        "peer-placeholder-shown:translate-x-6",
        "peer-placeholder-shown:top-5",
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
      "left-1",
    );

    //COLOR
    classes.push(props.color.bg || defaults.color.bg);

    //ICON
    if (props.prependIcon) {
      classes.push(
        "peer-focus:translate-x-0",
        "peer-placeholder-shown:translate-x-6",
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
      "peer-focus:-translate-y-6",
    );

    //ICON
    if (props.prependIcon) {
      classes.push(
        "peer-focus:translate-x-0",
        "peer-placeholder-shown:translate-x-8",
      );
    }
  }

  //COLOR

  if (isValid.value === true) {
    classes.push(props.color.label || defaults.color.label);
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
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  let classes: string[] = [];
  classes.push(
    "absolute",
    "inset-y-0",
    "left-0",
    "flex",
    "items-center",
    "pl-2",
    "transition-all",
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

  if (isValid.value === true) {
    classes.push(props.color.icon || defaults.color.icon);
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

const appendIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  let classes: string[] = [];
  classes.push(
    "absolute",
    "inset-y-0",
    "right-0",
    "flex",
    "items-center",
    "pr-2",
    "transition-all",
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

  if (isValid.value === true) {
    classes.push(props.color.icon || defaults.color.icon);
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

const clearableIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  let classes: string[] = [];
  classes.push(
    "absolute",
    "inset-y-0",

    "flex",
    "items-center",
    "transition-all",
  );

  //APPEND-ICON
  if (props.appendIcon) {
    classes.push("right-8");
  } else {
    classes.push("right-3");
  }

  //OPACITY
  if (props.modelValue.length > 0 || isValid.value !== true) {
    classes.push("opacity-100");
  } else {
    classes.push("opacity-0");
  }

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

  if (isValid.value === true) {
    classes.push(props.color.icon || defaults.color.icon);
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

  if (props.transition && typeof props.transition === "object") {
    classes.push(props.transition.duration || defaults.transition.duration);
    classes.push(props.transition.ease || defaults.transition.ease);
  } else if (props.transition) {
    classes.push(defaults.transition.duration);
    classes.push(defaults.transition.ease);
  }

  if (isValid.value === true) {
    classes.push(props.color.hint || defaults.color.hint);
  } else {
    classes.push(props.color.error || defaults.color.error);
  }

  return classes.join(" ");
});
</script>
