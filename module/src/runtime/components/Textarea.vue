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
    <div v-if="props.appendIcon" :class="appendIconClass">
      <slot name="append-icon">
        <component
          :is="props.appendIcon"
          v-if="typeof props.appendIcon === 'object'"
        />
      </slot>
    </div>
    <div :class="textareaWrapperClass">
      <textarea
        :id="textareaId"
        :class="inputClass"
        :placeholder="placeholder"
        :disabled="props.disabled"
        :value="props.modelValue"
        :autocomplete="autocomplete"
        @input="handleInput"
        @focusin="$emit('focusIn')"
        @focusout="$emit('focusOut')"
      />
      <label :for="textareaId" :class="labelClass">
        <slot name="label">{{ props.label }}</slot>
      </label>
      <div
        v-if="props.counter"
        :for="textareaId"
        class="transition peer-focus:opacity-100 opacity-0 peer-focus:translate-y-0 -translate-y-3 absolute top-0 w-full flex justify-end"
      >
        <div
          class="pr-3 pt-1 text-xs"
          :class="props.color?.hint || defaults.color.hint"
        >
          {{ props.modelValue.length }}
        </div>
      </div>
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
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: string;
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
  disabled?: boolean;
  loading?: boolean;
  rounded?: boolean | string;
  outlined?: boolean | string;
  filled?: boolean | string;
  placeholder?: string;
  hint?: string;
  shadow?: boolean | string;
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
  counter?: boolean;
  height?: string;
  width?: string;
  rules?: { (data: any): boolean | string }[];
}
import { computed, ref } from "vue";
function generateId() {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
let textareaId = generateId();

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
    borderFocus:
      "focus:border-primary-800 dark:focus:border-primary-800 focus-within:border-primary-800 dark:focus-within:border-primary-800",
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
  height: "min-h-[40px]",
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
      borderFocus:
        "focus:border-primary-800 dark:focus:border-primary-800 focus-within:border-primary-800 dark:focus-within:border-primary-800",
      borderError: "border-red-500",
      borderFocusError: "focus:border-red-500",
    };
  },
  label: "Label",
  autocomplete: "on",
  prependIcon: false,
  appendIcon: false,
  disabled: false,
  loading: false,
  rounded: true,
  outlined: false,
  filled: false,
  placeholder: " ",
  hint: undefined,
  shadow: true,
  transition: true,
  counter: false,
  height: "min-h-[40px]",
  width: "w-full",
  rules: () => [],
});

const emit = defineEmits<{
  (e: "update:modelValue", id: string): void;
  (e: "update:validation", id: object): void;
  (e: "focusIn"): void;
  (e: "focusOut"): void;
}>();

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
      type: "textarea",
    },
  });
}

function validate(value): boolean | string {
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

const textareaWrapperClass = computed(() => {
  let classes: string[] = [];
  classes.push(
    "block",
    "w-full",
    "text-sm",
    "appearance-none",
    "peer-focus:outline-none",
    "peer-focus:ring-0",
    "placeholder:opacity-0",
    "peer-focus:placeholder:opacity-100",
    "placeholder:transition-opacity"
  );
  classes.push("pt-4");

  if (props.filled) {
    classes.push("rounded-t-lg");

    //COLOR
    classes.push(props.color.bg || defaults.color.bg);
  } else if (props.outlined) {
    classes.push("bg-transparent");

    //OUTLINED
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
  } else {
  }

  // COLOR
  if (isValid.value === true) {
    classes.push(props.color.border || defaults.color.border);
    classes.push(props.color.borderFocus || defaults.color.borderFocus);
  } else {
    classes.push(props.color.borderError || defaults.color.borderError);
    classes.push(
      props.color.borderFocusError || defaults.color.borderFocusError
    );
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
    "placeholder:transition-opacity"
  );

  //TRANSITION
  if (props.transition && typeof props.transition === "object") {
    classes.push(
      props.transition.placeholder?.duration ||
        defaults.transition.placeholder.duration
    );
    classes.push(
      props.transition.placeholder?.ease || defaults.transition.placeholder.ease
    );
  } else if (props.transition) {
    classes.push(defaults.transition.placeholder.duration);
    classes.push(defaults.transition.placeholder.ease);
  }

  //BASIC APPEARANCE

  if (props.filled) {
    //FILLED
    classes.push("pb-2.5", "px-2.5", "pt-2", "border-0");

    if (typeof props.filled === "string") {
      classes.push(props.filled);
    } else {
      classes.push(defaults.filled);
    }

    //COLOR
    classes.push(props.color.bg || defaults.color.bg);

    //ICON
    if (props.appendIcon && props.prependIcon) {
      classes.push("px-8");
    } else if (props.appendIcon) {
      classes.push("pr-8 pl-2.5");
    } else if (props.prependIcon) {
      classes.push("pl-8 pr-2.5");
    } else {
      classes.push("px-2.5");
    }
  } else if (props.outlined) {
    //OUTLINED
    classes.push("pb-4", "pt-1", "bg-transparent");

    //ICON
    if (props.appendIcon && props.prependIcon) {
      classes.push("px-8");
    } else if (props.appendIcon) {
      classes.push("pr-8 pl-2.5");
    } else if (props.prependIcon) {
      classes.push("pl-8 pr-2.5");
    } else {
      classes.push("px-2.5");
    }
  } else {
    //DEFAULT
    classes.push("pb-2.5", "bg-transparent", "border-0", "border-b-2");

    //ICON
    if (props.appendIcon && props.prependIcon) {
      classes.push("px-8");
    } else if (props.appendIcon) {
      classes.push("pr-8 pl-0");
    } else if (props.prependIcon) {
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

  //HEIGHT
  classes.push(props.height || defaults.height);

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
      "peer-placeholder-shown:translate-y-1",
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
      "peer-placeholder-shown:translate-y-3",
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
      "top-4",
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
    "left-0",
    "flex",
    "items-center",
    "pl-2",
    "transition-all"
  );

  if (props.filled) {
    classes.push("top-6");
  } else if (props.outlined) {
    classes.push("top-5");
  } else {
    classes.push("top-4");
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

const appendIconClass = computed(() => {
  // class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-primary-800 transition-all ease-in-out duration-500"

  let classes: string[] = [];
  classes.push(
    "absolute",
    "right-0",
    "flex",
    "items-center",
    "pr-2",
    "transition-all"
  );

  if (props.filled) {
    classes.push("top-6");
  } else if (props.outlined) {
    classes.push("top-5");
  } else {
    classes.push("top-4");
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

  let classes: string[] = [
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
