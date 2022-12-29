<template>
  <div
    class="group cursor-pointer relative inline-block border-b border-gray-400 w-28 text-center"
  >
    Hover over me
    <div
      class="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 mt-2 absolute z-10 group-hover:opacity-100 top-full -left-1/2 ml-14 px-3 pointer-events-none"
    >
      Tooltip center
      <svg
        class="absolute text-black h-2 w-full right-0 bottom-full rotate-180"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  </div>
</template>
<script setup>
let defaults = {
  color: {
    text: "dark:text-white text-black",
    bg: "bg-primary-800",
    bgPointer: "bg-primary-800",
  },
};

let props = defineProps({
  color: {
    type: Object,
    default: {
      text: "dark:text-white text-black",
      bg: "bg-primary-800",
      bgPointer: "bg-primary-800",
    },
  },
  top: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
});
</script>
