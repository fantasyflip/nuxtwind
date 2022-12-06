<template>
  <div class="relative group" @click="$refs.input.focus()">
    <span v-if="props.prependIcon" :class="prependIconClass">
      <slot name="icon">IC</slot>
    </span>
    <input
      ref="input"
      type="text"
      id="username"
      :placeholder="props.placeholder"
      required
      :class="inputClass"
    />
    <div for="username" :class="labelClass">Label</div>
    <div
      v-if="
        props.hint && props.hint.length > 0 && !props.disabled && !props.loading
      "
      :class="hintClass"
    >
      {{ props.hint }}
    </div>
  </div>
</template>

<script setup>
let defaults = {
  color: {
    bg: "bg-zinc-800",
    text: "text-white",
    ring: "ring-white",
    label: "text-white",
    labelFocus: "group-focus-within:text-cyan-600",
    ringFocus: "focus:ring-cyan-800",
    placeholderText: "placeholder:text-gray-600",
    iconFocus: "group-focus-within:text-cyan-800",
    border: "border-white",
    borderFocus: "focus:border-cyan-800",
  },
  rounded: "rounded-md",
  outlined: "ring-2",
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
  color: {
    type: Object,
    default: {
      bg: "bg-zinc-800",
      text: "text-white",
      ring: "ring-white",
      label: "text-white",
      labelFocus: "group-focus-within:text-cyan-600",
      ringFocus: "focus:ring-cyan-800",
      placeholderText: "placeholder:text-gray-600",
      iconFocus: "group-focus-within:text-cyan-800",
      border: "border-white",
      borderFocus: "focus:border-cyan-800",
    },
  },
  prependIcon: {
    type: Boolean,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: undefined,
  },
  rounded: {
    type: [Boolean, String],
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: [Boolean, String],
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: undefined,
  },
  shadow: {
    type: [Boolean, String],
    default: true,
  },
  transition: {
    type: [Boolean, Object],
    default: true,
  },
  width: {
    type: String,
    default: undefined,
  },
});

const hintClass = computed(() => {
  // class="absolute transition-all ease-in-out duration-500 text-xs font-light pl-2 group-focus-within:opacity-100 -translate-y-2 group-focus-within:-translate-y-0 opacity-0"

  let classes = [
    "absolute",
    "transition-all",
    "ease-in-out",
    "duration-500",
    "text-xs",
    "font-light",
    "pl-2",
    "group-focus-within:opacity-100",
    "-translate-y-2",
    "group-focus-within:-translate-y-0",
    "opacity-0",
  ];

  return classes.join(" ");
});

const labelClass = computed(() => {
  // class="transform transition-all ease-in-out duration-500 absolute top-0 left-0 h-full flex items-center group-focus-within:pl-2 pl-8 text-sm group-focus-within:text-sm group-focus-within:font-semibold group-focus-within:text-white text-gray-600 peer-valid:text-xs group-focus-within:pb-2 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full cursor-text"

  let classes = [
    "transform",
    "transition-all",
    "absolute",
    "top-0",
    "left-0",
    "h-full",
    "flex",
    "items-center",
    "group-focus-within:pl-2",
    "peer-valid:pl-2",
    "text-sm",
    "group-focus-within:text-sm",
    "group-focus-within:font-semibold",
    "group-focus-within:text-white",
    "peer-valid:text-sm",
    "group-focus-within:pb-2",
    "group-focus-within:h-1/2",
    "peer-valid:h-1/2",
    "group-focus-within:-translate-y-full",
    "peer-valid:-translate-y-full",
    "cursor-text",
  ];

  classes.push(props.color.label || defaults.color.label);
  classes.push(props.color.labelFocus || defaults.color.labelFocus);

  //PREPEND ICON
  if (props.prependIcon) {
    classes.push("pl-8");
  } else {
    classes.push("pl-2");
  }

  //TRANSITION
  if (props.transition && typeof props.transition === "object") {
    classes.push(
      props.transition.duration || defaults.transition.duration,
      props.transition.ease || defaults.transition.ease
    );
  } else {
    classes.push(defaults.transition.duration, defaults.transition.ease);
  }

  return classes.join(" ");
});

const inputClass = computed(() => {
  // class="bg-zinc-800 h-10 px-4 pl-8 text-sm peer outline-none ring-2 focus:ring-cyan-800 ring-white appearance-none rounded-md shadow-lg placeholder:opacity-0 focus:placeholder:opacity-100 transition-all ease-in-out duration-500 placeholder:transition-all placeholder:duration-500 placeholder:ease-in-out"

  let classes = [];
  classes.push(
    "h-10",
    "px-2",
    "text-sm",
    "peer",
    "outline-none",
    "appearance-none",
    "placeholder:opacity-0",
    "focus:placeholder:opacity-100",
    "transition-all",
    "placeholder:transition-all"
  );
  classes.push(props.color.bg || defaults.color.bg);
  classes.push(props.color.placeholderText || defaults.color.placeholderText);

  //PREPEND ICON
  if (props.prependIcon) {
    classes.push("pl-8");
  }

  //OUTLINED
  if (props.outlined) {
    classes.push(props.color.ring || defaults.color.ring);
    classes.push(props.color.ringFocus || defaults.color.ringFocus);
    classes.push(
      typeof props.outlined === "string" ? props.outlined : defaults.outlined
    );
  } else {
    classes.push("border-b-2");
    classes.push(props.color.border || defaults.color.border);
    classes.push(props.color.borderFocus || defaults.color.borderFocus);
  }

  //ROUNDED
  if (props.rounded) {
    classes.push(
      typeof props.rounded === "string" ? props.rounded : defaults.rounded
    );
  }

  //SHADOW
  if (props.shadow) {
    classes.push(
      typeof props.shadow === "string" ? props.shadow : defaults.shadow
    );
  }

  //TRANSITION
  if (props.transition) {
    if (typeof props.transition === "object") {
      classes.push(
        props.transition.duration || defaults.transition.duration,
        props.transition.ease || defaults.transition.ease
      );
      if (props.transition.placeholder) {
        classes.push(
          props.transition.placeholder.duration,
          props.transition.placeholder.ease
        );
      } else {
        classes.push(
          defaults.transition.placeholder.duration,
          defaults.transition.placeholder.ease
        );
      }
    } else {
      classes.push(
        defaults.transition.duration,
        defaults.transition.ease,
        defaults.transition.placeholder.duration,
        defaults.transition.placeholder.ease
      );
    }
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

  classes.push(props.color.placeholderText || defaults.color.placeholderText);
  classes.push(props.color.iconFocus || defaults.color.iconFocus);
  classes.push(props.color.placeholderText || defaults.color.placeholderText);

  classes.push(props.transition.duration || defaults.transition.duration);
  classes.push(props.transition.ease || defaults.transition.ease);

  // classes.push("text-gray-600");
  // classes.push("group-focus-within:text-cyan-800");
  // classes.push("duration-500");

  return classes.join(" ");
});
</script>

<style></style>
