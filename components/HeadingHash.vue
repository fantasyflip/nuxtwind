<template>
  <div
    :id="props.hash"
    class="flex group hover:cursor-pointer transition-transform hover:-translate-y-px duration-500 w-auto"
    @click="$hashAndCopy(props.hash)"
  >
    <h1 v-if="props.element === 'h1'" :class="styleClass">
      <slot />
    </h1>
    <h2 v-else-if="props.element === 'h2'" :class="styleClass">
      <slot />
    </h2>
    <h3 v-else-if="props.element === 'h3'" :class="styleClass">
      <slot />
    </h3>
    <h4 v-else-if="props.element === 'h4'" :class="styleClass">
      <slot />
    </h4>
    <div
      :class="linkSize"
      class="pl-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary-800 hover:text-secondary-700 grid place-items-center"
    >
      <MdiLinkVariant />
    </div>
  </div>
</template>

<script setup>
import MdiLinkVariant from "~icons/mdi/link-variant";
const props = defineProps({
  element: {
    type: String,
    default: "h1",
    validator(value) {
      // The value must match one of these strings
      return ["h1", "h2", "h3", "h4"].includes(value);
    },
  },
  hash: {
    type: String,
    required: true,
  },
  classOverride: {
    type: String,
    default: "",
  },
});

const linkSize = computed(() => {
  switch (props.element) {
    case "h1":
      return "text-xl md:text-2xl xl:text-3xl pt-2";
    case "h2":
      return "text-lg md:text-xl xl:text-2xl pt-2";
    case "h3":
      return "text-base md:text-lg xl:text-xl pt-1";
    case "h4":
      return "text-sm md:text-base xl:text-lg pt-1";
  }
});

const fontSize = computed(() => {
  switch (props.element) {
    case "h1":
      return "text-3xl md:text-4xl xl:text-5xl";
    case "h2":
      return "text-2xl md:text-3xl xl:text-4xl";
    case "h3":
      return "text-xl md:text-2xl xl:text-3xl";
    case "h4":
      return "text-lg md:text-xl xl:text-2xl";
  }
});

const styleClass = computed(() => {
  switch (props.element) {
    case "h1":
      return fontSize.value + " font-bold";
    case "h2":
      return fontSize.value + " font-semibold";
    case "h3":
      return fontSize.value + " font-semibold";
    case "h4":
      return fontSize.value + " font-semibold";
  }
});
</script>
