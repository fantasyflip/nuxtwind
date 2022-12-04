<template>
  <div class="relative group">
    <span
      class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 group-focus-within:text-cyan-800 transition-all ease-in-out duration-500"
    >
      <MdiMagnify />
    </span>
    <input
      type="text"
      id="username"
      placeholder="Placeholder"
      required
      class="bg-zinc-800 h-10 px-4 pl-8 text-sm peer outline-none ring-2 focus:ring-cyan-800 ring-white appearance-none rounded-md shadow-lg placeholder:opacity-0 focus:placeholder:opacity-100 transition-all ease-in-out duration-500 placeholder:transition-all placeholder:duration-500 placeholder:ease-in-out"
    />
    <label
      for="username"
      class="transform transition-all ease-in-out duration-500 absolute top-0 left-0 h-full flex items-center group-focus-within:pl-2 pl-8 text-sm group-focus-within:text-sm group-focus-within:font-semibold group-focus-within:text-white text-gray-600 peer-valid:text-xs group-focus-within:pb-2 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full cursor-text"
      >Blablablablabla</label
    >
    <div
      class="absolute transition-all ease-in-out duration-500 text-xs font-light pl-2 group-focus-within:opacity-100 -translate-y-2 group-focus-within:-translate-y-0 opacity-0"
    >
      Hint
    </div>
  </div>
</template>

<script setup>
import MdiMagnify from "~icons/mdi/magnify";

let defaults = {
  color: {
    bg: "bg-cyan-900",
    text: "text-white",
    ring: "ring-white",
    placeholderText: "text-gray-600",
  },
  rounded: "rounded-md",
  outlined: {
    class: "ring-2",
    onlyFocus: true,
  },
  shadow: "shadow-md",
  transition: {
    duration: "duration-300",
    ease: "ease-in-out",
  },
};

const props = defineProps({
  color: {
    type: Object,
    default: {
      bg: "bg-cyan-900",
      text: "text-white",
      ring: "ring-white",
      placeholderText: "text-gray-600",
    },
  },
  prependIcon: {
    type: Object,
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
    type: [Boolean, Object],
    default: false,
  },
  placeholder: {
    type: String,
    default: undefined,
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
</script>
